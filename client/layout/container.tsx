import React from "react";

const Container = ({ children }: { children: any }) => {
  return <section className="max-w-screen-lg mx-auto py-4">{children}</section>;
};

export default Container;
