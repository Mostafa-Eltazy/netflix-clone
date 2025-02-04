import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../lib/serverAuth";
import client from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req);
    const movies = await client.movie.findMany();
    return res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
