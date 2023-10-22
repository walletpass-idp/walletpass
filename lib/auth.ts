import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

import prisma from "@/lib/prisma";

const securefetch = async (path:string, payload = {}) => {
  const headers = {
    'apikey': 'd3620c99-f374-43e1-8acc-b64b838cac8b',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  }
  if (payload) {
    // eslint-disable-next-line no-param-reassign
    payload = JSON.stringify( payload )
  }
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body: payload,
  })
  if (res.status === 200) {
    // Server authentication succeeded
    return res.json()
  }
  // Server authentication failed
  let result = await res.json()
  throw result.error
}

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: "web3",
        name: "web3",
        credentials: {
          message: { label: "Message", type: "text" },
          signedMessage: { label: "Signed Message", type: "text" }, // aka signature
        },
  
        async authorize(credentials, req) {
          console.log("\n\nHIT -- AUTH", credentials);
          if (!credentials?.signedMessage || !credentials?.message) {
            return null;
          }
  
          try {
            // On the Client side, the SiweMessage()
            // will be constructed like this:
            //
            // const siwe = new SiweMessage({
            //   address: address,
            //   statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
            //   nonce: await getCsrfToken(),
            //   expirationTime: new Date(Date.now() + 2*60*60*1000).toString(),
            //   chainId: chain?.id
            // });
            if (credentials?.message.startsWith('@WalletPass@')) {
              const aaAddress = credentials?.message.split("@",3)[2]
              console.log("aa siwe backend: ", aaAddress)
              const {success, result} = await securefetch(`https://api.connect.cometh.io/wallets/${aaAddress}/is-valid-signature`, {signature: credentials.signedMessage, message: "WalletPass" })
              if (success && result ){
                return {
                  id: aaAddress,
                };

            }
          } else {
            const siwe = new SiweMessage(JSON.parse(credentials?.message));
            let result = await siwe.verify({
              signature: credentials.signedMessage,
              nonce: await getCsrfToken({ req: { headers: req.headers } }),
            });
  
            if (!result.success) throw new Error("Invalid Signature");
  
            if (result.data.statement !== process.env.NEXT_PUBLIC_SIGNIN_MESSAGE)
              throw new Error("Statement Mismatch");
  
            // if (new Date(result.data.expirationTime as string) < new Date())
            //   throw new Error("Signature Already expired");
            console.log("Returning");
            return {
              id: siwe.address,
            };
          }} catch (error) {
            console.log("next-auth: ", error);
            return null;
          }
        },
      }),
    ],
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
  
    debug: process.env.NODE_ENV === "development",
  
    secret: process.env.NEXTAUTH_SECRET,
  
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        console.log("SESSION", session, token);
        session.user.address = token.sub;
        session.user.token = token;
        return session;
      },
    },
    pages: {
      signIn: "/auth",
    },
  };
export function getSession() {
    return getServerSession(authOptions) as Promise<{
        user: {
          id: string;
          name: string;
          username: string;
          email: string;
          image: string;
        };
      } | null>;
    }