import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className="header">
      <Link className="md:flex-1" href={"/"}>
        <Image
          src={"/assets/icons/logo.svg"}
          width={120}
          height={32}
          className="hidden md:block"
          alt="Logo"
        />
        <Image
          src={"/assets/icons/logo-icon.svg"}
          width={32}
          height={32}
          className="md:hidden mr-2"
          alt="Logo"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
