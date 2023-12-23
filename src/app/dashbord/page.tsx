"use client";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return <div>HOME</div>;
}

export default Home;
