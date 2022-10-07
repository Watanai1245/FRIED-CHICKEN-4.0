import React, { FC } from "react";
import styles from "../styles/Box.module.scss";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { CRED } from "../pages/aboutus";

const Box: FC<CRED> = ({
  img,
  name,
  id,
  github
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={img}
        width="250"
        height="300"
        layout="responsive"
        objectFit="cover"
        className={styles.image}
      />
      <div className={styles.wrapper}>
        <h3 className={styles.id}>{id}</h3>
        <p className={styles.name}>{name}</p>
        <Link href={github} passHref>
          <a target={"_blank"}>
            <BsGithub size={"32px"} className={styles.github} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Box;
