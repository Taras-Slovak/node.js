const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = 'fa41c7877ce0de3b5a12da617bc8e8c2';

const generateScraperApi = (apiKey) =>
  `http://api.scraperapi.com?api_key=${generateScraperApi(
    apiKey,
  )}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper Api.');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperApi(
        api_key,
      )}&url=https://www.amazon.com/dp/${productId}`,
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get product review
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperApi(
        api_key,
      )}&url=https://www.amazon.com/product-reviews/${productId}`,
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperApi(
        api_key,
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`,
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperApi(
        api_key,
      )}&url=https://www.amazon.com/s?k=${searchQuery}`,
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
