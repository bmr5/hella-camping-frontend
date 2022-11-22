import React from "react";

function AccountSettings() {
  return (
    <div className=" flex flex-col gap-5 items-center pt-5 w-3/4 ">
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
      <div className="border">
        <button className="border bg-green-300 rounded-lg p-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
