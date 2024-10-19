"use client";
import { AnimatePresence, motion } from "framer-motion";
import { type PropsWithChildren, type ReactNode } from "react";

interface MorphingTextProps {
  text: string;
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
  text,
}: PropsWithChildren<MorphingTextProps>): ReactNode {
  const characters = generateCharacterContent(text);
  console.log(characters);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {characters.map(({ character, key }) => (
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
          style={{ whiteSpace: "pre" }}
        >
          {character}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
