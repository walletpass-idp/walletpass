"use client";
import React, { useState } from "react";
import { usePublicClient } from "wagmi";

import greeterAbi from "@/blockchain/greeter_abi.json";
import { Button } from "@/components/ui/button";

const GreetingGetter = () => {
  const [greeting, setGreeting] = useState<string>();
  const publicClient = usePublicClient();
  const getGreeting = async () => {
    const data = await publicClient.readContract({
      address: process.env.NEXT_PUBLIC_GREETING_CONTRACT,
      abi: greeterAbi,
      functionName: "greeting",
    });
    setGreeting(data as string);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-black p-4 rounded-lg border-2 border-gray-600 my-4">
      <h4 className="text-xl font-semibold text-gray-400">Get Greeting</h4>
      <p className="block w-full my-4 text-gray-200">
        <b>Greeting: </b> {greeting}
      </p>
      <Button onClick={getGreeting} variant="secondary">
        Get
      </Button>
    </div>
  );
};

export default GreetingGetter;
