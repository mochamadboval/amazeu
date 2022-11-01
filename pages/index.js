import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Fragment, useState } from "react";
import Landmarks from "../components/Landmarks";

import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MainList from "../components/layout/MainList";

import styles from "../styles/Home.module.css";

const Home = (props) => {
  const [data, setData] = useState(null);

  let landmarks = props.landmarks;

  if (data !== null) {
    landmarks = data;
  }

  const prevPage = landmarks.prev_page;
  const nextPage = landmarks.next_page;
  const totalPages = landmarks.total_results / 20;

  const paginationHandler = async (page) => {
    const encodePage = encodeURIComponent(page);
    const response = await fetch(`/api/pexels?url=${encodePage}`);
    const data = await response.json();

    setData(data);
  };

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

      <Container>
        <Header>Explore all famous landmarks around the world.</Header>
        <MainList>
          <Landmarks landmarks={landmarks.photos} />
          <div className={styles.pagination}>
            <button
              className={styles.prev}
              onClick={() => paginationHandler(prevPage)}
              disabled={!prevPage}
            >
              Prev
            </button>
            <p>
              Page {landmarks.page} of{" "}
              {Number.isInteger(totalPages)
                ? totalPages
                : (totalPages + 1).toFixed()}
            </p>
            <button
              className={styles.next}
              onClick={() => paginationHandler(nextPage)}
              disabled={!nextPage}
            >
              Next
            </button>
          </div>
        </MainList>
        <Footer />
      </Container>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://api.pexels.com/v1/search?per_page=20&query=landmark",
    {
      headers: {
        Authorization: process.env.API_KEY,
      },
    }
  );
  const data = await response.json();

  return {
    props: {
      landmarks: data,
    },
    revalidate: 3600,
  };
};

export default Home;
