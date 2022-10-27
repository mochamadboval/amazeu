import { Fragment } from "react";

import Menu from "../components/menu/Menu";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Menu />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
