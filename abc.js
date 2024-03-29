import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

import { webcrypto } from 'node:crypto';
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

async function main() {
  // Decode the base64 encoded string
  const string  = "YOUR_VALIDATOR_PRIVKEY_STRING_IN_BASE64";
  const decoded = Uint8Array.from(atob(string), c => c.charCodeAt(0));
  console.log('decoded', decoded, decoded.length);

  const publicKey = ed.getPublicKey(decoded.slice(0, 32));
  console.log('public key', publicKey);

  const encodedAgain = Buffer.from(publicKey).toString('base64');
  console.log('encoded pubkey of validator again:', encodedAgain);
}

main();