import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { Park } from "../pages";
import { nameWithNoSpaces } from "../hooks/nameTransformUtils";

type Props = {
  park: Park;
};

function CreateAlertButton({ park }: Props) {
  const { status } = useSession();
  const name = nameWithNoSpaces(park.name);

  if (status === "authenticated") {
    return (
      <Link
        href={`/alerts/${park.id}?name=${name}`}
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
