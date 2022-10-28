import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Fragment, useState } from "react";

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
    const response = await fetch(page, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
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

      <div className={styles.container}>
        <header>
          <h1>Amaze U</h1>
          <p>Explore all famous landmarks around the world.</p>
        </header>
        <main className={styles.main}>
          {landmarks.photos.map((landmark) => (
            <article key={landmark.id}>
              <Link href={`/photos/${landmark.id}`}>
                <Image
                  src={landmark.src.landscape}
                  alt={landmark.alt}
                  title={landmark.alt}
                  height={landmark.height}
                  width={landmark.width}
                />
              </Link>
            </article>
          ))}
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
        </main>

        <footer>
          <p>
            <b>Amaze U</b> &copy; 2022.
          </p>
          <p>
            Photos provided by <a href="https://www.pexels.com">Pexels</a>.
          </p>
        </footer>
      </div>
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
