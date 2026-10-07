"use client";

import { useEffect, useRef } from "react";

/**
 * The address comes from NEXT_PUBLIC_CONTACT_EMAIL, set at build time (the
 * CONTACT_EMAIL secret in the deploy workflow, `.env.local` locally), so it
 * is never committed to the repo. The href is set on the DOM node after
 * mount, so it also stays out of the server-rendered HTML. Without the
 * variable the link is not rendered.
 */
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export function EmailLink({ className }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && EMAIL) ref.current.href = `mailto:${EMAIL}`;
  }, []);

  if (!EMAIL) return null;

  return (
    <a ref={ref} className={className}>
      Contact
    </a>
  );
}
