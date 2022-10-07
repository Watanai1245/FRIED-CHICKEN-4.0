import styles from "../styles/AddButton.module.scss";
import React, { Dispatch, SetStateAction } from "react";

const AddButton: React.FC<{
  setClose: Dispatch<SetStateAction<boolean>>;
}> = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Chicken
    </div>
  );
};

export default AddButton;
