import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { assetPath } from "@/lib/asset-path";

const expertiseLeft = [
  "Lead design initiatives across multiple products and teams.",
  "Mentor designers to help them grow and take on more ownership.",
  "Partner directly with product and engineering to turn ambiguous problems into a plan the team can execute.",
  "Craft visually compelling interfaces and high-fidelity prototypes.",
  "Apply UX research, usability testing, and data analysis to build intuitive, goal-driven products.",
  "Bring a broad perspective on design challenges across fintech, insurtech, and real estate, in both B2C and B2B contexts.",
];

const experience = [
  { years: "2024—2026", company: "QuintoAndar", role: "Staff Product Designer" },
  { years: "2022—2024", company: "unico IDtech", role: "Senior Product Designer / Design Manager" },
  { years: "2021—2022", company: "Loft", role: "Senior Product Designer" },
  { years: "2021—2021", company: "SumUp", role: "Product Design Specialist" },
  { years: "2016—2021", company: "Youse", role: "Product Design Specialist" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col md:gap-[54px]">
      <PageHeader title="About me" />

      <div className="flex flex-col gap-12 md:-mx-content md:w-[calc(100%+112px)] md:pl-content">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-8 md:gap-y-8 md:pr-content">
          <p className="font-sans text-title text-ink md:col-span-2 md:col-start-1">
            With over 10 years of experience designing digital products, I bring a unique blend of hands-on design
            expertise and strategic leadership.
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-[22px] font-sans text-body text-ink md:col-span-2 md:col-start-3">
            {expertiseLeft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-8">
          <div className="flex flex-col md:col-span-2 md:col-start-1 md:row-start-1">
            <h2 className="mb-10 font-sans text-heading-2 text-ink md:mb-6">Achievements</h2>

            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-heading-3 text-ink">Loft</h3>
              <p className="font-sans text-body text-ink">
                I led the design of the Loft app from the ground up (0-1), achieving a{" "}
                <span className="font-bold">4-star rating</span> and becoming the{" "}
                <span className="font-bold">top-downloaded app</span> in the &ldquo;Lifestyle&rdquo; and &ldquo;Home
                Decor&rdquo; categories on both the App Store and Play Store within the{" "}
                <span className="font-bold">first three months after launch</span>.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 md:mt-8">
              <h3 className="font-sans text-heading-3 text-ink">unico IDtech</h3>
              <p className="font-sans text-body text-ink">
                I planned a career development strategy for a team member, focused on improving technical skills and
                increasing the visibility of their work with stakeholders. Over two six-month performance review
                cycles, they received <span className="font-bold">5/5 ratings</span> and{" "}
                <span className="font-bold">approval for salary increases</span>, and in the most recent cycle, the{" "}
                <span className="font-bold">
                  performance committee approved their promotion to a senior position
                </span>
                .
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 md:mt-8">
              <h3 className="font-sans text-heading-3 text-ink">Youse Seguros</h3>
              <p className="font-sans text-body text-ink">
                I led the discovery and design of a new third-party claim filing experience. Within the first month,{" "}
                <span className="font-bold">
                  40% of third-party claims were filed through the new digital self-service journey
                </span>
                , reducing support ticket volume and operational cost that used to come from every claim requiring a
                phone call.
              </p>
            </div>
          </div>

          <div className="relative aspect-[712/393] w-full overflow-hidden bg-placeholder md:col-span-4 md:col-start-3 md:row-start-1">
            <Image
              src={assetPath("/images/about/cloves.webp")}
              alt="Clóves Cardoso"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover object-top grayscale"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-8 md:gap-y-6 md:pr-content">
          <h2 className="font-sans text-heading-2 text-ink md:col-span-2 md:col-start-1">Latest Experiences</h2>

          <div className="flex flex-col md:col-span-3 md:col-start-1">
            {experience.map((entry, i) => (
              <div key={entry.company}>
                <div className="grid grid-cols-3 gap-8 py-3">
                  <div className="col-span-1 flex flex-col gap-0.5">
                    <p className="font-sans text-caption text-muted">{entry.years}</p>
                    <p className="font-sans text-heading-3 text-ink">{entry.company}</p>
                  </div>
                  <p className="col-span-2 self-end font-sans text-body text-ink">{entry.role}</p>
                </div>
                {i < experience.length - 1 && <hr className="border-lightergrey" />}
              </div>
            ))}
          </div>

          <blockquote className="flex flex-col gap-3 md:col-span-2 md:col-start-5 md:-mt-[160px]">
            <div className="md:-mb-[65px] md:ml-10">
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
        </div>

      {/*  <hr className="border-ink" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-8 md:gap-y-8 md:pr-content">
          <h2 className="font-sans text-heading-2 text-ink md:col-span-1 md:col-start-1">Beyond Work</h2>
          <p className="font-sans text-body text-ink md:col-span-2 md:col-start-2">
            You&rsquo;ll find me being a dad, going to shows, running my small batch music label, and designing artwork
            for bands.
          </p>
        </div>*/}
      </div>
    </div>
  );
}
