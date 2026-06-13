import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface MapNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: string;
  events: string[];
}

interface MapLink extends d3.SimulationLinkDatum<MapNode> {
  source: string | MapNode;
  target: string | MapNode;
}

const NODES: MapNode[] = [
  { id: 'main', name: 'Main Hub', category: 'hub', events: ['Inauguration', 'Prize Distribution'] },
  { id: 'tech', name: 'Tech Spire', category: 'tech', events: ['Paper Presentation', 'Poster Designing', 'Shark Tank'] },
  { id: 'creative', name: 'Creative Dunes', category: 'non-tech', events: ['Adaptune', 'Solo Singing'] },
  { id: 'group', name: 'Sietch Gathering', category: 'group', events: ['Adzap', 'Group Dance', 'Face Painting'] },
  { id: 'food', name: 'Spice Messhall', category: 'hub', events: ['Lunch Interval'] },
  { id: 'entry', name: 'Landing Pad', category: 'entry', events: ['Registration Desk'] }
];

const LINKS: MapLink[] = [
  { source: 'entry', target: 'main' },
  { source: 'main', target: 'tech' },
  { source: 'main', target: 'creative' },
  { source: 'tech', target: 'group' },
  { source: 'creative', target: 'group' },
  { source: 'main', target: 'food' },
  { source: 'group', target: 'food' }
];

export function ArrakisMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ 
        width: width || 600, 
        height: height || 500 
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { width, height } = dimensions;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create a group for zoom/pan
    const g = svg.append('g');

    // Add zoom capabilities
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    // Initial transform
    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(1);
    svg.call(zoom.transform, initialTransform);

    // Setup simulation
    // Clone nodes and links to avod mutating the constants
    const nodesData = NODES.map(d => ({ ...d }));
    const linksData = LINKS.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<MapNode>(nodesData)
      .force('link', d3.forceLink<MapNode, MapLink>(linksData).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('collide', d3.forceCollide().radius(60))
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05));

    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(linksData)
      .join('line')
      .attr('stroke', '#d37335') // dune spice
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-opacity', 0.4);

    // Define node group
    const node = g.append('g')
      .selectAll('g')
      .data(nodesData)
      .join('g')
      .attr('class', 'cursor-interactive group')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(d);
      });

    // Pulse circles (back layer)
    const pulseCircle = node.append('circle')
      .attr('r', 24)
      .attr('fill', 'none')
      .attr('stroke', '#d37335')
      .attr('stroke-width', 1);

    pulseCircle.append('animate')
      .attr('attributeName', 'r')
      .attr('values', '24;45;24')
      .attr('dur', '3s')
      .attr('repeatCount', 'indefinite');

    pulseCircle.append('animate')
      .attr('attributeName', 'opacity')
      .attr('values', '0.8;0;0')
      .attr('dur', '3s')
      .attr('repeatCount', 'indefinite');

    // Node circles (outer thin styling)
    node.append('circle')
      .attr('r', 24)
      .attr('fill', 'rgba(0,0,0,0.5)')
      .attr('stroke', '#d37335')
      .attr('stroke-width', 1)
      .attr('class', 'opacity-50 transition-all duration-300')
      .on('mouseover', function() { d3.select(this).attr('stroke-width', 3).attr('stroke', '#ffffff'); })
      .on('mouseout', function() { d3.select(this).attr('stroke-width', 1).attr('stroke', '#d37335'); });

    // Node inner circles (core)
    node.append('circle')
      .attr('r', 4)
      .attr('fill', '#d37335');

    // Node labels
    node.append('text')
      .text(d => d.name)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-family', 'monospace')
      .attr('font-size', '10px')
      .attr('letter-spacing', '0.2em')
      .style('text-transform', 'uppercase')
      .style('pointer-events', 'none');

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as MapNode).x!)
        .attr('y1', d => (d.source as MapNode).y!)
        .attr('x2', d => (d.target as MapNode).x!)
        .attr('y2', d => (d.target as MapNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <div className="relative w-full h-[500px] border border-dune-border bg-dune-surface/50 overflow-hidden" ref={containerRef}>
      {/* Info Panel Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dune-bg to-transparent pointer-events-none z-10" />
      
      {/* Target Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#d37335 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute inset-0 z-0 pointer-events-none w-[200%] aspect-square -translate-x-1/4 -translate-y-1/4 origin-center animate-[spin_8s_linear_infinite]" 
           style={{ background: 'conic-gradient(from 0deg, transparent 75%, rgba(211,115,53,0.3) 100%)', mixBlendMode: 'screen', maskImage: 'radial-gradient(circle at center, transparent 10%, black 60%)', WebkitMaskImage: 'radial-gradient(circle at center, transparent 10%, black 60%)' }} />
      <svg ref={svgRef} className="w-full h-full cursor-move relative z-10" />

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:top-4 sm:right-4 sm:left-auto sm:w-64 border border-dune-spice/50 bg-black/90 backdrop-blur-md p-4 flex flex-col z-20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-mono text-[8px] text-dune-sand-muted tracking-widest uppercase mb-1">Location Details</p>
                <h4 className="font-dune text-xs tracking-widest uppercase text-dune-spice">{selectedNode.name}</h4>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-dune-sand-muted hover:text-white cursor-interactive">
                <X size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[8px] text-dune-sand-muted tracking-widest uppercase mb-2 border-b border-dune-border pb-1">Scheduled Events</p>
                <ul className="space-y-2">
                  {selectedNode.events.map((event, idx) => (
                    <li key={idx} className="font-sans text-sm text-white flex items-center gap-2">
                      <span className="w-1 h-1 bg-dune-spice inline-block" /> {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!selectedNode && (
        <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-3">
           <div className="flex flex-col">
             <span className="font-mono text-[8px] text-dune-spice tracking-[0.3em] uppercase">Tactical Map</span>
             <span className="font-sans text-[10px] text-dune-sand-muted">Drag to pan, zoom map</span>
           </div>
        </div>
      )}
    </div>
  );
}
