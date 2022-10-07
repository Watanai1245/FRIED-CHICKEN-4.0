import React, { FormEvent } from "react";
import styles from "../styles/OrderDetail.module.scss";
import useInput from "../hook/use-input";

const OrderDetail: React.FC<{
  total: number;
  createOrder: Function;
  setCash: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ total, createOrder, setCash }) => {
  const name_regex = new RegExp("[a-zA-Zก-ํ]{3,}");
  const phone_regex = new RegExp("[0-9]{9,10}");
  const add_regex = new RegExp("[a-zA-Zก-ํ0-9]{3,}");

  const {
    value: enteredFirstname,
    hasError: firstnameHasError,
    isValid: enteredFirstnameIsValid,
    valueBlurHandler: firstnameBlurHandler,
    valueChangeHandler: firstnameChangeHandler,
  } = useInput(
    (value) =>
      name_regex.test(value.trim()) &&
      value.length <= 30 &&
      !/\d/.test(value.trim()) &&
      !/[๑-๛]/.test(value.trim()) &&
      !/[$&+,:;=?@#|'<>.\-^*()%!]/.test(value.trim()) &&
      !/[^a-zA-Zก-ํ]/.test(value.trim())
  );

  const {
    value: enterredLastname,
    hasError: lastnameHasError,
    isValid: enterredLastnameIsValid,
    valueBlurHandler: lastnameBlurHandler,
    valueChangeHandler: lastnameChangeHandler,
  } = useInput(
    (value) =>
      name_regex.test(value.trim()) &&
      value.length <= 30 &&
      !/\d/.test(value.trim()) &&
      !/[๑-๛]/.test(value.trim()) &&
      !/[$&+,:;=?@#|'<>.\-^*()%!]/.test(value.trim()) &&
      !/[^a-zA-Zก-ํ]/.test(value.trim())
  );

  const {
    value: enteredPhone,
    hasError: phoneHasError,
    isValid: enteredPhoneIsValid,
    valueBlurHandler: phoneBlurHandler,
    valueChangeHandler: phoneChangeHandler,
  } = useInput((value) => phone_regex.test(value.trim()) && value.length <= 10);

  const {
    value: enteredAddress,
    hasError: addressHasError,
    isValid: enteredAddressIsValid,
    valueBlurHandler: addressBlurHandler,
    valueChangeHandler: addressChangeHandler,
  } = useInput(
    (value) =>
      add_regex.test(value.trim()) &&
      value.length <= 200 &&
      !/[^a-zA-Zก-ํ0-9.,/ ]/.test(value.trim())
  );

  const firstnameInputClass = firstnameHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const lastnameInputClass = lastnameHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const phoneInputClass = phoneHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const addressInputClass = addressHasError
    ? `${styles.textarea} ${styles.invalid}`
    : styles.textarea;

  let formIsValid = false;
  if (
    enteredFirstnameIsValid &&
    enterredLastnameIsValid &&
    enteredPhoneIsValid &&
    enteredAddressIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const customer = enteredFirstname + " " + enterredLastname;
    console.log(customer, enteredPhone, enteredAddress);
    createOrder({
      customer,
      address: enteredAddress,
      total,
      phone: enteredPhone,
      method: 0,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.wrapper}>
        <button onClick={(e) => setCash(false)} className={styles.close}>
          x
        </button>
        <h1 className={styles.title}>ค่าส่ง 10 บาท</h1>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            ชื่อ
          </label>
          <input
            id="name"
            type="text"
            placeholder="John"
            className={firstnameInputClass}
            value={enteredFirstname}
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
          />
          {firstnameHasError && (
            <span className={styles.error}>
              ชื่อต้องเป็นภาษาอังกฤษหรือไทย และมีจำนวน 3 ถึง 20
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            นามสกุล
          </label>
          <input
            id="surname"
            type="text"
            placeholder="Doe"
            className={lastnameInputClass}
            value={enterredLastname}
            onBlur={lastnameBlurHandler}
            onChange={lastnameChangeHandler}
          />
          {lastnameHasError && (
            <span className={styles.error}>
              นามสกุลต้องเป็นภาษาอังกฤษหรือไทย และมีจำนวน 3 ถึง 20
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            เบอร์ติดต่อ
          </label>
          <input
            id="tel"
            type="text"
            placeholder="+66 123456789"
            className={phoneInputClass}
            value={enteredPhone}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          {phoneHasError && (
            <span className={styles.error}>
              ใส่เป็นตัวเลขอารบิกจำนวน 9 หรือ 10
            </span>
          )}
        </div>
        <div className={styles.item}>
          <label htmlFor="" className={styles.label}>
            ที่อยู่
          </label>
          <textarea
            id="addr"
            rows={5}
            placeholder="Lardkrabang St. 562 Bangkok"
            className={addressInputClass}
            value={enteredAddress}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {addressHasError && (
            <span className={styles.error}>
              ที่อยู่ต้องเป็นตัวเลขกับตัวอักษร ไม่เป็นตัวอักษรพิเศษ และมากกว่า 3
              และน้อยกว่า 200
            </span>
          )}
        </div>
        <button
          id="order"
          type="submit"
          disabled={!formIsValid}
          className={styles.button}
        >
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderDetail;
