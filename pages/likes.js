import Head from "next/head";

import { Fragment, useEffect, useState } from "react";

import Landmarks from "../components/Landmarks";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MainList from "../components/layout/MainList";

const Likes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [landmarks, setLandmarks] = useState(null);

  useEffect(() => {
    let savedPhotos = JSON.parse(localStorage.getItem("amazeu"));
    if (savedPhotos === null) {
      savedPhotos = [];
    }

    setLandmarks(savedPhotos);
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Your likes | Amaze U</title>
        <meta name="description" content="All the landmarks you like." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header>All the landmarks you like.</Header>
        <MainList>
          {isLoading && <p>Loading ...</p>}
          {!isLoading && landmarks.length === 0 && <p>Empty.</p>}
          {!isLoading && landmarks.length !== 0 && (
            <Landmarks landmarks={landmarks} />
          )}
        </MainList>
        <Footer />
      </Container>
    </Fragment>
  );
};

export default Likes;
