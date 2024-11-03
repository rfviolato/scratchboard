import Image from "next/image";
import type { PropsWithChildren, ReactNode } from "react";

export function IOSContainer({ children }: PropsWithChildren): ReactNode {
  return (
    <section className="relative w-[360px] h-[640px] bg-white rounded-[48px] text-white overflow-hidden bg-cover">
      <Image
        alt="bg"
        src="/images/background.webp"
        className="absolute top-0 left-0 object-cover"
        width={360}
        height={640}
      />
      {children}
    </section>
  );
}
