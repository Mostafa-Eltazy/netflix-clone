import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);
    const { id } = req.query;
    const movie = await client.movie.findUnique({ where: { id: id } });
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).end();
  }
}
