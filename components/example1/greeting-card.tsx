import dynamic from "next/dynamic";
import React from "react";

import { Card } from "@/components/ui/card";

const GreetingGetter = dynamic(() => import("./greeting-getter"), {
  ssr: false,
});

const GreetingSetter = dynamic(() => import("./greeting-setter"), {
  ssr: false,
});

const GreetingCard = () => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-400">
        Example 1: Greeting Card
      </h3>
      <GreetingGetter />
      <GreetingSetter />
    </Card>
  );
};

export default GreetingCard;
