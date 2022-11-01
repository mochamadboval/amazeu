import Image from "next/image";
import Link from "next/link";

import { Fragment } from "react";

const Landmarks = (props) => {
  return (
    <Fragment>
      {props.landmarks.map((landmark) => (
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
    </Fragment>
  );
};

export default Landmarks;
