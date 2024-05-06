import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import client from "./prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("Not signed in 1");
  }

  const currentUser = await client.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed In 2");
  }

  return { currentUser };
};

export default serverAuth;
