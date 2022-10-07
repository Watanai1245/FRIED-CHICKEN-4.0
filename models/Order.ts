import { Schema, model, models } from "mongoose";

// export enum METHOD {
//   PAYPAL,
//   CASH,
// }

export interface ORDER {
  customer: string;
  address: string;
  total: number;
  status: number;
  method: number;
  phone: String;
}

const OrderSchema = new Schema<ORDER>(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    phone:{
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
