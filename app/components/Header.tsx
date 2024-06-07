import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full  py-12">
      <div className=" mx-auto flex flex-col items-center">
        <div className="flex space-x-4">
          <Image
            src="/media/argonne.png"
            alt="Logo 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "70px" }}
          />
          <Image
            src="/media/rpl.png"
            alt="Logo 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "70px" }}
          />
        </div>
        <h1 className="mt-12 text-2xl ">weigen</h1>
      </div>
    </header>
  );
};

export default Header;
