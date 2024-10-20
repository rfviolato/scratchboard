import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface FeedbackButtonProps {
  defaultText: string;
  successText: string;
  isSuccessful: boolean;
  errorText: string;
  hasErrored: boolean;
  loadingText: string;
  isLoading: boolean;
  onClick: () => void;
}

let progressInterval: ReturnType<typeof setInterval>;

export function FeedbackButton({
  defaultText,
  successText,
  isSuccessful,
  errorText,
  hasErrored,
  loadingText,
  isLoading,
  onClick,
}: FeedbackButtonProps): ReactNode {
  const progressRef = useRef<number>(0);
  const progressElementRef = useRef<HTMLDivElement>(null);

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

  /**
   * TODO:
   * - Try to leverage one of the frame-motion Motion values https://www.framer.com/motion/motionvalue/
   * - Better randomize, with more chunks of the progress bar moving at once and never more than 100%
   * - Error state
   */
  useEffect(() => {
    if (isLoading) {
      progressInterval = setInterval(() => {
        progressRef.current =
          progressRef.current + Math.floor(Math.random() * 2) + 1;

        if (progressElementRef.current) {
          progressElementRef.current.style.transform = `translateX(${
            progressRef.current - 100
          }%)`;
        }
      }, 30);
    }

    if (isSuccessful) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      progressRef.current = 100;

      if (progressElementRef.current) {
        progressElementRef.current.style.transform = "translateX(0%)";
      }
    }

    // Reset
    if (!isSuccessful && !hasErrored && !isLoading) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      progressRef.current = 0;

      if (progressElementRef.current) {
        progressElementRef.current.style.transform = "translateX(-100%)";
      }
    }

    return () => clearInterval(progressInterval);
  }, [isLoading, isSuccessful, hasErrored]);

  const text = renderButtonText();

  return (
    <div className="relative text-center">
      <motion.button
        layout
        className={clsx(
          "px-4 h-[40px] transition-colors duration-300 overflow-hidden",
          {
            "bg-green-600": isSuccessful,
            "bg-red-600": hasErrored,
            "bg-blue-600": !isSuccessful && !hasErrored,
            "bg-blue-800": isLoading,
            "cursor-wait": isLoading,
            "cursor-default": isSuccessful,
          }
        )}
        style={{ borderRadius: 8 }}
        onClick={onClick}
        disabled={isLoading || isSuccessful}
        whileTap={{ scale: 0.95, opacity: 0.9 }}
      >
        <span className="opacity-0">{renderButtonText()}</span>
        <motion.div
          initial={false}
          className="bg-slate-400 w-full h-[2px] absolute bottom-0 left-0"
          animate={{ scaleY: isLoading ? 1 : 0, originY: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={progressElementRef}
            className="bg-slate-200 h-full w-full transition-transform -translate-x-full"
          ></div>
        </motion.div>
      </motion.button>

      <div className="top-0 left-1/2 -translate-x-1/2 absolute pointer-events-none h-full w-[220px] flex flex-col items-center justify-center">
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
