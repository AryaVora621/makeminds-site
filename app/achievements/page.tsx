import achievementsData from "@/content/achievements.json";
import SectionLabel from "../_components/layout/SectionLabel";
import HairlineDivider from "../_components/layout/HairlineDivider";
import SeasonsTimeline from "./SeasonsTimeline";

type EventRecord = {
  season: string;
  year: number;
  name: string;
  result: string;
};

type Award = {
  year: number;
  name: string;
  event: string;
};

export const metadata = {
  title: "Achievements",
  description:
    "Three seasons of FTC results for Team 23786 — 27 events, 8 major awards.",
};

export default function AchievementsPage() {
  const events = achievementsData.events as EventRecord[];
  const awards = achievementsData.majorAwards as Award[];
  const team = achievementsData.team;

  // Group events by season for the horizontal timeline.
  const seasons = events.reduce<Record<string, EventRecord[]>>((acc, e) => {
    const key = `${e.year}-${e.season}`;
    (acc[key] ??= []).push(e);
    return acc;
  }, {});

  const seasonOrder = Object.keys(seasons).sort().reverse();

  return (
    <main className="relative">
      <section className="px-6 pb-12 pt-10 md:px-12 md:pt-16 lg:px-20">
        <SectionLabel index={5} label="Achievements" meta="three seasons, climbing" />
        <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
          {team.eventsCompeted} events.<br />
          <span className="text-accent">{awards.length} major awards.</span>
        </h1>
        <p className="mt-6 max-w-xl text-fg-muted leading-[1.6]">
          Rookie team since {team.rookieYear}. Compiled from FTC-Events on
          import; ground truth is the FIRST scoring system.
        </p>
      </section>

      <HairlineDivider className="my-12 px-6 md:px-12 lg:px-20" />

      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          [a] / major awards
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {awards.map((a, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 bg-bg p-6 md:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.9] text-accent tabular-nums">
                  {a.year}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                  [{(i + 1).toString().padStart(2, "0")}]
                </span>
              </div>
              <p className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold tracking-tight text-fg">
                {a.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                {a.event}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <HairlineDivider className="my-12 px-6 md:px-12 lg:px-20" />

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          [b] / full event timeline
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
          drag horizontally · or use trackpad
        </p>

        <SeasonsTimeline seasonOrder={seasonOrder} seasons={seasons} />
      </section>
    </main>
  );
}
