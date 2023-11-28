"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session?.user);
  }, [session]);

  return <></>;
}
