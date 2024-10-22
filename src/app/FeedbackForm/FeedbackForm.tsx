import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";

export function FeedbackForm(): ReactNode {
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsExpanded(false);
  });

  function onAddCommentClick(): void {
    setIsExpanded(true);
  }

  function onSubmit(): void {
    setHasSubmittedSuccessfully(true);

    setTimeout(() => {
      setIsExpanded(false);
      setHasSubmittedSuccessfully(false);
    }, 3000);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsExpanded(false);
        setHasSubmittedSuccessfully(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref}>
      {!isExpanded && (
        <motion.button
          animate={{ opacity: 1 }}
          layoutId="add-comment"
          className="px-6 h-[40px] bg-white text-black opacity-100"
          whileTap={{ scale: 0.95, opacity: 0.8 }}
          whileHover={{ opacity: 0.9 }}
          style={{ borderRadius: 4 }}
          onClick={onAddCommentClick}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        >
          <motion.span layoutId="text-placeholder" className="block">
            Add comment
          </motion.span>
        </motion.button>
      )}

      <AnimatePresence initial={false} mode="popLayout">
        {isExpanded && (
          <motion.div
            layoutId="add-comment"
            className="border-gray-200 rounded-lg border-4 overflow-hidden w-[400px] h-[300px] bg-white"
            style={{ borderRadius: 8 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.15,
            }}
            onLayoutAnimationComplete={() => {
              textAreaRef.current?.focus();
            }}
          >
            {hasSubmittedSuccessfully ? (
              <motion.div
                key="success"
                className="size-full"
                initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  filter: "blur(6px)",
                  transition: { duration: 0.15 },
                }}
                transition={{ type: "spring", duration: 0.6, bounce: 0 }}
              >
                <div className="bg-white size-full flex flex-col items-center justify-center text-black">
                  <i className="far fa-check-circle text-6xl"></i>
                  <h1 className="font-bold mt-4 text-xl">Comment submitted!</h1>
                  <p className="mt-0.5">
                    Thanks for helping us improve with your feedback.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key="form"
                  className="relative"
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                >
                  <textarea
                    ref={textAreaRef}
                    className="outline-none text-black px-4 py-2 resize-none m-0 align-bottom peer w-full h-[218px]"
                    name="comment"
                    id="comment-text-area"
                    placeholder=" "
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSubmit();
                      }
                    }}
                  ></textarea>
                  <motion.span
                    layoutId="text-placeholder"
                    className="pointer-events-none block absolute top-2 left-4 text-black bg-white peer-placeholder-shown:visible invisible peer-focus:opacity-70 transition-opacity"
                  >
                    Add comment
                  </motion.span>
                </motion.div>

                <div className="relative p-4 border-t-2 border-gray-200 bg-white flex justify-end z-10">
                  <motion.div
                    className="text-white rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                  >
                    <button
                      onClick={onSubmit}
                      className="px-6 py-2 rounded-md bg-black"
                    >
                      <div className="mr-2 inline-block">Submit comment</div>
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
