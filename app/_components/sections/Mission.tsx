/*
  Mission section (PLAN §3). Asymmetric grid — left meter (decorative,
  the pinned-scroll fill variant lands in Phase 2 polish), right column
  has the mission copy broken into phrases.

  Copy lifted from current Google site and tightened ~30%.
*/

import SectionLabel from "../layout/SectionLabel";

export default function Mission() {
  const phrases = [
    "MakEMinds is a student-led FTC team out of Edison, NJ.",
    "We design, build, code, and field competition robots — three seasons in.",
    "We run a summer build camp, mentor two FLL teams, and host library STEM days.",
    "Engineering rigor with a community-first attitude. We win when our chapter wins.",
  ];

  return (
    <section
      id="mission"
      className="relative grid grid-cols-12 gap-6 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="col-span-12 md:col-span-3">
        <SectionLabel index={2} label="Mission" meta="who · what · why" />
        <div
          aria-hidden
          className="mt-6 h-32 w-px bg-border md:h-48"
          style={{ backgroundImage: "linear-gradient(to bottom, var(--accent) 0%, var(--border) 50%)" }}
        />
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <div className="space-y-5 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] font-medium leading-[1.18] tracking-[-0.01em]">
          {phrases.map((p, i) => (
            <p key={i} className={i === 0 ? "text-fg" : "text-fg-muted"}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
