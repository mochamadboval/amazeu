import styles from "../../styles/Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>Amaze U</h1>
      <p>{props.children}</p>
    </header>
  );
};

export default Header;
