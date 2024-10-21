import { useEffect, useRef, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import clsx from "clsx";

interface FeedbackButtonProps {
  defaultText: string;
  successText: string;
  isSuccessful: boolean;
  errorText: string;
  hasErrored: boolean;
  loadingText: string;
  isLoading: boolean;
  isLayoutAnimationEnabled?: boolean;
  onClick: () => void;
}

export function FeedbackButton({
  defaultText,
  successText,
  isSuccessful,
  errorText,
  hasErrored,
  loadingText,
  isLoading,
  onClick,
  isLayoutAnimationEnabled = true,
}: FeedbackButtonProps): ReactNode {
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const progress = useMotionValue(0);
  const input = [0, 100];
  const output = ["-100%", "0%"];
  const translateX = useTransform(progress, input, output);
  const isInDefaultState = !isSuccessful && !hasErrored && !isLoading;
  const isDisabled = !isInDefaultState;

  function renderButtonText(): string {
    if (isSuccessful) {
      return successText;
    }

    if (hasErrored) {
      return errorText;
    }

    if (isLoading) {
      return loadingText;
    }

    return defaultText;
  }

  useEffect(() => {
    if (isLoading) {
      progressInterval.current = setInterval(() => {
        progress.set(progress.get() + Math.floor(Math.random() * 10) + 1);
      }, 130);
    }

    if (isSuccessful) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progress.set(100);
    }

    if (isInDefaultState) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progress.set(0);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isInDefaultState, isLoading, progress, isSuccessful]);

  const text = renderButtonText();

  return (
    <div
      className="relative text-center"
      key={isLayoutAnimationEnabled.toString()}
    >
      <motion.button
        layout={isLayoutAnimationEnabled}
        className={clsx(
          "px-6 h-[40px] transition-colors duration-500 overflow-hidden",
          {
            "bg-green-600": isSuccessful,
            "bg-red-600": hasErrored,
            "bg-blue-600": !isSuccessful && !hasErrored,
            "bg-blue-800": isLoading,
            "cursor-wait": isLoading,
            "cursor-default": isSuccessful,
          }
        )}
        style={{ borderRadius: 4 }}
        onClick={onClick}
        disabled={isDisabled}
        whileTap={isDisabled ? {} : { scale: 0.95, opacity: 0.9 }}
      >
        <span className="opacity-0">{renderButtonText()}</span>
        <motion.div
          initial={false}
          className="bg-slate-400 w-full h-[2px] absolute bottom-0 left-0"
          animate={{ scaleY: isLoading ? 1 : 0, originY: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{ x: translateX }}
            className="bg-slate-200 h-full w-full transition-transform -translate-x-full"
          ></motion.div>
        </motion.div>
      </motion.button>

      <div className="top-0 left-1/2 -translate-x-1/2 absolute pointer-events-none h-full w-[200px] flex flex-col items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            variants={buttonTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="text-white w-full"
          >
            {renderButtonText()}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const buttonTextVariants = {
  initial: { opacity: 0, filter: "blur(4px)", y: 10, scale: 0.8 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    y: -10,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};
