import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

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
  const openedAppYValue = useSpring(0);
  const openedAppOriginYValue = useMotionValue(
    DEFAULT_OPENE_APP_CONTAINER_ORIGIN_Y
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
    setOpenedApp(null);
  });
  const controls = useDragControls();
  function startDraggingOpenedApp(event: React.PointerEvent<HTMLDivElement>) {
    controls.start(event);
  }

  return (
    <div ref={ref} className="relative size-full">
      <div className="relative z-10 grid grid-cols-4 gap-4 items-center content-center p-8">
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
                    openedAppYValue.jump(0);
                    openedAppOriginYValue.jump(
                      DEFAULT_OPENE_APP_CONTAINER_ORIGIN_Y
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
            dragListener={false}
            dragControls={controls}
            dragConstraints={openedAppDragControl}
            dragSnapToOrigin
            onDragStart={() => {
              openedAppOriginYValue.set(1);
            }}
            onDrag={(_, eventInfo) => {
              openedAppYValue.jump(eventInfo.offset.y, false);
            }}
            onDragEnd={(_, eventInfo) => {
              if (eventInfo.offset.y < -200) {
                openedAppOriginYValue.set(DEFAULT_OPENE_APP_CONTAINER_ORIGIN_Y);
                setOpenedApp(null);
              } else {
                openedAppYValue.on("animationComplete", () => {
                  openedAppOriginYValue.set(
                    DEFAULT_OPENE_APP_CONTAINER_ORIGIN_Y
                  );
                });
                openedAppYValue.set(0);
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
            <h1 className="text-4xl select-none">App content</h1>
            <p className="mt-4 select-none">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              voluptatum est ipsum temporibus repellendus officia iusto. Ipsum,
              dicta! Ea labore harum ut adipisci omnis reiciendis unde neque
              sint delectus nihil?
            </p>
            <p className="mt-2 select-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              velit, iste quae ex quisquam reprehenderit. Dolore provident hic
              ratione, eos, sunt dolorum iusto velit earum dolorem corrupti
              facilis sed tempora. Dolores cum incidunt rerum facilis
              consequuntur eum consectetur libero distinctio mollitia possimus
              cupiditate accusamus fuga, labore neque aliquid accusantium optio
              quasi necessitatibus. Rem totam recusandae nesciunt aperiam
              suscipit ducimus! Adipisci.
            </p>

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
const DEFAULT_OPENE_APP_CONTAINER_ORIGIN_Y = 0.5;
const DRAG_CONSTRAINT_Y = 500;
