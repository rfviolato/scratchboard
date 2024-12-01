import { type ReactNode } from "react";
import DynamicIsland from "./DynamicIsland";
import { useSetDynamicIslandView } from "./useSetDynamicIslandView";

export function DynamicIslandShowcase(): ReactNode {
  const { dynamicIslandView, setViewWithTransition } =
    useSetDynamicIslandView();

  return (
    <div className="flex items-center justify-center size-[600px] bg-white">
      <div>
        <div className="h-[160px]">
          <DynamicIsland view={dynamicIslandView} />
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
