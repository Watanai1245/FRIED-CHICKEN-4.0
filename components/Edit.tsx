import React, { FC, useState } from "react";
import styles from "../styles/Edit.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import PRODUCT from "../util/Chick";
import axios from "axios";

const Edit: FC<{
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  product: PRODUCT;
}> = ({ setOpenEdit, product }) => {
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState<string>(product.title);
  const [desc, setDesc] = useState<string>(product.desc);

  // const [prices, setPrices] = useState<number[]>(product.prices);

  const [price0, setPrices0] = useState<number>(product.prices[0]);
  const [price1, setPrices1] = useState<number>(product.prices[1]);
  const [price2, setPrices2] = useState<number>(product.prices[2]);

  const [options, setOptions] = useState<
    {
      _id: number;
      text: string;
      price: number;
    }[]
  >(product.extraOptions);

  const [extraOptions, setExtraOptions] = useState<{ text?: string }[]>([]);
  const [extra, setExtra] = useState<{}>({});

  // console.log(product);
  // console.log(title);

  // const changePrice = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const currenPrices: number[] = prices;
  //   currenPrices[i] = +e.target.value;
  //   setPrices(currenPrices);
  // };
  // console.log(extraOptions);
  // console.log(options[0]);

  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({ ...extra, [e.target.name]: e.target.value });
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const updateHandler = async () => {
    const prices = [price0, price1, price2];
    // console.log(prices);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/helloworldeiei/image/upload",
        data
      );
      // console.log(uploadRes.data);
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
        _id: product._id,
      };
      // console.log(newProduct);
      await axios.put("https://sdp-project.vercel.app/api/products", newProduct);
      setOpenEdit(false)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(price0, price1, price2);
  // console.log(product.extraOptions);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <AiFillCloseCircle
          cursor={"pointer"}
          size={"32px"}
          className={styles.closeBtn}
          onClick={() => setOpenEdit(false)}
        />
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Edit Product</h1>
          <div className={styles.item}>
            <label htmlFor="" className={styles.label}>
              Choose an image
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files![0])}
              className={styles.input}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="" className={styles.label}>
              Desc
            </label>
            <textarea
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="" className={styles.label}>
              Prices
            </label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Small"
                // onChange={(e) => changePrice(e, 0)}
                onChange={(e) => setPrices0(+e.target.value)}
                value={price0}
                // value={prices[0]}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Medium"
                // onChange={(e) => changePrice(e, 1)}
                value={price1}
                onChange={(e) => setPrices1(+e.target.value)}
                // value={prices[1]}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Large"
                // onChange={(e) => changePrice(e, 2)}
                value={price2}
                onChange={(e) => setPrices2(+e.target.value)}
                // value={prices[2]}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.wrap}>
              <label htmlFor="" className={styles.label}>
                Extra    <b className={styles.b}>Please Re-enter all ingredients !!!</b>
              </label>
              {options.map((op) => {
                return (
                  <div className={styles.extra}>
                    <input
                      type="text"
                      value={op.text}
                      className={styles.text}
                      // onChange={e => setOptions({...options})}
                    />
                    <input
                      type="number"
                      value={op.price}
                      className={styles.price}
                    />
                    <button
                      onClick={() =>
                        setOptions(options.filter((opt) => opt._id !== op._id))
                      }
                      className={styles.del}
                    >
                      Del
                    </button>
                  </div>
                );
              })}
              <div className={styles.extra}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="text"
                  placeholder="Item"
                  name="text"
                  onChange={handleExtraInput}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleExtraInput}
                />
                <button className={styles.extraButton} onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className={styles.extraItems}>
                {extraOptions.map((option) => (
                  <span key={option.text} className={styles.extraItem}>
                    {option.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className={styles.addButton} onClick={updateHandler}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Edit;
