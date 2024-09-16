import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="loadeer">
      <Image
        src="/assets/icons/loader.svg"
        alt="loadeer"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};

export default Loader;
