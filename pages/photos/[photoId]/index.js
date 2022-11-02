import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Fragment, useEffect, useState } from "react";

import SEO from "../../../components/SEO";
import Container from "../../../components/layout/Container";
import Footer from "../../../components/layout/Footer";

import styles from "../../../styles/Photo.module.css";

const Photo = (props) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(null);

  const photo = props.photo;

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem("amazeu"));
    if (savedPhotos === null) {
      return;
    }

    const savedPhoto = savedPhotos.filter(
      (savedPhoto) => savedPhoto.id === photo.id
    );
    if (savedPhoto.length !== 0) {
      setIsLiked(true);
    }
  }, []);

  const likeHandler = () => {
    const savedPhotos = JSON.parse(localStorage.getItem("amazeu"));

    if (savedPhotos === null) {
      localStorage.setItem("amazeu", JSON.stringify([photo]));
    } else if (savedPhotos.length === 0) {
      savedPhotos.push(photo);
      localStorage.setItem("amazeu", JSON.stringify(savedPhotos));
    } else {
      for (const savedPhoto of savedPhotos) {
        if (savedPhoto.id === photo.id) {
          const unremovedPhotos = savedPhotos.filter(
            (savedPhoto) => savedPhoto.id !== photo.id
          );
          localStorage.setItem("amazeu", JSON.stringify(unremovedPhotos));

          setIsLiked(false);
          return;
        }
      }
      savedPhotos.push(photo);
      localStorage.setItem("amazeu", JSON.stringify(savedPhotos));
    }

    setIsLiked(true);
  };

  return (
    <Fragment>
      <SEO
        title={`${photo.alt} - Amaze U`}
        description={`${photo.alt} by ${photo.photographer}`}
        page={`https://amazeu.vercel.app/photos/${photo.id}`}
        image={photo.src.landscape}
      />

      <Container>
        <header className={styles.header}>
          <nav>
            <button onClick={() => router.back()}>Back</button>
          </nav>
          <h1>Amaze U</h1>
        </header>
        <main className={styles.main}>
          <Image
            src={photo.src.large}
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
            <button onClick={likeHandler}>
              <Image
                src={isLiked ? "/liked.svg" : "/like.svg"}
                alt=""
                width={44}
                height={44}
              />
            </button>
            <Link href={photo.url}>Download on Pexels</Link>
          </div>
        </main>
        <Footer />
      </Container>
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
      photo: {
        id: data.id,
        alt: data.alt,
        url: data.url,
        photographer: data.photographer,
        photographer_url: data.photographer_url,
        height: data.height,
        width: data.width,
        src: {
          landscape: data.src.landscape,
          large: data.src.large,
        },
      },
    },
  };
};

export default Photo;
