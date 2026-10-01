import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { assetPath } from "@/lib/asset-path";
import { Bleed } from "@/components/ui/Bleed";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

const expertiseLeft = [
  "Lead design initiatives across multiple products and teams, setting direction for systems other teams build on and adopt.",
  "Partner directly with product and engineering to turn ambiguous problems into a plan the team can execute.",
  "Bring AI into design workflows to make production repeatable at scale.",
  "Craft visually compelling interfaces and high-fidelity prototypes.",
  "Apply UX research, usability testing and data analysis to build intuitive, goal-driven products.",
  "Mentor designers to help them grow and take on more ownership.",
];

const experience = [
  { years: "2024—Present", company: "QuintoAndar", role: "Staff Product Designer" },
  { years: "2022—2024", company: "unico IDtech", role: "Senior Product Designer / Design Manager" },
  { years: "2021—2022", company: "Loft", role: "Senior Product Designer" },
  { years: "2021—2021", company: "SumUp", role: "Product Design Specialist" },
  { years: "2016—2021", company: "Youse", role: "Product Design Specialist" },
];

export default function AboutPage() {
  return (
    <article className="flex flex-col md:gap-[54px]">
      <PageHeader title="About me" />

      <Bleed className="mt-10 flex flex-col gap-12 md:mt-0">
        <div className="page-grid gap-y-10 md:gap-y-8 md:pr-content">
          <p className="font-sans text-h3 text-ink md:col-span-2 md:col-start-1">
            With over 12 years of experience designing digital products, I bridge high-quality craft and strategic business impact.
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-[22px] font-sans text-body text-ink md:col-span-2 md:col-start-3">
            {expertiseLeft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="page-grid gap-y-10">
          <div className="relative -mx-6 aspect-square w-[calc(100%+48px)] overflow-hidden bg-placeholder md:col-span-4 md:col-start-3 md:row-start-1 md:mx-0 md:aspect-[712/393] md:w-full">
            <Image
              src={assetPath("/images/about/cloves.webp")}
              alt="Clóves Cardoso"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover object-top grayscale"
            />
          </div>

          <section
            aria-labelledby={headingId("Achievements")}
            className="flex flex-col gap-title md:col-span-2 md:col-start-1 md:row-start-1"
          >
            <Heading level={2} variant="h2" id={headingId("Achievements")}>
              Achievements
            </Heading>

            {/* gap-block between entries, gap-title (above) between the
                section title and this whole list — not one flat margin
                doing both jobs at different sizes per entry. */}
            <div className="flex flex-col gap-block">
              <section aria-labelledby={headingId("Loft")} className="flex flex-col gap-title">
                <Heading level={3} variant="h4" id={headingId("Loft")}>
                  Loft
                </Heading>
                <p className="font-sans text-body text-ink">
                  I led the design of the Loft app from the ground up (0-1), achieving a{" "}
                  <span className="font-bold">4-star rating</span> and becoming the{" "}
                  <span className="font-bold">top-downloaded app</span> in the &ldquo;Lifestyle&rdquo; and
                  &ldquo;Home Decor&rdquo; categories on both the App Store and Play Store within the{" "}
                  <span className="font-bold">first three months after launch</span>.
                </p>
              </section>

              <section aria-labelledby={headingId("unico IDtech")} className="flex flex-col gap-title">
                <Heading level={3} variant="h4" id={headingId("unico IDtech")}>
                  unico IDtech
                </Heading>
                <p className="font-sans text-body text-ink">
                  I planned a career development strategy for a team member, focused on improving technical skills
                  and increasing the visibility of their work with stakeholders. Over two six-month performance
                  review cycles, they received <span className="font-bold">5/5 ratings</span> and{" "}
                  <span className="font-bold">approval for salary increases</span>, and in the most recent cycle,
                  the{" "}
                  <span className="font-bold">
                    performance committee approved their promotion to a senior position
                  </span>
                  .
                </p>
              </section>

              <section aria-labelledby={headingId("Youse Seguros")} className="flex flex-col gap-title">
                <Heading level={3} variant="h4" id={headingId("Youse Seguros")}>
                  Youse Seguros
                </Heading>
                <p className="font-sans text-body text-ink">
                  I led the discovery and design of a new third-party claim filing experience. Within the first
                  month,{" "}
                  <span className="font-bold">
                    40% of third-party claims were filed through the new digital self-service journey
                  </span>
                  , reducing support ticket volume and operational cost that used to come from every claim requiring
                  a phone call.
                </p>
              </section>
            </div>
          </section>
        </div>

        <section
          aria-labelledby={headingId("Latest Experiences")}
          className="page-grid gap-block md:pr-content"
        >
          {/* Title tight against its own list (gap-title); the outer
              gap-block is for mobile, where this stack and the quote below
              stack as two unrelated blocks, not a title and its text. */}
          <div className="flex flex-col gap-title md:col-span-3 md:col-start-1">
            <Heading level={2} variant="h2" id={headingId("Latest Experiences")}>
              Latest Experiences
            </Heading>

            <ul className="flex flex-col">
              {experience.map((entry, i) => (
                <li key={entry.company}>
                  <div className="grid grid-cols-3 gap-8 py-3">
                    <div className="col-span-1 flex flex-col gap-0.5">
                      <p className="font-sans text-caption text-muted">{entry.years}</p>
                      <p className="font-sans text-h4 text-ink">{entry.company}</p>
                    </div>
                    <p className="col-span-2 self-end font-sans text-body text-ink">{entry.role}</p>
                  </div>
                  {i < experience.length - 1 && <hr className="border-lightergrey" />}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="flex flex-col gap-3 md:col-span-2 md:col-start-5 md:-mt-[160px]">
            <div className="-mb-[65px] md:ml-10">
              <Image
                aria-hidden="true"
                src={assetPath("/images/about/quote.svg")}
                alt=""
                width={90}
                height={78}
              />
            </div>
            <p className="font-sans text-brand text-ink md:text-right">
              You cannot understand good design if you do not understand people; design is made for people.
            </p>
            <cite className="font-sans text-body text-muted not-italic md:text-right">— Dieter Rams</cite>
          </blockquote>
        </section>

        <hr className="border-ink" />

        <section aria-labelledby={headingId("Beyond Work")} className="page-grid gap-title md:pr-content">
          <Heading level={2} variant="h2" id={headingId("Beyond Work")} className="md:col-span-1 md:col-start-1">
            Beyond Work
          </Heading>
          <p className="font-sans text-body text-ink md:col-span-2 md:col-start-2">
            You&rsquo;ll find me being a dad, going to shows, running a{" "}
            <a
              href="https://forkha.bandcamp.com/"
              target="_blank"
              rel="noreferrer"
              className="font-sans link"
            >
            small batch record label
            </a>
            , and designing artwork for bands and concerts.
          </p>
        </section>
      </Bleed>
    </article>
  );
}
