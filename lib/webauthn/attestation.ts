import { COSEAlgorithm } from "@/lib/crypto";
import { encode } from "@/lib/utils";

type ChallengeResponseShared = {
  challenge: string;
};

export async function attestation(
  abortController: AbortController,
  username: string
) {
  const userId = crypto.randomUUID();
  const test: ChallengeResponseShared = { challenge: "0x000099" };
  const publicKey: PublicKeyCredentialCreationOptions = {
    challenge: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
    rp: {
      id: window.location.host,
      name: document.title,
    },
    user: {
      id: encode(userId),
      name: username,
      displayName: "",
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: COSEAlgorithm.ES512,
      },
      {
        type: "public-key",
        alg: COSEAlgorithm.ES384,
      },
      {
        type: "public-key",
        alg: COSEAlgorithm.ES256,
      },
    ],
    authenticatorSelection: {
      userVerification: "preferred",
      residentKey: "required",
    },
    attestation: "indirect",
    timeout: 60_000,
  };

  const credential = (await window.navigator.credentials.create({
    publicKey,
    signal: abortController.signal,
  })) as PublicKeyCredential;
  return await api.Attestation.store(credential);
}
