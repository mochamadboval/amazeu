import Head from "next/head";
import Link from "next/link";

import { Fragment } from "react";
import Landmarks from "../../../components/Landmarks";

import Container from "../../../components/layout/Container";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import MainList from "../../../components/layout/MainList";

import styles from "../../../styles/Home.module.css";

const Page = (props) => {
  let landmarks = props.landmarks;

  let prevPage = String(landmarks.page - 1);
  if (prevPage === "1") {
    prevPage = "/";
  }

  let isEnd = false;
  let nextPage = String(landmarks.page + 1);
  if (landmarks.next_page === undefined) {
    isEnd = true;
    nextPage = "/";
  }

  const totalPages = landmarks.total_results / 20;

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
            <Link className={styles.prev} href={prevPage}>
              Prev
            </Link>
            <p>
              Page {landmarks.page} of{" "}
              {Number.isInteger(totalPages)
                ? totalPages
                : (totalPages + 1).toFixed()}
            </p>
            <Link
              className={`${styles.next} ${isEnd ? styles.disabled : ""}`}
              href={nextPage}
            >
              Next
            </Link>
          </div>
        </MainList>
        <Footer />
      </Container>
    </Fragment>
  );
};

export const getStaticPaths = () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId;
  const response = await fetch(
    `https://api.pexels.com/v1/search?page=${pageId}&per_page=20&query=landmark`,
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

export default Page;
