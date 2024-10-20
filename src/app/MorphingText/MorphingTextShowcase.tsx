"use client";

import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { MorphingText } from "./MorphingText";

interface MorphingTextShowcaseProps {
  initialText: string;
  endText: string;
}

export function MorphingTextShowcase({
  initialText,
  endText,
}: PropsWithChildren<MorphingTextShowcaseProps>): ReactNode {
  const [isEndTextDisplayed, setIsEndTextDisplayed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEndTextDisplayed((isEndTextDisplayed) => !isEndTextDisplayed);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <MorphingText text={isEndTextDisplayed ? endText : initialText} />;
}
