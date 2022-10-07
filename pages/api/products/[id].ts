import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnet";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  // connect to mongodb
  await dbConnect();
  const {
    method,
    query: { id },
    cookies,
  } = req;
  // console.log(id + 'yeah we got it')
  const token = cookies.token;

  if (method == "GET") {
    try {
      const product = await Product.findById(id);
      // console.log(product)
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method == "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      //   console.log(req.body);
      //   const newProduct = new Product(req.body);
      //   const product = await newProduct.save(newProduct);

      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json("there is some error occurs!\n" + err);
    }
  } else if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("product has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
