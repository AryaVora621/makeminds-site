import achievementsData from "@/content/achievements.json";
import SectionLabel from "../_components/layout/SectionLabel";
import HairlineDivider from "../_components/layout/HairlineDivider";

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

const AWARD_KEYWORDS = [
  "Inspire",
  "Control",
  "Think",
  "Connect",
  "Innovate",
  "Motivate",
  "Winning Alliance",
  "Finalist Alliance",
];

function isAwardish(result: string): boolean {
  return AWARD_KEYWORDS.some((k) => result.includes(k));
}

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

        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex w-max gap-6">
            {seasonOrder.map((key) => {
              const sEvents = seasons[key];
              const season = sEvents[0];
              return (
                <article
                  key={key}
                  className="flex w-[320px] shrink-0 flex-col gap-3 border-l border-border pl-5"
                >
                  <header>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {season.year} · {season.season}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                      {sEvents.length} events
                    </p>
                  </header>
                  <ol className="mt-2 flex flex-col gap-2">
                    {sEvents.map((e, i) => {
                      const award = isAwardish(e.result);
                      return (
                        <li
                          key={`${key}-${i}`}
                          className="border-l border-border pl-3"
                          style={
                            award
                              ? {
                                  borderColor: "var(--accent)",
                                  boxShadow: "inset 2px 0 0 0 var(--accent)",
                                }
                              : undefined
                          }
                        >
                          <p className="font-display text-[14px] font-semibold leading-tight text-fg">
                            {e.name}
                          </p>
                          <p
                            className={
                              "mt-1 font-mono text-[10px] uppercase tracking-[0.16em] " +
                              (award ? "text-accent" : "text-fg-muted")
                            }
                          >
                            {e.result}
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
