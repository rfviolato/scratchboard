"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

interface MorphingTextProps {
  initialText: string;
  endText: string;
}

interface ChacacterContent {
  character: string;
  key: string;
}

function generateCharacterContent(text: string): ChacacterContent[] {
  const previouslyEncounteredCharacters: Record<string, number> = {};

  return text.split("").map((character) => {
    if (!previouslyEncounteredCharacters[character]) {
      previouslyEncounteredCharacters[character] = 0;
    }

    const chacacterCount = previouslyEncounteredCharacters[character];
    previouslyEncounteredCharacters[character]++;

    return {
      character,
      key: `${character}-${chacacterCount}`,
    };
  });
}

export function MorphingText({
  initialText,
  endText,
}: PropsWithChildren<MorphingTextProps>): ReactNode {
  const [isEndTextDisplayed, setIsEndTextDisplayed] = useState(false);
  const endTextCharacters = generateCharacterContent(endText);
  const initialTextCharacters = generateCharacterContent(initialText);
  const textContent = isEndTextDisplayed
    ? endTextCharacters
    : initialTextCharacters;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEndTextDisplayed((isEndTextDisplayed) => !isEndTextDisplayed);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {textContent.map(({ character, key }) => (
        <motion.span
          layoutId={key}
          key={key}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        >
          {character}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
