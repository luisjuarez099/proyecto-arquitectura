"use client";
import { useSession, signOut } from "next-auth/react";

function Profile() {
  const { data: session, status } = useSession();
  // console.log(session, status);
  return (
    <div>
      <h1>Profile</h1>
      <p>Session: {JSON.stringify(session)}</p>
      <p>Status: {status}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Salir
      </button>
    </div>
  );
}

export default Profile;
