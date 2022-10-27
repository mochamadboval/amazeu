import Head from "next/head";

import { Fragment } from "react";

import styles from "../styles/Likes.module.css";

const Likes = () => {
  return (
    <Fragment>
      <Head>
        <title>Your likes | Amaze U</title>
        <meta name="description" content="All the landmarks you like." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Likes</p>
      </main>
    </Fragment>
  );
};

export default Likes;
