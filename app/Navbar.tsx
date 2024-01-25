"use client";

import {useSession} from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const {status, data} = useSession();
  console.log(status, data);

  return (
    <div className="flex justify-between bg-slate-200 p-4">
      <Link href="/" className="hover:bg-white p-2">
        Next.js
      </Link>
      <Link href="/users" className="hover:bg-white p-2">
        Users
      </Link>
      <Link href="/products" className="hover:bg-white p-2">
        Products
      </Link>
      <Link href="/admin" className="hover:bg-white p-2">
        Admin
      </Link>
      {status === "loading" && null}
      {status === "authenticated" && (
        <span>
          {data.user!.name}
          <Link href="api/auth/signout">Signout</Link>
        </span>
      )}

      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" className="hover:bg-white p-2">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
