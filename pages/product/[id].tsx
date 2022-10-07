import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import React, { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import style from "../../styles/Product.module.scss";
import { ParsedUrlQuery } from "querystring";
import CHICK from "../../util/Chick";
import { useAppDispatch } from "../../redux/hook";
import { addProduct, reset } from "../../redux/cartSlice";

export interface extraOptions {
  _id: number;
  text: string;
  price: number;
}

const ID: React.FC<{ chick: CHICK }> = ({ chick }) => {
  // console.log(chick);
  const [size, setSize] = useState<number>(0);
  const [price, setPrice] = useState<number>(chick.prices[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [extras, setExtras] = useState<extraOptions[]>([]);
  const dispatch = useAppDispatch();

  const changePrice = (num: number) => {
    setPrice(price + num);
  };

  const handleSize = (idx: number) => {
    const diff = chick.prices[idx] - chick.prices[size];
    setSize(idx);
    changePrice(diff);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: extraOptions
  ) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((ex) => ex._id !== option._id));
    }
  };

  const handleClick = () => {
    // console.log({...chick,extras,price,quantity});
    dispatch(addProduct({ ...chick, extras, price, quantity }));
  };

  return (
    <div className={style.container}>
      <Head>
        <title>Product</title>
      </Head>
      <div className={style.left}>
        <div className={style.imgContainer}>
          <Image src={chick.img} layout="fill" objectFit="contain" className={style.img} />
        </div>
      </div>
      <div className={style.right}>
        <h1 className={style.titlt}>{chick.title}</h1>
        <span className={style.price}>{price} บาท</span>
        <p className={style.desc}>{chick.desc}</p>
        <h3 className={style.choose}>Choose your size</h3>
        <div className={style.sizes}>
          <div className={style.size} onClick={() => handleSize(0)}>
            <Image src={"/img/chicken.png"} layout="fill" />
            <span className={style.number}>Small</span>
          </div>
          <div className={style.size} onClick={() => handleSize(1)}>
            <Image src={"/img/chicken.png"} layout="fill" />
            <span className={style.number}>Medium</span>
          </div>
          <div className={style.size} onClick={() => handleSize(2)}>
            <Image src={"/img/chicken.png"} layout="fill" />
            <span className={style.number}>Large</span>
          </div>
        </div>
        <h3 className={style.choose}>Choose additional ingredients</h3>
        <div className={style.ingredients}>
          {chick.extraOptions.map((option) => {
            return (
              <div className={style.option} key={option._id}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  onChange={(e) => handleChange(e, option)}
                  className={style.checkbox}
                />
                <label htmlFor="double">{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={style.add}>
          <input
            onChange={(e) => setQuantity(+e.target.value)}
            type="number"
            defaultValue={1}
            className={style.quantity}
          />
          <button className={style.button} id='add-to-cart' onClick={handleClick}>
            เพิ่มใส่ตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
};

interface IdParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IdParams;
  // console.log(id);

  const res = await axios.get(`https://sdp-project.vercel.app/api/products/${id}`);
  return {
    props: {
      chick: res.data,
    },
  };
};

export default ID;
