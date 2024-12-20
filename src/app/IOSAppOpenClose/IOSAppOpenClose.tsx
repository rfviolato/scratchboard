import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  AnimationPlaybackControls,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { AppFakeContent } from "./AppFakeContent";
import DynamicIsland from "../DynamicIsland/DynamicIsland";
import { useSetDynamicIslandView } from "../DynamicIsland/useSetDynamicIslandView";

export interface IOSApp {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface IOSAppOpenCloseProps {
  apps: IOSApp[];
}

export function IOSAppOpenClose({ apps }: IOSAppOpenCloseProps): ReactNode {
  const isSilentRef = useRef(false);
  const viewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { dynamicIslandView, setViewWithTransition } =
    useSetDynamicIslandView();
  const stopDragAnimationRef = useRef<AnimationPlaybackControls | null>(null);
  const openedAppYValue = useMotionValue(0);
  const openedAppOriginYValue = useMotionValue(
    DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y
  );
  const openedAppScaleTransform = useTransform(
    openedAppYValue,
    [0, -DRAG_CONSTRAINT_Y],
    [1, 0.3]
  );
  const openedAppDragControl = useRef<HTMLDivElement>(null);
  const [openedApp, setOpenedApp] = useState<IOSApp | null>(null);
  const [appOpenCloseAnimationDoneId, setAppOpenCloseAnimationDoneId] =
    useState<IOSApp["id"] | null>(null);
  const ref = useClickAway<HTMLDivElement>(() => {
    openedAppOriginYValue.set(DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y);
    setOpenedApp(null);
  });
  const controls = useDragControls();

  function startDraggingOpenedApp(event: React.PointerEvent<HTMLDivElement>) {
    controls.start(event);
  }

  function onRingButtonClick() {
    isSilentRef.current = !isSilentRef.current;
    setViewWithTransition({
      id: "ring",
      subView: isSilentRef.current ? "sound" : "silent",
    });

    if (viewTimeoutRef.current) {
      clearTimeout(viewTimeoutRef.current);
    }

    viewTimeoutRef.current = setTimeout(() => {
      setViewWithTransition({
        id: "default",
        subView: null,
      });
    }, 1500);
  }

  useMotionValueEvent(openedAppYValue, "change", (value) => {
    if (value === 0) {
      openedAppOriginYValue.set(DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y);
    }
  });

  return (
    <div ref={ref} className="relative size-full">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full z-50">
        <DynamicIsland view={dynamicIslandView} />
      </div>

      <motion.button
        onClick={onRingButtonClick}
        className="absolute top-16 -left-2 h-10 w-4 bg-black rounded-tr-md rounded-br-md flex items-center justify-end z-20 cursor-pointer"
        whileTap={{ x: -2 }}
      >
        <div className="h-[80%] bg-yellow-800 w-[2px] mr-1 rounded-md"></div>
      </motion.button>

      <div className="relative z-10 grid grid-cols-4 gap-4 items-center content-center p-8 pt-16">
        {apps.map((app) => {
          const { id } = app;
          const isAppOpen = openedApp?.id === id;
          const isAppAnimating = appOpenCloseAnimationDoneId === id;

          return (
            <div key={id} className="flex items-center justify-center">
              <div
                className="relative"
                style={{ zIndex: isAppAnimating ? "20" : "10" }}
              >
                <motion.button
                  layoutId={`app-${id}`}
                  onClick={() => {
                    openedAppYValue.set(0);
                    openedAppOriginYValue.set(
                      DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y
                    );
                    setOpenedApp(app);
                    setAppOpenCloseAnimationDoneId(app.id);
                  }}
                  className="size-[48px]"
                  style={{ borderRadius: 10, backgroundColor: app.color }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: CLOSE_DURATION,
                  }}
                ></motion.button>
                <motion.div
                  key={`app-icon-${id}`}
                  layoutId={`app-icon-${id}`}
                  className="pointer-events-none absolute top-0 left-0 size-[48px] flex items-center justify-center"
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: CLOSE_DURATION,
                  }}
                  animate={
                    isAppOpen
                      ? {
                          opacity: 0,
                          transition: {
                            duration: CLOSE_DURATION / 2,
                            delay: CLOSE_DURATION / 8,
                          },
                        }
                      : {
                          opacity: 1,
                          transition: { delay: CLOSE_DURATION / 8 },
                        }
                  }
                >
                  <i className={clsx("text-3xl", app.icon)}></i>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {openedApp && (
          <motion.div
            drag
            dragSnapToOrigin
            dragMomentum={false}
            dragListener={false}
            dragControls={controls}
            dragConstraints={openedAppDragControl}
            dragTransition={{
              power: 0.1,
              bounceStiffness: 300,
              bounceDamping: 35,
            }}
            onDragStart={() => {
              stopDragAnimationRef.current?.stop();
              openedAppOriginYValue.set(1);
            }}
            onDrag={(_, eventInfo) => {
              openedAppYValue.set(eventInfo.offset.y, false);
            }}
            onDragEnd={(_, eventInfo) => {
              if (eventInfo.offset.y < -200) {
                openedAppOriginYValue.set(
                  DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y
                );

                setOpenedApp(null);
              } else {
                stopDragAnimationRef.current = animate(openedAppYValue, 0, {
                  type: "spring",
                  bounce: 0,
                  duration: 0.35,
                });
              }
            }}
            key="app-content"
            layoutId={`app-${openedApp.id}`}
            className="absolute z-10 top-0 left-0 size-full p-8 text-black bg-white"
            transition={{ type: "spring", duration: OPEN_DURATION, bounce: 0 }}
            style={{
              borderRadius: 48,
              scale: openedAppScaleTransform,
              originY: openedAppOriginYValue,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: OPEN_DURATION / 6,
                delay: OPEN_DURATION / 10,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: OPEN_DURATION / 4,
                delay: OPEN_DURATION / 10,
              },
            }}
            onLayoutAnimationStart={() => {
              setAppOpenCloseAnimationDoneId(openedApp.id);
            }}
          >
            <div className="absolute left-0 top-[15%] flex justify-center w-full scale-[8] invisible">
              <motion.div
                layoutId={`app-icon-${openedApp.id}`}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: OPEN_DURATION,
                }}
              >
                <i className={clsx("text-3xl", openedApp.icon)}></i>
              </motion.div>
            </div>

            <AppFakeContent />

            <div
              ref={openedAppDragControl}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 flex items-end justify-center z-50"
              style={{ height: DRAG_CONSTRAINT_Y, touchAction: "none" }}
            >
              <div
                onPointerDown={startDraggingOpenedApp}
                className="h-8 w-full flex items-end justify-center"
              >
                <div className="h-1.5 bg-black w-[80%] rounded-xl mb-2.5"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const OPEN_DURATION = 0.5;
const CLOSE_DURATION = 0.4;
const DEFAULT_OPENED_APP_CONTAINER_ORIGIN_Y = 0.5;
const DRAG_CONSTRAINT_Y = 500;
