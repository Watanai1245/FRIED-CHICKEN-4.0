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
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "PUT") {
    const order = await Order.findByIdAndUpdate(id, req.body,{
      new: true
    })
    res.status(200).json(order)
  } else if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json("product has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;