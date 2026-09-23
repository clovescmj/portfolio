import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col md:gap-header">
      <PageHeader title="Not found" />
      <div className="mt-10 md:mt-0">
        <p className="font-sans text-body text-ink">
          This page doesn&apos;t exist.{" "}
          <Link
            href="/"
            className="underline decoration-1 underline-offset-2 transition-colors duration-400 ease-in-out hover:text-accent"
          >
            Back to Work
          </Link>
        </p>
      </div>
    </div>
  );
}
