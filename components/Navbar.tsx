import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "../redux/hook";
import style from "../styles/Navbar.module.scss";

const Navbar = () => {
  const quantity = useAppSelector((state) => state.cart.quntiity);
  return (
    <div className={style.container}>
      <div className={style.item}>
        <ul className={style.list}>
          <Image src={"/img/FC-logo.png"} alt="" width={"150"} height={"150"} />
          <Link href={'/'}>
            <li className={style.listItem}>หน้าหลัก</li>
          </Link>
          <Link href={'/menu'}>
            <li className={style.listItem}>ไก่ทอด</li>
          </Link>
          <Link href={'/aboutus'}>
            <li className={style.listItem}>ติดต่อพวกเรา</li>
          </Link>
        </ul>
      </div>
      <Link href={"/cart"}>
        <div className={style.item}>
          <div className={style.cart}>
            <Image src={"/img/cart.png"} alt="" width={"30"} height={"30"} />
            <div className={style.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
