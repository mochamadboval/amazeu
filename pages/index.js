import Link from "next/link";

import { Fragment } from "react";

import Landmarks from "../components/Landmarks";
import SEO from "../components/SEO";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MainList from "../components/layout/MainList";

import styles from "../styles/Home.module.css";

const Home = (props) => {
  let landmarks = props.landmarks;
  const totalPages = landmarks.total_results / 20;

  return (
    <Fragment>
      <SEO
        title="Amaze U"
        description="Explore all famous landmarks around the world."
        page="https://amazeu.vercel.app/"
        image="https://amazeu.vercel.app/amazeu.png"
      />

      <Container>
        <Header>Explore all famous landmarks around the world.</Header>
        <MainList>
          <Landmarks landmarks={landmarks.photos} />
          <div className={styles.pagination}>
            <Link className={`${styles.prev} ${styles.disabled}`} href="/">
              Prev
            </Link>
            <p>
              Page {landmarks.page} of{" "}
              {Number.isInteger(totalPages)
                ? totalPages
                : (totalPages + 1).toFixed()}
            </p>
            <Link className={styles.next} href="/page/2">
              Next
            </Link>
          </div>
        </MainList>
        <Footer />
      </Container>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://api.pexels.com/v1/search?page=1&per_page=20&query=landmark",
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
