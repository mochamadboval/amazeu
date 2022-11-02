import Head from "next/head";

const SEO = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="author" content="Mochamad Boval" />
      <meta name="robots" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={props.page} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:alt" content={props.description} />
      <meta property="og:site_name" content="Amaze U" />
      <meta property="og:locale" content="en_US" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
