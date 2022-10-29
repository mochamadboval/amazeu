const handler = async (req, res) => {
  const decodePage = decodeURIComponent(req.query.url);
  const response = await fetch(decodePage, {
    headers: {
      Authorization: process.env.API_KEY,
    },
  });
  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
