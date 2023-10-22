import {
  decode as _fromBase64Url,
  encode as _toBase64Url,
} from "@cfworker/base64url";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export { decode as cborDecode } from "cbor-x/decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const placeholderBlurhash =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

  
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


export function generateColorFromAddress(address: string) {
  // Take a slice of the wallet address to use as the color seed
  const colorSeed = address.slice(2, 8);

  // Convert the color seed to a valid hexadecimal color code
  const color = `#${colorSeed}`;

  return color;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
export const encode = encoder.encode.bind(encoder);
export const decode = decoder.decode.bind(decoder);

export const byteStringToBuffer = (byteString: string) =>
  Uint8Array.from(byteString, (e) => e.charCodeAt(0)).buffer;

export const bufferToByteString = (buffer: ArrayBuffer) =>
  String.fromCharCode(...new Uint8Array(buffer));

export const toBase64Url = _toBase64Url;
export const fromBase64Url = _fromBase64Url;
export const marshal = (data: object) => toBase64Url(JSON.stringify(data));
export const unmarshal = (data: string) => JSON.parse(fromBase64Url(data));

export const safeDecode = (data: string): Uint8Array =>
  encode(fromBase64Url(data));
export const safeEncode = (data: ArrayBuffer): string =>
  toBase64Url(decode(data));
export const safeByteDecode = (data: string): ArrayBufferLike =>
  byteStringToBuffer(fromBase64Url(data));
export const safeByteEncode = (data: ArrayBuffer): string =>
  toBase64Url(bufferToByteString(data));

export function concatBuffer(...buffers: ArrayBuffer[]) {
  const length = buffers.reduce((acc, b) => acc + b.byteLength, 0);
  const tmp = new Uint8Array(length);

  let prev = 0;
  for (let buffer of buffers) {
    tmp.set(new Uint8Array(buffer), prev);
    prev += buffer.byteLength;
  }

  return tmp.buffer;
}

export function isBiggerBuffer(a: ArrayBuffer, b: ArrayBuffer) {
  const dvA = new DataView(a);
  const dvB = new DataView(b);

  if (dvA.byteLength > dvB.byteLength) {
    return true;
  }

  for (let i = 0; i < dvA.byteLength; i++) {
    if (dvA.getUint8(i) > dvB.getUint8(i)) {
      return true;
    }
  }

  return false;
}

export function isEqualBuffer(a: ArrayBuffer, b: ArrayBuffer) {
  const dvA = new DataView(a);
  const dvB = new DataView(b);

  if (dvA.byteLength !== dvB.byteLength) {
    return false;
  }

  for (let i = 0; i < dvA.byteLength; i++) {
    if (dvA.getUint8(i) !== dvB.getUint8(i)) {
      return false;
    }
  }

  return true;
}

export const PasskeySignCounter = new Uint8Array([0, 0, 0, 0]).buffer;
export function isValidSignCounter(current: ArrayBuffer, next: ArrayBuffer) {
  if (
    isEqualBuffer(current, PasskeySignCounter) &&
    isEqualBuffer(next, PasskeySignCounter)
  ) {
    return true;
  }
  return isBiggerBuffer(next, current);
}

const UUID_V4_REGEX =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export function isUUIDv4(uuid: string) {
  return UUID_V4_REGEX.test(uuid);
}
