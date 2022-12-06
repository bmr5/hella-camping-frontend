import React from "react";

type Props = {
  onSubmit: () => void;
};

function SubmitAlertButton({ onSubmit }: Props) {
  return (
    <button
      onClick={onSubmit}
      className=" shadow-md h-20 border text-2xl font-bold text-white bg-green-500 w-3/4 rounded-lg mb-10 transition duration-300 hover:bg-green-400"
    >
      Create Alert
    </button>
  );
}

export default SubmitAlertButton;
