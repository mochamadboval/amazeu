import styles from "../../styles/Container.module.css";

const Container = (props) => {
  return <main className={styles.container}>{props.children}</main>;
};

export default Container;
