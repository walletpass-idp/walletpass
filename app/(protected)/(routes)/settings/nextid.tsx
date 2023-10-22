

export async function signPayload(identity, public_key, signer) {
  const res = await fetch("https://proof-service.next.id/v1/proof/payload", {
    method: "POST",
    body: JSON.stringify({
      action: "create",
      platform: "twitter",
      identity,
      public_key,
    }),
  }).then(v => v.json())
  const sig = await signer.signMessage(res.sign_payload)
  const base64 = Buffer.from(sig.slice(2), "hex").toString("base64")
  const tweet = res.post_content.default
    .split("\n")
    .map(v => v.replace("%SIG_BASE64%", base64))
    .join("\n")
  return {
    signature: base64,
    uuid: res.uuid,
    created_at: res.created_at,
    tweet,
  }
}

export async function verifyProof(statusID, nextID) {
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
    }).then(v => v.json())
    return isEmpty(verify)
  } catch (e) {}
  return false
}

export const postProof = async (domain: string) => {
    return await fetch(
      `https://proof-service.next.id/v1/proof`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "create",
            uuid: "options.uuid",
            created_at: "options.created_at",
            platform: "this.platform",
            identity: "this.identity",
            public_key:" this.publicKey",
            proof_location: "options.proof_location",
            extra: "options.extra",
        }),
      },
    ).then((res) => res.json());
  };
  
export const getProof = async (twitter_handle: string) => {
    return await fetch(
      `https://proof-service.next.id/v1/proof?platform=twitter&identity=

      ${
        twitter_handle
      }`,
      {
        method: "GET",
        headers: {
        },
      },
    ).then((res) => res.json());
  };
  