"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, Target } from "framer-motion";
import { Ring } from "./Ring";
import { Timer } from "./Timer";

type View = "ring" | "timer" | "idle";
let transitionInterval: ReturnType<typeof setTimeout> | null = null;

export default function DynamicIsland() {
  const [view, setView] = useState<View>("idle");

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;
      case "timer":
        return <Timer />;
      case "idle":
        return <div className="h-7" />;
    }
  }, [view]);

  function setViewWithTransition(nextView: View) {
    if (nextView === view) {
      return;
    }

    if (transitionInterval) {
      clearInterval(transitionInterval);
    }

    if (nextView === "idle" || view === "idle") {
      setView(nextView);

      return;
    }

    setView("idle");

    transitionInterval = setTimeout(() => setView(nextView), 500);
  }

  function getTransitionTarget(): Target {
    switch (view) {
      case "ring":
        return { opacity: 0, scale: 0.5, y: 0, filter: "blur(5px)" };
      case "timer":
        return {
          opacity: 0,
          scale: 0.3,
          y: -15,
          filter: "blur(5px)",
        };
      default:
        return { opacity: 0, scale: 0.5, y: 0, filter: "blur(5px)" };
    }
  }

  return (
    <div className="flex items-center justify-center size-[600px] bg-white">
      <div>
        <div className="relative flex h-[160px] justify-center">
          <motion.div
            layout
            className="h-fit min-w-[90px] overflow-hidden bg-black"
            transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
            style={{ borderRadius: 32 }}
          >
            <div className="invisible pointer-events-none" aria-hidden="true">
              {content}
            </div>
          </motion.div>

          <div className="absolute left-1/2 top-0 flex h-[150px] w-[300px] -translate-x-1/2 items-start justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={view}
                initial={getTransitionTarget()}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={getTransitionTarget()}
                transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="rounded-full w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setViewWithTransition("idle")}
          >
            Idle
          </button>
          <button
            type="button"
            className="rounded-full w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setViewWithTransition("timer")}
          >
            Timer
          </button>
          <button
            type="button"
            className="rounded-full w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setViewWithTransition("ring")}
          >
            Ring
          </button>
        </div>
      </div>
    </div>
  );
}
