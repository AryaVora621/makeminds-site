import SectionLabel from "../_components/layout/SectionLabel";
import Accordion from "../_components/ui/Accordion";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with MakEMinds Robotics — sponsorship, mentorship, partnerships, judging.",
};

const CHANNELS = [
  {
    code: "01",
    label: "Email",
    value: "info@makemindsrobotics.org",
    href: "mailto:info@makemindsrobotics.org",
    arrow: "→",
  },
  {
    code: "02",
    label: "Instagram",
    value: "@makemindsrobotics",
    href: "https://instagram.com/makemindsrobotics",
    arrow: "↗",
  },
  {
    code: "03",
    label: "YouTube",
    value: "MakEMinds Robotics",
    href: "https://youtube.com/@makemindsrobotics",
    arrow: "↗",
  },
  {
    code: "04",
    label: "Location",
    value: "Edison, NJ — USA",
    href: null,
    arrow: "·",
  },
];

const FAQ = [
  {
    q: "How do we sponsor the team?",
    a: "Pick a tier on the Sponsors page, then send us a message — we'll mail back our sponsor packet (tax-deductible info, logo placement spec, season-end report cadence).",
  },
  {
    q: "Are you taking on mentors?",
    a: "Yes — especially engineers, machinists, software folks, and former FIRST alumni. The commitment can be one workshop a season or weekly build meetings.",
  },
  {
    q: "When are tryouts?",
    a: "We hold tryouts in August before the season kickoff. If you're an Edison-area student in grades 9-12, send us a note and we'll add you to the interest list.",
  },
  {
    q: "Can you judge or volunteer at our event?",
    a: "Several of our students and alumni are FIRST-certified judges and referees. Reach out with your event date and we'll see who's available.",
  },
];

type Props = { searchParams: Promise<{ reason?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { reason } = await searchParams;

  return (
    <main className="relative">
      <section className="px-6 pb-12 pt-10 md:px-12 md:pt-16 lg:px-20">
        <SectionLabel index={8} label="Contact" meta="open channels" />
        <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
          Get in <span className="text-accent">touch.</span>
        </h1>
        <p className="mt-6 max-w-xl text-fg-muted leading-[1.6]">
          Sponsor packets, mentor inquiries, partnership ideas, judging
          requests, or just hi from another team — pick a channel.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        <div className="bg-bg p-6 md:p-12 lg:p-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
            [a] / direct channels
          </p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {CHANNELS.map((c) => {
              const Inner = (
                <div className="flex w-full items-baseline gap-5 py-5 transition-[padding] hover:pl-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
                    [{c.code} / {c.label.toUpperCase()}]
                  </span>
                  <span className="flex-1 font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium text-fg">
                    {c.value}
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-fg-dim transition-colors group-hover:text-accent"
                  >
                    {c.arrow}
                  </span>
                </div>
              );
              return (
                <li key={c.code} className="group relative">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block hover:bg-bg-elev/40"
                    >
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-bg p-6 md:p-12 lg:p-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
            [b] / message form
          </p>
          <div className="mt-8">
            <ContactForm defaultReason={reason} />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <SectionLabel index={9} label="FAQ" meta="quick answers" />
        <div className="mt-10 max-w-3xl">
          <Accordion items={FAQ} />
        </div>
      </section>
    </main>
  );
}
