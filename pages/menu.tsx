import style from "../styles/Menu.module.scss";
import React, { useState } from "react";
import ChickCard from "../components/ChickCard";
import CHICK from '../util/Chick'
import axios from "axios";
import { GetServerSideProps } from "next";
import AddButton from "../components/AddButton";
import Add from "../components/Add";
import Head from "next/head";

const Index: React.FC<{ chickList: Array<CHICK>; admin: boolean }> = ({ chickList, admin }) => {
  const [close, setClose] = useState<boolean>(true);
  // console.log(chickList)
  return (
    <div className={style.container}>
      <Head>
        <title>Menu</title>
      </Head>
      {/* <ChickList chickList={props.chickList} /> */}
      {admin && <AddButton setClose={setClose} />}
      <div className={style.wrapper}>
        {chickList.map((chick) => {
          // console.log(chick)
          return <ChickCard key={chick._id} chick={chick} />;
        })}
      </div>
      {!close && <Add setClose={setClose} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myCookie = context.req.cookies || "";
  let admin: boolean = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("https://sdp-project.vercel.app/api/products");
  // console.log(res.data);
  return {
    props: {
      chickList: res.data,
      admin,
    },
  };
};

export default Index;
