import MenuLink from "./MenuLink";

import styles from "../../styles/Menu.module.css";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <MenuLink url="/" icon="/home.svg">
          Home
        </MenuLink>
        <MenuLink url="/likes" icon="/like.svg">
          Likes
        </MenuLink>
      </ul>
    </nav>
  );
};

export default Menu;
