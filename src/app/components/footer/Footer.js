import "./Footer.css";
import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flex justify-end pb-1 h-12 bg-neutral-300 text-black dark:bg-black dark:text-white">
      <nav>
        <ul className="list-none mr-12 mt-2 flex gap-5">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>

          <li>All rights reserved {new Date().getFullYear()}</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
