import Link from "next/link";
import sponsorsData from "@/content/sponsors.json";
import SectionLabel from "../_components/layout/SectionLabel";
import HairlineDivider from "../_components/layout/HairlineDivider";

type Sponsor = { name: string; url: string | null };
type Tier = { id: string; label: string; blurb: string; sponsors: Sponsor[] };

export const metadata = {
  title: "Sponsors",
  description:
    "The companies and families that power MakEMinds Robotics. Tier breakdown + how to sponsor.",
};

export default function SponsorsPage() {
  const tiers = sponsorsData.tiers as Tier[];

  return (
    <main className="relative">
      <section className="px-6 pb-12 pt-10 md:px-12 md:pt-16 lg:px-20">
        <SectionLabel index={6} label="Sponsors" meta="powering the build" />
        <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
          Sponsors <span className="text-accent">build</span> the future.
        </h1>
        <p className="mt-6 max-w-xl text-fg-muted leading-[1.6]">
          Robotics is expensive — competition fees, drivetrains, travel, food.
          Sponsors absorb the cost so students focus on learning. Thank you.
        </p>
      </section>

      <HairlineDivider className="my-12 px-6 md:px-12 lg:px-20" />

      <section className="space-y-px bg-border">
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            id={tier.id}
            className="grid grid-cols-12 gap-6 bg-bg px-6 py-12 md:px-12 md:py-16 lg:px-20"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                [{(i + 1).toString().padStart(2, "0")}] {tier.label}
              </p>
              <p className="mt-4 text-[13px] leading-[1.6] text-fg-muted">
                {tier.blurb}
              </p>
            </div>
            <ul className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-3 md:col-span-9 md:grid-cols-3 lg:grid-cols-4">
              {tier.sponsors.map((s, j) => (
                <li
                  key={`${tier.id}-${j}`}
                  className="font-display text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium text-fg-muted transition-colors hover:text-fg"
                >
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.name}
                    </a>
                  ) : (
                    s.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel
              index={7}
              label="Become a sponsor"
              meta="tax-deductible · 501(c)(3) sponsor org"
            />
            <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight">
              We&apos;ll send the packet within 24 hours.
            </h2>
            <p className="mt-4 max-w-xl text-fg-muted leading-[1.6]">
              Logo placement specs, season-end report cadence, tier perks, and
              tax-deductibility through our partner sponsor organization. No
              minimum commitment — every $25 of Friends-tier giving funds a
              week of after-school snacks.
            </p>
          </div>
          <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
            <Link
              href="/contact?reason=sponsorship"
              className="inline-flex h-12 items-center justify-center border border-accent bg-transparent px-6 font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              request packet →
            </Link>
            <a
              href="mailto:info@makemindsrobotics.org?subject=Sponsor%20packet%20request"
              className="inline-flex h-12 items-center justify-center border border-border px-6 font-mono text-[12px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-accent hover:text-accent"
            >
              email instead ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
