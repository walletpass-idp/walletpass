declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_W3C_PID: string;
      NEXT_PUBLIC_SIGNIN_MESSAGE: string;
      NEXTAUTH_SECRET: string;
      SIWE_DOMAIN: string;
      NEXT_PUBLIC_GREETING_CONTRACT: `0x${string}`;
      NEXT_PUBLIC_NFT_CONTRACT: `0x${string}`;
    }
  }
}

export {};
