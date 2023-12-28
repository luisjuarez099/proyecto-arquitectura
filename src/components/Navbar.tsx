"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
function Navbar() {
  const { data: session }: any = useSession(); //toma el valor de la sesion
  console.log(session);
  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">NextAuth</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/about">About</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/Contacto">Contacto</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <li className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                <Link href="/login">Login</Link>
              </li>
              <li className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800  rounded-full md:inline-flex">
                <Link href="/Register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
