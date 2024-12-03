"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";
import { AnimatePresence, motion, Variant } from "framer-motion";
import { RingView } from "./types";

const textVariant: Record<string, Variant> = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};

interface RingProps {
  subView: RingView["subView"];
}

export function Ring({ subView = "silent" }: RingProps): ReactNode {
  const isSilent = subView === "silent";

  return (
    <motion.div
      initial={false}
      className={clsx("relative flex h-7 items-center justify-between px-2.5")}
      animate={{ width: isSilent ? 148 : 128 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <AnimatePresence>
        {isSilent ? (
          <motion.div
            key="silent-bg"
            className="absolute left-[5px] h-[18px] rounded-full bg-[#FD4F30]"
            initial={{ width: 18, opacity: 0, filter: "blur(4px)" }}
            animate={{ width: 40, opacity: 1, filter: "blur(0)" }}
            exit={{ width: 18, opacity: 0, filter: "blur(4px)" }}
            transition={{
              width: { type: "spring", bounce: 0.35 },
              opacity: { duration: 0.3 },
              filter: { duration: 0.3 },
            }}
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        key="bell-wrapper"
        animate={{ x: isSilent ? 8.5 : 0 }}
        className="relative h-[12.75px] w-[11.25px]"
      >
        <motion.svg
          key="bell"
          animate={{
            rotate: isSilent
              ? [-20, 10, -5, 0]
              : [20, -20, 20, -20, 10, -10, 10, -10, 0],
          }}
          className="absolute inset-0"
          width="11.25"
          height="12.75"
          viewBox="0 0 15 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z"
            fill="white"
          />
        </motion.svg>
        <AnimatePresence>
          {isSilent ? (
            <div className="absolute inset-0 h-5 -translate-y-[5px] translate-x-[5px] rotate-[-40deg]">
              <motion.div
                key="bell-stroke"
                animate={{ height: 16 }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  delay: 0.15,
                  duration: 0.2,
                }}
                className="w-fit rounded-full"
              >
                <div className="flex h-full w-[3px] items-center justify-center rounded-full bg-[#FD4F30]">
                  <div className="h-full w-[0.75px] rounded-full bg-white" />
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </motion.div>
      <div className="ml-auto flex items-center">
        <AnimatePresence initial={false} mode="popLayout">
          {isSilent ? (
            <motion.span
              variants={textVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              key="silent"
              className="text-xs font-medium text-[#FD4F30]"
            >
              Silent
            </motion.span>
          ) : (
            <motion.span
              variants={textVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              key="ring"
              className="text-xs font-medium text-white"
            >
              Ring
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
