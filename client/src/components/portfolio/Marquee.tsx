import { marqueeSkills } from "@/data/skills";

/**
 * Infinite ticker of the stack.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * second copy lands where the first began and the loop has no seam. The track
 * pauses on hover so a name can actually be read.
 */
export function Marquee() {
  return (
    <section className="relative border-y border-border py-5" aria-label="Technologies">
      <div className="mask-fade-edges flex overflow-hidden">
        <div className="animate-marquee-x flex shrink-0 items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10">
              <span className="font-mono text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                {skill}
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
