import React from "react";

const AuthLayout = ({ children }: any) => {
  return (
    <div>
      <nav className="bg-red-500 text-white">
        This is navbar without /auth prefix
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
