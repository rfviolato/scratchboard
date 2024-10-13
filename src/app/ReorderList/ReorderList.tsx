"use client";
import { useState, type PropsWithChildren, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ReorderListProps {
  items: string[];
}

export function ReorderList({}: PropsWithChildren<ReorderListProps>): ReactNode {
  const [moved, setMoved] = useState(false);

  return (
    <motion.div
      onClick={() => setMoved(!moved)}
      animate={{ x: moved ? 200 : 0 }}
      className="size-20 bg-yellow-300 rounded-xl"
    ></motion.div>
  );
}
