import React from "react";
import { useSession, signOut } from "next-auth/react";

function AccountSettings() {
  // TODO: Utilize user data to prefill the placeholders

  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="flex flex-col gap-5 items-center pt-5 w-3/4 ">
      <h1 className="font-extrabold text-3xl ">Settings</h1>
      <p className="w-3/4">
        In this area you can edit your personal information and preferences.
        Please keep your contact information up-to-date. Doing so helps alerts
        reach your mobile phone, and invoices land in your email inbox.
      </p>
      <h2 className="font-bold text-2xl">Name</h2>
      <input
        type="text"
        name="Name"
        id="name"
        placeholder="Name"
        className="border w-3/4 rounded-md text-center p-4"
      />
      <h2 className="font-bold text-2xl">Email</h2>
      <input
        type="email"
        name="Email"
        id="email"
        placeholder="Email"
        className="border w-3/4 rounded-md text-center p-4"
      />
      <h2 className="font-bold text-2xl">Phone Number</h2>
      <input
        type="tel"
        name="Phone Number"
        id="phone"
        placeholder="Phone number"
        className="border w-3/4 rounded-md text-center p-4"
      />
      <div className="flex flex-col gap-2 w-3/4 items-center">
        <button
          onClick={() => {}}
          className="border bg-emerald-400 hover:bg-green-400  rounded-lg w-1/3 "
        >
          <p>Save Changes</p>
        </button>
        <button
          className="border bg-slate-400 hover:bg-green-400  rounded-lg w-1/3"
          onClick={() => signOut()}
        >
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
