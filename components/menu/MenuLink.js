import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/MenuLink.module.css";

const MenuLink = (props) => {
  return (
    <li className={styles.page}>
      <Link href={props.url}>
        <Image src={props.icon} alt="" width={24} height={24} />
        <b>{props.children}</b>
      </Link>
    </li>
  );
};

export default MenuLink;
