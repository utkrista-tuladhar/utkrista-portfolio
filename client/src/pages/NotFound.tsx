import { Backdrop } from "@/components/portfolio/Backdrop";
import { ActionButton } from "@/components/portfolio/primitives";
import { expo } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [location, setLocation] = useLocation();

  return (
    <div className="relative grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <Backdrop />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={expo}
        className="w-full max-w-lg text-center"
      >
        <div className="eyebrow mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border-strong" />
          Error
          <span className="h-px w-8 bg-border-strong" />
        </div>

        <h1 className="text-gradient-accent font-mono text-7xl font-semibold tracking-tighter sm:text-8xl">
          404
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          This page doesn't exist.
        </p>

        {/* Showing the attempted path makes a mistyped link obvious at a glance. */}
        <p className="mt-3 break-all font-mono text-xs text-subtle">
          {location}
        </p>

        <div className="mt-10 flex justify-center">
          <ActionButton onClick={() => setLocation("/")}>
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Back home
          </ActionButton>
        </div>
      </motion.div>
    </div>
  );
}
