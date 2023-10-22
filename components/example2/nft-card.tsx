import dynamic from "next/dynamic";
import React from "react";

import { Card } from "@/components/ui/card";

const MintSection = dynamic(() => import("./mint-section"), { ssr: false });

const NFTCard = () => {
  return (
    <Card className="text-xl font-bold text-gray-400">
      <h3>Example 2:</h3>
      <MintSection />
    </Card>
  );
};

export default NFTCard;
