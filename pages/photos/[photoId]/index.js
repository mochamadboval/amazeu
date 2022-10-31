import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Fragment } from "react";

import Footer from "../../../components/Footer";

import styles from "../../../styles/Photo.module.css";

const Photo = (props) => {
  const router = useRouter();

  const photo = props.photo;

  return (
    <Fragment>
      <Head>
        <title>{photo.alt} |Amaze U</title>
        <meta
          name="description"
          content={`${photo.alt} by ${photo.photographer}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header>
          <nav>
            <button onClick={() => router.back()}>Back</button>
          </nav>
          <h1>Amaze U</h1>
        </header>

        <main className={styles.main}>
          <Image
            src={photo.src.large2x}
            alt={photo.alt}
            title={photo.alt}
            height={photo.height}
            width={photo.width}
          />
          <h2>{photo.alt}</h2>
          <p>
            by <Link href={photo.photographer_url}>{photo.photographer}</Link>
          </p>
          <div className={styles.action}>
            <button>
              <Image
                src="/like.svg"
                alt="Save to Likes"
                width={44}
                height={44}
              />
            </button>
            <Link href={photo.url}>Download on Pexels</Link>
          </div>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const photoId = context.params.photoId;

  const response = await fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
    headers: {
      Authorization: process.env.API_KEY,
    },
  });
  const data = await response.json();

  return {
    props: {
      photo: data,
    },
  };
};

export default Photo;
