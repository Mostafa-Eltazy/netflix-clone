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
    const { currentUser } = await serverAuth(req);
    const favoriteMovies = await client.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });
    res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
  }
}
