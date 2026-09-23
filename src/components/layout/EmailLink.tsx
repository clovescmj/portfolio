"use client";

import { useEffect, useRef } from "react";

/**
 * Reversed so the address never sits in the static HTML (or as a plain
 * substring in the JS bundle) as a scrapable "mailto:...@..." string —
 * the real href is only assembled client-side, after mount, and set
 * directly on the DOM node (not via React state) so it never touches
 * the server-rendered HTML either.
 */
const USER_REVERSED = "jmc.sevolc";
const DOMAIN_REVERSED = "moc.liamg";

export function EmailLink({ className }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const user = USER_REVERSED.split("").reverse().join("");
    const domain = DOMAIN_REVERSED.split("").reverse().join("");
    if (ref.current) ref.current.href = `mailto:${user}@${domain}`;
  }, []);

  return (
    <a ref={ref} className={className}>
      Contact
    </a>
  );
}
