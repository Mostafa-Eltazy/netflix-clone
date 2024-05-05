import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import serverAuth from "../../lib/serverAuth";
import client from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await client.movie
        .findUnique({})
        .where({ id: movieId });
      if (!existingMovie) {
        throw new Error("invalid Id");
      }

      const user = await client.user.update({
        where: { email: currentUser.email || "" },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await client.movie.findUnique({
        where: { id: movieId },
      });
      if (!existingMovie) {
        throw new Error("invalid Id");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updatedUser = await client.user.update({
        where: { email: currentUser.email || "" },
        data: {
          push: { favoriteIds: updatedFavoriteIds },
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
