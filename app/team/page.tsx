import teamData from "@/content/team.json";
import SectionLabel from "../_components/layout/SectionLabel";
import HairlineDivider from "../_components/layout/HairlineDivider";
import PhotoFrame from "../_components/ui/PhotoFrame";

type Member = {
  name: string;
  role: string;
  year: string;
  bio: string;
  headshot: string | null;
};

type Mentor = Omit<Member, "year">;

export const metadata = {
  title: "Team",
  description:
    "Roster of FTC Team 23786 MakEMinds — students and mentors.",
};

export default function TeamPage() {
  const members = teamData.members as Member[];
  const mentors = teamData.mentors as Mentor[];

  return (
    <main className="relative">
      <section className="px-6 pb-12 pt-10 md:px-12 md:pt-16 lg:px-20">
        <SectionLabel index={2} label="Team" meta="roster · 2025–26" />
        <h1 className="mt-10 max-w-4xl font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          The students <span className="text-accent">who build</span> the robot.
        </h1>
        <p className="mt-6 max-w-xl text-fg-muted leading-[1.6]">
          A small team. Every member owns at least one system end-to-end —
          from CAD to drive practice to scouting alliances.
        </p>
      </section>

      <HairlineDivider className="my-12 px-6 md:px-12 lg:px-20" />

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          [a] / students · {members.length.toString().padStart(2, "0")}
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <li
              key={i}
              className="group flex flex-col gap-4 bg-bg p-6 transition-colors hover:bg-bg-elev"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  [{(i + 1).toString().padStart(2, "0")}]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                  {m.year}
                </span>
              </div>
              {m.headshot ? (
                <PhotoFrame
                  src={m.headshot}
                  alt={`${m.name}, ${m.role}`}
                  width={400}
                  height={500}
                  aspect="aspect-[4/5]"
                />
              ) : null}
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-fg">
                {m.name}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {m.role}
              </p>
              <p className="mt-auto text-[13px] leading-[1.6] text-fg-muted">
                {m.bio}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <HairlineDivider className="my-12 px-6 md:px-12 lg:px-20" />

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          [b] / mentors · {mentors.length.toString().padStart(2, "0")}
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {mentors.map((m, i) => (
            <li
              key={i}
              className="flex flex-col gap-4 bg-bg p-6"
            >
              {m.headshot ? (
                <PhotoFrame
                  src={m.headshot}
                  alt={`${m.name}, ${m.role}`}
                  width={400}
                  height={500}
                  aspect="aspect-[4/5]"
                />
              ) : null}
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-fg">
                {m.name}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {m.role}
              </p>
              <p className="text-[13px] leading-[1.6] text-fg-muted">{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
