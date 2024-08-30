import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">{children}</div>
  );
};

export default Container;
