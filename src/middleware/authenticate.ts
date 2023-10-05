import { NextApiRequest, NextApiResponse } from "next/types";
import { getSession } from "next-auth/react";

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return session.user;
};

export default authenticate;
