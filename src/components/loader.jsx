import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function MLLoader() {
  return (
    <div className="z-[100] fixed h-[100vh] w-[100vw] flex items-center justify-center">
      <ClipLoader
  color="black"
  size={80}
/>
    </div>
  );
}

export default MLLoader;