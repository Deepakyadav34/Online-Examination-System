import React from "react";
import styles from "./Card.module.css";

const Card = ({ role, onClick }) => {
  return (
    <div className={`${styles.card} ${styles[role.toLowerCase()]}`} onClick={onClick}>
      <h2>{role}</h2>
    </div>
  );
};

export default Card;
