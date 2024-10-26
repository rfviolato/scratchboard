import Image from "next/image";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

export interface IOSApp {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface IOSAppOpenCloseProps {
  apps: IOSApp[];
}

/**
  TODO: Icon scaling like ios' animation
 */

export function IOSAppOpenClose({ apps }: IOSAppOpenCloseProps): ReactNode {
  const [selectedApp, setSelectedApp] = useState<IOSApp | null>(null);
  const ref = useClickAway<HTMLDivElement>(() => {
    setSelectedApp(null);
  });

  return (
    <div
      ref={ref}
      className="relative w-[360px] h-[640px] bg-white rounded-[48px] p-8 text-white overflow-hidden bg-cover"
    >
      <Image
        alt="bg"
        src="/images/background.webp"
        className="absolute top-0 left-0 object-cover"
        width={360}
        height={640}
      />
      <div className="relative z-10 grid grid-cols-4 gap-4 items-center content-center">
        {apps.map((app) => {
          const { id } = app;

          return (
            <div key={id} className="flex items-center justify-center">
              <motion.button
                layoutId={`app-${id}`}
                onClick={() => setSelectedApp(app)}
                className="bg-indigo-600 size-[48px]"
                style={{ borderRadius: 10, backgroundColor: app.color }}
                transition={{
                  type: "spring",
                  duration: CLOSE_DURATION,
                  bounce: 0,
                }}
              >
                <i className={clsx("text-3xl", app.icon)}></i>
              </motion.button>
            </div>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {selectedApp && (
          <motion.div
            key="app-content"
            layoutId={`app-${selectedApp.id}`}
            className="absolute z-20 top-0 left-0 size-full bg-gray-200 p-8 text-black"
            transition={{ type: "spring", duration: OPEN_DURATION, bounce: 0 }}
            style={{ borderRadius: 48, backgroundColor: "white" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { delay: 0.05 } }}
          >
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              voluptatum est ipsum temporibus repellendus officia iusto. Ipsum,
              dicta! Ea labore harum ut adipisci omnis reiciendis unde neque
              sint delectus nihil?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              velit, iste quae ex quisquam reprehenderit. Dolore provident hic
              ratione, eos, sunt dolorum iusto velit earum dolorem corrupti
              facilis sed tempora. Dolores cum incidunt rerum facilis
              consequuntur eum consectetur libero distinctio mollitia possimus
              cupiditate accusamus fuga, labore neque aliquid accusantium optio
              quasi necessitatibus. Rem totam recusandae nesciunt aperiam
              suscipit ducimus! Adipisci.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const OPEN_DURATION = 0.45;
const CLOSE_DURATION = 0.375;
