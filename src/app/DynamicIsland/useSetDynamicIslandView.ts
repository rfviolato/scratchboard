import { useState } from "react";
import { View } from "./types";

let transitionInterval: ReturnType<typeof setTimeout> | null = null;

interface SetDynamicIslandViewOutput {
  dynamicIslandView: View;
  setViewWithTransition(nextView: View): void;
}

export function useSetDynamicIslandView(): SetDynamicIslandViewOutput {
  const [dynamicIslandView, setDynamicIslandView] = useState<View>({
    id: "default",
    subView: null,
  });

  function setViewWithTransition(nextView: View) {
    if (nextView === dynamicIslandView) {
      return;
    }

    if (transitionInterval) {
      clearInterval(transitionInterval);
    }

    if (nextView.id === "default" || dynamicIslandView.id === "default") {
      setDynamicIslandView(nextView);

      return;
    }

    if (nextView.id !== dynamicIslandView.id) {
      setDynamicIslandView({
        id: "default",
        subView: null,
      });

      transitionInterval = setTimeout(
        () => setDynamicIslandView(nextView),
        500
      );

      return;
    }

    setDynamicIslandView(nextView);
  }

  return {
    dynamicIslandView,
    setViewWithTransition,
  };
}
