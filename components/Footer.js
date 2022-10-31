import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <b>Amaze U</b> &copy; 2022.
      </p>
      <p>
        Photos provided by <a href="https://www.pexels.com">Pexels</a>.
      </p>
    </footer>
  );
};

export default Footer;
