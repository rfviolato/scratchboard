import { type ReactNode } from "react";
import DynamicIsland from "./DynamicIsland";
import { useSetDynamicIslandView } from "./useSetDynamicIslandView";

export function DynamicIslandShowcase(): ReactNode {
  const { dynamicIslandView, setViewWithTransition } =
    useSetDynamicIslandView();

  function onRingButtonClick() {
    if (dynamicIslandView.id === "ring") {
      setViewWithTransition({
        id: "ring",
        subView: dynamicIslandView.subView === "silent" ? "sound" : "silent",
      });
    } else {
      setViewWithTransition({ id: "ring", subView: "silent" });
    }
  }

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
            onClick={() =>
              setViewWithTransition({ id: "default", subView: null })
            }
          >
            Idle
          </button>
          <button
            type="button"
            className="rounded-full w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() =>
              setViewWithTransition({ id: "timer", subView: null })
            }
          >
            Timer
          </button>
          <button
            type="button"
            className="rounded-full w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={onRingButtonClick}
          >
            Ring
          </button>
        </div>
      </div>
    </div>
  );
}
