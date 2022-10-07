import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "POST") {
    const { username, password } = req.body;
    // console.log(username, password)
    // console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "set-Cookie",
        cookie.serialize("token", process.env.TOKEN as string, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json('successfull')
    }
    else{
      res.status(400).json('wrong credential!')
    }
  }
};

export default handler;
