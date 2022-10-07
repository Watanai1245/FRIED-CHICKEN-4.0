import Head from "next/head";
import React from "react";
import Box from "../components/Box";
import styles from "../styles/Aboutus.module.scss";

export type CRED = {
  img: string;
  name: string;
  id: number;
  github: string;
};

const members: CRED[] = [
  {
    img: "/members/kim.png",
    name: "Abdulhakim Mamu",
    id: 63011414,
    github: "https://github.com/hakimparoo",
  },
  {
    img: "/members/king.png",
    name: "Abdulhakim Maha",
    id: 63011075,
    github: "https://github.com/Abdulhakim-Maha",
  },
  {
    img: "/members/newyear.png",
    name: "Watanai Maythamaluang ",
    id: 63010846,
    github: "https://github.com/Watanai1245",
  },
  {
    img: "/members/fome.png",
    name: "Phurich Chanprasit",
    id: 63010767,
    github: "https://github.com/Phurich63010767",
  },
  {
    img: "/members/pol.png",
    name: "Warapob Keatkongsang",
    id: 63010841,
    github: "https://github.com/Warapob",
  },
];

const Aboutus = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/img/chicken.png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {members.map((mb) => (
            <Box
              key={mb.id}
              id={mb.id}
              img={mb.img}
              name={mb.name}
              github={mb.github}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
