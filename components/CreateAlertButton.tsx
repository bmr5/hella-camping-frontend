import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";

type Props = {
  parkID: number;
};

function CreateAlertButton({ parkID }: Props) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Link
        href={{
          pathname: `/alerts/${parkID}`,
        }}
        className="h-20 bg-emerald-400 w-full border rounded-lg text-white text-xl font-bold shadow-md flex items-center justify-center transition duration-300 hover:bg-green-400"
      >
        Create Alert
      </Link>
    );
  } else {
    return (
      <button
        onClick={() => signIn("cognito")}
        className="h-20 bg-emerald-400 w-full border rounded-lg text-white text-xl font-bold shadow-md flex items-center justify-center transition duration-300 hover:bg-green-400"
      >
        Login To Create Alert
      </button>
    );
  }
}

export default CreateAlertButton;
