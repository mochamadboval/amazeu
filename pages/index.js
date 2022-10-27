import Head from "next/head";

import { Fragment } from "react";

import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Amaze U</title>
        <meta
          name="description"
          content="Explore all famous landmarks around the world."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Home</p>
      </main>
    </Fragment>
  );
};

export default Home;
