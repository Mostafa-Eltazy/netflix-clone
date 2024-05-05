import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }

  try {
    const moviesCount = await client.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);
    const randomMovies = await client.movie.findMany({
        take:1,
        skip: randomIndex,
    });
    res.status(200).json(randomMovies[0]);
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
}
