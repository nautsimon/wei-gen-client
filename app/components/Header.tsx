import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full py-12">
      <div className="mx-auto flex flex-col items-center">
        <div className="flex space-x-4">
          <div className="relative w-96 h-24">
            <Image
              src="/media/argonne.png"
              alt="Argonne"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative w-96 h-24">
            <Image
              src="/media/rpl.png"
              alt="RPL"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <h1 className="mt-12 text-2xl">weigen</h1>
      </div>
    </header>
  );
};

export default Header;
