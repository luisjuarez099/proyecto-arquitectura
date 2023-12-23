"use client";
import { useSession } from "next-auth/react";

function Profile() {
  const { data: session, status } = useSession();
  // console.log(session, status);
  return (
  <div>
    <h1>Profile</h1>
    <p>Session: {JSON.stringify(session)}</p>
    <p>Status: {status}</p>
  </div>);
}

export default Profile;
