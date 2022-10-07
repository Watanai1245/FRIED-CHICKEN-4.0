import React, { useState } from "react";
import style from "../styles/Featured.module.scss";
import Image from "next/image";

enum CHOICE {
  LEFT,
  RIGHT,
}

const Featured = () => {
  const [index, setIndex] = useState<number>(0);
  const images: Array<string> = ["/img/F5.png", "/img/F6.png", "/img/F7.png"];

  const handleArrow = (c: CHOICE) => {
    if (c === CHOICE.LEFT) {
      setIndex(index !== 0 ? index - 1 : 2);
    } else if (c === CHOICE.RIGHT) {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={style.container}>
      <div
        className={style.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow(CHOICE.LEFT)}
      >
        <Image
          src={"/img/arrowl.png"}
          width="100vw"
          height="100vh"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div
        className={style.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, idx) => (
          <div className={style.imgContainer} key={idx}>
            <Image src={img} layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        className={style.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow(CHOICE.RIGHT)}
      >
        <Image src={"/img/arrowr.png"} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};

export default Featured;
