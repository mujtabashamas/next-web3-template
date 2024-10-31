// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SismoConnect, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import { AUTHS, CLAIMS, CONFIG, SIGNATURE_REQUEST } from "../../../sismo-connect-config";

const sismoConnect = SismoConnect({ config: CONFIG });

// this is the API route that is called by the SismoConnectButton
export default async function POST(req, res) {

  const sismoConnectResponse = JSON.parse(req.body);
  console.log(sismoConnectResponse)

  try {
    const result = await sismoConnect.verify(sismoConnectResponse, {
      auths: AUTHS,
      claims: CLAIMS,
      signature: SIGNATURE_REQUEST,
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(200).json(e.message);
  }
}