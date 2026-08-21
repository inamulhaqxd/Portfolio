"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ContactForm } from "@/features/contact/components/contact-form";

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group rounded-full metallic px-5 py-2.5 text-xs font-bold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 sm:px-6 sm:py-3 sm:text-sm"
      >
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-window glass-deep p-6 shadow-panel sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-background/60 backdrop-blur-sm text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold sm:text-2xl">Get in touch</h2>
            <p className="mt-2 text-sm text-foreground/60">Fill out the form and I&apos;ll get back to you soon.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
