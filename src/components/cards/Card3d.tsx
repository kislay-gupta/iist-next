import Image from "next/image";
import { PinContainer } from "../ui/3d-pin";

export function AnimatedPinDemo({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string;
}) {
  return (
    <div className="flex justify-center">
      <PinContainer className=" text-black" title={title} href={href}>
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[16rem] h-[16rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            {title}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal"></div>
          <Image
            width={500}
            height={500}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </PinContainer>
    </div>
  );
}
