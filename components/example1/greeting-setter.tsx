"use client";
import React, { useRef, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";

import greeterAbi from "@/blockchain/greeter_abi.json";
import { Button } from "@/components/ui/button";

const GreetingSetter = () => {
  const { address: account } = useAccount();
  const { write } = useContractWrite({
    address: process.env.NEXT_PUBLIC_GREETING_CONTRACT,
    abi: greeterAbi,
    functionName: "setGreetings",
    account,
  });

  const greeting = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSet = async () => {
    write({
      args: [greeting.current?.value],
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-black p-4 rounded-lg border-2 border-gray-600 my-4">
      <h4 className="text-xl font-semibold text-gray-400">Set Greeting</h4>
      <input
        className=" block w-full p-2.5 bg-black rounded-lg border border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500 my-4"
        ref={greeting}
        value={value}
        onChange={handleChange}
      />
      <Button variant="secondary" onClick={handleSet}>
        Set
      </Button>
    </div>
  );
};

export default GreetingSetter;
