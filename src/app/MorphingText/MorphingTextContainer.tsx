"use client";

import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { MorphingText } from "./MorphingText";

interface MorphingTextContainerProps {
  initialText: string;
  endText: string;
}

export function MorphingTextContainer({
  initialText,
  endText,
}: PropsWithChildren<MorphingTextContainerProps>): ReactNode {
  const [isEndTextDisplayed, setIsEndTextDisplayed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEndTextDisplayed((isEndTextDisplayed) => !isEndTextDisplayed);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <MorphingText text={isEndTextDisplayed ? endText : initialText} />;
}
