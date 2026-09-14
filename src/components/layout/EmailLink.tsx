"use client";

import { useEffect, useState } from "react";

/**
 * Reversed so the address never sits in the static HTML (or as a plain
 * substring in the JS bundle) as a scrapable "mailto:...@..." string —
 * the real href is only assembled client-side, after mount.
 */
const USER_REVERSED = "jmc.sevolc";
const DOMAIN_REVERSED = "moc.liamg";

export function EmailLink({ className }: { className?: string }) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    const user = USER_REVERSED.split("").reverse().join("");
    const domain = DOMAIN_REVERSED.split("").reverse().join("");
    setHref(`mailto:${user}@${domain}`);
  }, []);

  return (
    <a href={href} className={className}>
      Contact
    </a>
  );
}
