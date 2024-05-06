import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import client from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        data: { movieId, usermail },
      } = req.body;
      const existingMovie = await client.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        throw new Error("invalid Id");
      }

      const user = await client.user.update({
        where: { email: usermail || "" },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "PUT") {
      console.log("PUT", req.body.data);
      const {
        data: { movieId, usermail, currentFavorites },
      } = req.body;

      const existingMovie = await client.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        throw new Error("invalid Id");
      }
      console.log("currentFavorites", currentFavorites);
      const updatedFavoriteIds = without(currentFavorites, movieId);
      console.log("updatedFavoriteIds", updatedFavoriteIds);
      const updatedUser = await client.user.update({
        where: { email: usermail || "" },
        data: {
          favoriteIds: {
            set: currentFavorites.filter((id: any) => id !== movieId),
          },
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
