import dbConnect from "../../../util/dbConnet";
import Order from "../../../models/Order";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await dbConnect();
  const { method } = req;
  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "POST") {
    try {
      // console.log(req.body)
      const order = await Order.create(req.body);
      // console.log(order)
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "DELETE") {
  }
};

export default handler;
