const TRANSLATIONS: Record<string, string> = {
  // Navigation elements
  "About": "SIETCH ARCHIVES",
  "Events": "SIETCH TRIALS",
  "Timeline": "CHRONICLE",
  "Venue": "SIETCH MAP",
  "Contact": "DISTRANS",
  "Register": "JOIN SIETCH",
  "Register Now": "JOIN THE SIETCH",
  "REGISTER NOW": "JOIN THE SIETCH",
  "Explore Events": "VIEW THE TRIALS",
  
  // Hero and Headings
  "MAGIZH": "MAGIZH",
  "ABOUT": "ARCHIVES",
  "FEATURED": "THE SACRED",
  "EVENTS": "TRIALS",
  "CONTACT": "DISTRANS",
  "FAQ": "SIETCH ANSWERS",
  
  // Paragraphs
  "The spice must flow. So must ideas. MGR YUVA Chapter summons the brightest minds of the nation to converge on the dunes of innovation, creativity, and competition.":
    "The spice must flow. So must ideas. Sietch MGR YUVA calls young Fedaykin to gather for trials of innovation, creativity, and skill.",

  // Timeline
  "Registration": "SIETCH ENTRY",
  "Arrival": "TRIBE ARRIVAL",
  "Inauguration": "OPENING RITE",
  "Ceremony": "OPENING CEREMONY",
  "Technical Events": "MENTAT TRIALS",
  "Arena": "TRIAL ARENA",
  "Lunch Break": "WATER BREAK",
  "Interval": "CEASEFIRE",
  "Non-Technical Events": "SIETCH TRIALS",
  "Valedictory": "FEDAYKIN CONCLAVE",
  "Closing": "CLOSING RITE",
  "Prize Distribution": "SPICE AWARDS",
  "Finale": "FINAL CONCLAVE",

  // FAQs Question & Answer Map
  "How do I register?": "HOW DO I JOIN THE SIETCH?",
  "Enlistment occurs strictly through our secure online portal. An AI Studio or GitHub account is not required for the event itself, but you must complete the form and await confirmation.": 
    "Submit your name through the secure portal. The Sietch Council will verify your entry and send confirmation.",
  
  "Will certificates be provided?": "WILL HONOR SCROLLS BE GIVEN?",
  "Yes, all verified attendees and tournament victors will receive authorized digital certs from the MGR YUVA Chapter.": 
    "Yes. Every verified participant and trial victor will receive a digital honor scroll from Sietch YUVA.",
  
  "What are the logistics for the day?": "WHAT IS THE DAY'S SIETCH PLAN?",
  "Gates open at 08:30 AM. Accommodation is not provided, but sustenance (lunch) will be distributed during the Interval phase.": 
    "The sietch gates open at 08:30 AM. Accommodation is not provided; food and water rations are served during the interval.",
  
  "Can non-students participate?": "MAY OUTSIDERS JOIN THE TRIALS?",
  "The symposium is currently restricted to active university students. Bring your institutional ID as proof of allegiance.": 
    "The trials are for active university students. Bring your institutional ID as proof of sietch allegiance."
};

export function getThematicText(text: string, mode: 'english' | 'fremen'): string {
  if (mode === 'fremen') {
    const trimmed = text.trim();
    
    // Exact mapping lookup
    if (TRANSLATIONS[trimmed]) {
      return TRANSLATIONS[trimmed];
    }
    
    // Substring or case-insensitive search
    for (const [key, val] of Object.entries(TRANSLATIONS)) {
      if (trimmed.toLowerCase() === key.toLowerCase()) {
        return val;
      }
    }
    
    // For non-dictionary terms, keep them legible
    return text;
  }
  return text;
}
