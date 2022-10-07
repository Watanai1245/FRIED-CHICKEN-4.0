import Image from "next/image";
import React from "react";
import style from "../styles/ChickCard.module.scss";
import CHICK from "../util/Chick";
import Link from "next/link";

const ChickCard: React.FC<{ chick: CHICK }> = ({ chick }) => {
  return (
    <div className={style.container}>
      <Link href={`/product/${chick._id}`} passHref>
        <Image
          src={chick.img}
          alt=""
          width={"500"}
          height={"500"}
          objectFit="fill"
          className={style.order_menu}
        />
      </Link>
      <h1 className={style.title}>{chick.title}</h1>
      <span className={style.price}>฿{chick.prices[0]}</span>
      <p className={style.desc}>{chick.desc}</p>
    </div>
  );
};

export default ChickCard;
