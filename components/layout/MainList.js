import styles from "../../styles/MainList.module.css";

const MainList = (props) => {
  return <main className={styles.main}>{props.children}</main>;
};

export default MainList;
