import Link from "next/link";

import { Fragment } from "react";

import Landmarks from "../../../components/Landmarks";
import SEO from "../../../components/SEO";
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
  if (landmarks.next_page === null) {
    isEnd = true;
    nextPage = "/";
  }

  const totalPages = landmarks.total_results / 20;

  return (
    <Fragment>
      <SEO
        title={`Amaze U - Page ${landmarks.page}`}
        description="Explore all famous landmarks around the world."
        page={`https://amazeu.vercel.app/page/${landmarks.page}`}
        image="https://amazeu.vercel.app/amazeu.png"
      />

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

  if (data.photos.length === 0) {
    return {
      notFound: true,
    };
  }

  let next_page = data.next_page;
  if (next_page === undefined) {
    next_page = null;
  }

  return {
    props: {
      landmarks: {
        page: data.page,
        next_page: next_page,
        total_results: data.total_results,
        photos: data.photos.map((photo) => ({
          id: photo.id,
          alt: photo.alt,
          height: photo.height,
          width: photo.width,
          src: {
            landscape: photo.src.landscape,
          },
        })),
      },
    },
    revalidate: 3600,
  };
};

export default Page;
