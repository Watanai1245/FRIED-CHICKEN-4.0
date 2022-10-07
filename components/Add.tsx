import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/Add.module.scss";

const Add: React.FC<{ setClose: Dispatch<SetStateAction<boolean>> }> = ({
  setClose,
}) => {
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [prices, setPrices] = useState<string[]>([]);
  const [extraOptions, setExtraOptions] = useState<{ text?: string }[]>([]);
  const [extra, setExtra] = useState<{}>({});

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const currenPrices: string[] = prices;
    currenPrices[i] = e.target.value;
    setPrices(currenPrices);
  };
  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({ ...extra, [e.target.name]: e.target.value });
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const handleCreate = async () => {
    // console.log(file);
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
      };
      await axios.post("https://sdp-project.vercel.app/api/products", newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add a new Chicken</h1>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            Choose an image
          </label>
          <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            Desc
          </label>
          <textarea rows={4} onChange={(e) => setDesc(e.target.value)} />
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
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            Extra
          </label>
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
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
