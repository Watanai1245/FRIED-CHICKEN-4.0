import style from "../styles/ChickList.module.scss";
import React from "react";
import ChickCard from "./ChickCard";
import CHICK from "../util/Chick";

const ChickList: React.FC<{ chickList: Array<CHICK> }> = ({ chickList }) => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {chickList
          .filter(
            (chicken) =>
              chicken._id.toString() === "625fb3016ed0c53f90506d03" ||
              chicken._id.toString() === "625fb3c16ed0c53f90506d6e" ||
              chicken._id.toString() === "625fb4476ed0c53f90506da9"
          )
          .map((chick) => {
            return <ChickCard key={chick._id} chick={chick} />;
          })}
      </div>
    </div>
  );
};

export default ChickList;
