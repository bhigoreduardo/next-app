import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const { movieId } = req.query;

    if (!movieId) {
      throw new Error("Missing ID");
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId as string },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    if (req.method === "POST") {
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const updatedFavoriteIds = without(
        currentUser.favoriteIds,
        movieId as string
      );

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
