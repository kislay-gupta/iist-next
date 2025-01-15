import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed cursor-wait inset-0 flex h-screen z-50 w-full bg-black/50 justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
      <Image
        src="/logo.png"
        fill
        alt="logo"
        className="rounded-full h-28 w-28"
      />
    </div>
  );
};

export default Loader;
