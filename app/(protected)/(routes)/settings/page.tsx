"use client";

import { MobileArrow, Twitter } from "@ledgerhq/icons-ui/react";
import { Button, Card, Metric,Text, TextInput } from "@tremor/react";
import { Callout } from "@tremor/react";
import {ecsign,keccakFromString, toRpcSig } from 'ethereumjs-util';
import { utils } from "ethers";
import {isEmpty} from "lodash";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import React from "react";
import { useAccount, useSignMessage } from "wagmi";

import LoadingSpinner from "@/components/loading-spinner";
import { getRegistrations } from "@/lib/webauthn/state";

export default function SettingsPage() {
  const [message, setMessage] = React.useState(
    `WalletPass Link Twitter via Mask Next.ID ${Date.now}`
  );

  const { data: session, status } = useSession();
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessageAsync } =
    useSignMessage({
      message,
      onError(error) {
        console.log("useSignMessage Error:", error);
      },
    });

  const [statusID, setStatusID] = useState("");
  const [nextID, setNextID] = useState(null);
  const [avatar, setAvatar] = useState(""
  );

  const [handle, setHandle] = useState("");
  const [twitterID, setTwitterID] = useState("");

  const handleTwitterID = (event) => {
    setTwitterID(event.target.value);

    console.log("value is:", event.target.value);
  };
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
                                        <Image
                                src="/nextid-logo.svg"
                                alt="WalletPass Link Universal"
                                width={40}
                                height={32}
                              />
          <Text>Link Twitter for Social Recovery</Text>
          <TextInput
            placeholder="Twitter Handle"
            onChange={(e) => setHandle(e.target.value)}
            value={handle}
          />
          <Button
            icon={Twitter}
            size="md"
            onClick={async () => {
              const identity = handle.toLowerCase();
              //const public_key = await getRegistrations()[0].response?.getPublicKey!;

              console.log("fetched pub: ", address);
              console.log("fetched reg: ", getRegistrations()[0]);
              const addr = address;
              const digest = utils.arrayify(utils.hashMessage(message));

              const public_key0x = utils.recoverPublicKey(
                digest,
                await signMessageAsync()
              );
              const public_key = public_key0x.slice(2);
              console.log("SENDING CHOPPED PUB: ", public_key);
              //const public_key = 'd47da50102032620012158202a0e847f93229dfee41fbc8b0051b86b443abbb4e915c80f2e38b65782da11af2258200f486e9099ec2dbaf1b32491d27cac52e3636570f4842489dfb8bef99551';
              //const public_key = '03bce884894fdc4fb45475733be317dd3c289f003bceebb097ac79a6b95e6edc56';
              const res = await fetch(
                "https://proof-service.next.id/v1/proof/payload",
                {
                  method: "POST",
                  body: JSON.stringify({
                    action: "create",
                    platform: "twitter",
                    identity,
                    public_key,
                  }),
                }
              ).then((v) => v.json());
              const transformmessage = Buffer.from(res.sign_payload);
              const secretKey = Buffer.from('d2fe40aff9e8b028ce9681a63b6d69408af33c1a02c708daea339a664e30ff99', 'hex');
              const signatureBuffer = await personalSign(transformmessage, secretKey);
              console.log("ORIG POST: ", res.post_content.default);
              console.log("BASE64: ", signatureBuffer.toString('base64'));
              const signature = `0x${signatureBuffer.toString('hex')}`;
              const tweet = res.post_content.default
              .replace("%SIG_BASE64%", signatureBuffer.toString('base64'));
              console.log("tweet: ", tweet);
              const uuid = res.uuid;
              const created_at = res.created_at;
              setNextID({
                addr,
                identity,
                signature,
                uuid,
                public_key,
                created_at,
                tweet,
              });
            }}
          >
            Generate Message to Sign
          </Button>
          <TextInput
            placeholder="Status ID"
            onChange={(e) => setStatusID(e.target.value)}
            value={nextID?.tweet}
          ></TextInput>

          <TextInput
            defaultValue="Past in Twitter Status ID"
            id="twitterid"
            onChange={handleTwitterID}
            value={twitterID}
          ></TextInput>
          <Button
            icon={Twitter}
            size="md"
            onClick={async () => {
              try {
                const resp = await verifyProof(twitterID, nextID);
                console.log("VERIFY: ", resp);

                if(isEmpty(resp)){
const avatar = await fetch(
  `https://proof-service.next.id/v1/proof?platform=twitter&identity=${nextID?.identity}`,
  {
    method: "GET",
    headers: {
    },
  },
).then((res) => res.json());
console.log("AVATAR: ", avatar);
console.log("AVATAR: ", avatar.ids[0].avatar);
setAvatar(avatar.ids[0].avatar);
                }
              
                /*   if (await verifyProof(statusID, nextID)) {
                          const signer = await new BrowserProvider(
                            window.ethereum
                          ).getSigner()
                          const { new_user, user_with_cred } =
                            await createTempAddress(nextID.identity, signer, sdk)
                          if (isNil(new_user)) {
                            alert("something went wrong!")
                          } else {
                            await lf.setItem("user", user_with_cred)
                            setUserMap(assoc(nextID.identity, new_user, userMap))
                            setUser(user_with_cred)
                            setLogging(false)
                            setIsModal(false)
                            setNextID(null)
                          }
                        } */
              } catch (e) {
                console.log("settings: ", e);
              }
            }}
          >
            Go
          </Button>
          {isLoading || isError ? (
            <>
              {" "}
              <Callout
                className="h-12 mt-4"
                title="Getting Wallet..."
                icon={MobileArrow}
                color="green"
              >
                <LoadingSpinner />
                Error: {isError}
              </Callout>
            </>
          ) : (
            <></>
          )}
        </Card>
        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
    <Text>Next.ID Universal Profile</Text>
    <Metric>{avatar}</Metric>
  </Card>

      </div>
    </div>
  );
}

async function verifyProof(statusID, nextID) {
  try {
    const verify = await fetch("https://proof-service.next.id/v1/proof", {
      method: "POST",
      body: JSON.stringify({
        action: "create",
        platform: "twitter",
        identity: nextID.identity,
        public_key: nextID.public_key,
        proof_location: statusID,
        extra: { signature: nextID.signature },
        uuid: nextID.uuid,
        created_at: nextID.created_at,
      }),
    }).then((v) => v.json());
    return verify;
  } catch (e) {
    console.log("verify error: ", e);
  }
  return false;
}


async function personalSign(message: Buffer, privateKey: Buffer): Promise<Buffer> {
  const messageHash = keccakFromString(`\x19Ethereum Signed Message:\n${message.length}${message}`, 256)
  const signature = ecsign(messageHash, privateKey)
  return Buffer.from(toRpcSig(signature.v, signature.r, signature.s).slice(2), 'hex')
}
