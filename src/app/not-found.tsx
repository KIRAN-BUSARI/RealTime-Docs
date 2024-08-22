import React from "react";
export const runtime = "edge";

const notFound = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      Page not found
    </div>
  );
};

export default notFound;
