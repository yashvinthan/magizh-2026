/// <reference types="vite/client" />
import { ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdl0Bu2Frrzpv2DKnoQmym9lQag5jnBn_r98ONnfj5eV1HXzw/viewform';

const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_URL || DEFAULT_GOOGLE_FORM_URL;
export function RegistrationModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-3 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close registration form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full bg-black/85 backdrop-blur-sm"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 18 }}
            transition={{ duration: 0.25 }}
            className="relative flex w-full max-w-xl flex-col overflow-hidden border border-dune-spice/30 bg-dune-bg shadow-[0_0_60px_rgba(211,115,53,0.16)]"
          >
            <header className="flex shrink-0 items-center justify-between gap-5 border-b border-dune-border bg-dune-surface px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[7px] uppercase tracking-[0.28em] text-dune-spice">
                  Official registration channel
                </p>
                <h2 id="registration-title" className="truncate font-dune text-sm uppercase tracking-[0.14em] text-white sm:text-lg">
                  Join MAGIZH '26
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close registration form"
                  className="grid h-9 w-9 place-items-center border border-dune-border text-dune-sand-muted transition-colors hover:border-dune-spice hover:text-dune-spice"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <div className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,transparent_0_3px,#000_4px)]" />
              <div className="relative">
                <span className="mx-auto mb-7 grid h-14 w-14 place-items-center border border-dune-spice/60 font-dune text-xl text-dune-spice">
                  M
                </span>
                <h3 className="mb-4 font-dune text-lg uppercase tracking-[0.12em] text-white sm:text-xl">
                  Continue to Registration
                </h3>
                <p className="mx-auto mb-8 max-w-md font-sans text-sm leading-7 text-dune-sand-muted">
                  To finalize your entry, you will be redirected to the official registration form. Please complete all fields and upload your proof of payment to secure your credentials.
                </p>
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="mx-auto flex w-full max-w-sm items-center justify-center gap-3 border border-dune-spice bg-[#170b06] px-6 py-4 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-dune-sand transition-colors hover:bg-dune-spice hover:text-black"
                >
                  Open Registration Form <ExternalLink size={13} />
                </a>
                <p className="mt-5 font-mono text-[7px] uppercase tracking-[0.14em] text-dune-sand-muted">
                  Google account sign-in may be required
                </p>
              </div>
            </div>

            <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-dune-border bg-dune-bg px-4 py-3 sm:px-6">
              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dune-sand-muted">
                Secure external Google Form
              </p>
              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dune-spice">Cookies enabled</span>
            </footer>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
