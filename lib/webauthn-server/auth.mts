/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import dotenv from "dotenv";
import path from "path";
import url from "url";

// @ts-ignore The file will be copied with rollup and no problem.
import firebaseJson from "../firebase.json" assert { type: "json" };
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({ path: path.join(__dirname, "../.env") });

if (process.env.NODE_ENV === "localhost") {
  process.env.DOMAIN = "localhost:8080";
  process.env.FIRESTORE_EMULATOR_HOST = `${firebaseJson.emulators.firestore.host}:${firebaseJson.emulators.firestore.port}`;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = `${firebaseJson.emulators.auth.host}:${firebaseJson.emulators.auth.port}`;
}

import express from "express";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { UserInfo } from "../public/scripts/common";

initializeApp();

const auth = getAuth();
const router = express.Router();

router.post("/userInfo", async (req: Request, res: Response) => {
  if (req.session.user_id) {
    const user = {
      user_id: req.session.user_id,
      name: req.session.name,
      displayName: req.session.displayName,
      picture: req.session.picture,
    } as UserInfo;
    return res.json(user);
  } else {
    return res.status(401).send("Unauthorized");
  }
});

router.post("/verify", async (req: Request, res: Response) => {
  const { id_token } = req.body;

  try {
    const result = await auth.verifyIdToken(id_token as string, true);
    if (result) {
      console.log(result);
      req.session.user_id = result.user_id;
      req.session.name = result.email;
      req.session.displayName = result.name;
      req.session.picture = result.picture || `${res.locals.origin}/user.svg`;
      return res.json({
        user_id: req.session.user_id,
        name: req.session.name,
        displayName: req.session.displayName,
        picture: req.session.picture,
      } as UserInfo);
    } else {
      throw new Error("Verification failed.");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: false,
      message: "Verification failed.",
    });
  }
});

router.post("/signout", (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.json({
        status: true,
        message: "Successfully signed out.",
      });
    }
  });
});

export { router as auth };
