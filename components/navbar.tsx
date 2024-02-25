import Link from "next/link";
import React from "react";

export const Navbar = () => {
    return (
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 flex min-h-14 items-center justify-between">
      <div className="relative mx-10">
        <Link href="/">
          <span className="text-gray-800 hover:text-gray-600 mr-4">Home</span>
        </Link>
      </div>
    </nav>
    );
};
