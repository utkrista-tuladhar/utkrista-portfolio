/**
 * Fixed ambience behind the whole page: two drifting colour fields, a faint
 * grid, and a grain pass to stop the large flat areas from banding.
 *
 * It is `fixed` and `pointer-events-none`, so it costs one composited layer
 * and never participates in hit-testing or document flow.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Grid, faded out before it reaches the bottom of the viewport. */}
      <div className="bg-grid mask-fade-b absolute inset-0" />

      {/* Aurora fields. Blur plus low opacity keeps them as light, not shapes. */}
      <div
        className="animate-aurora absolute -top-[20%] left-[-10%] h-[55vmax] w-[55vmax] rounded-full blur-[120px]"
        style={{ background: "var(--glow-a)" }}
      />
      <div
        className="animate-aurora absolute right-[-15%] top-[25%] h-[45vmax] w-[45vmax] rounded-full blur-[130px]"
        style={{ background: "var(--glow-b)", animationDelay: "-8s" }}
      />

      {/* Vignette: pulls focus to the centre column on wide screens. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)]" />
    </div>
  );
}
