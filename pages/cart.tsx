import React, { useState } from "react";
import styles from "../styles/Cart.module.scss";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Image from "next/image";
import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
// import { METHOD } from "../models/Order";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState<boolean>(false);
  const [cash, setCash] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const amount = cart.total;
  const currency = "USD";
  const style: { layout: "vertical" } = { layout: "vertical" };

  const createOrder = async (data: any) => {
    try {
      // console.log(data);
      const res = await axios.post("https://sdp-project.vercel.app/api/orders", data);
      // console.log(res.data._id);
      res.status === 201 && router.push("https://sdp-project.vercel.app/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper: React.FC<{
    currency: string;
    showSpinner: boolean;
  }> = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount.toString(),
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order!.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping?.name.full_name,
                address: shipping?.address.address_line_1,
                total: cart.total + 10,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>สินค้า</th>
              <th>ชื่อ</th>
              <th>Extras</th>
              <th>ราคา</th>
              <th>ปริมาณ</th>
              <th>รวม</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => {
              return (
                <tr className={styles.tr} key={product._id}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={product.img}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras.map((ex) => (
                        <span key={ex._id}>{ex.text} </span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>{product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      {product.price * product.quantity}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>รายการสั่งซื้อ</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ราคาสั่งซื้อ:</b>
            {cart.total.toFixed(2)} บาท
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ลดราคา:</b>0.00 บาท
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ค่าส่ง:</b>10.00 บาท
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ยอดสุทธิ:</b>
            {(cart.total + 10).toFixed(2)} บาท
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                id="oncash"
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                ชำระเงินปลายทาง
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              id="buy"
              onClick={() => setOpen(true)}
              className={styles.button}
            >
              สั่งซื้อ
            </button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetail
          setCash={setCash}
          total={cart.total + 10}
          createOrder={createOrder}
        />
      )}
    </div>
  );
};

export default Cart;
