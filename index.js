require("dotenv").config();

const express = require("express");
const contentful = require("contentful");
const _ = require("lodash");
const richTextTypes = require("@contentful/rich-text-types");
const toHTMLString = require("@contentful/rich-text-html-renderer")
  .documentToHtmlString;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

const previewClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com",
});

async function getArticleEntries() {
  return publicArticles;
}

const app = express();
const port = process.env.PORT;

app.get("/", async (req, res) => {
  const publicArticles = await client.getEntries({
    content_type: "publicArticle",
  });
  res.send(toHTMLString(publicArticles.items[0].fields.content));
});

app.get("/files", async (req, res) => {
  const pdfDocuments = await client.getEntries({
    content_type: "pdfDocument",
  });
  const items = pdfDocuments.items.map((item) => ({
    url: _.get(item, "fields.file.fields.file.url"),
    title: _.get(item, "fields.title"),
  }));
  res.setHeader("Content-Type", "application/json");
  res.send(items);
});

app.get("/preview-files", async (req, res) => {
  const pdfDocuments = await previewClient.getEntries({
    content_type: "pdfDocument",
  });
  const items = pdfDocuments.items.map((item) => ({
    url: _.get(item, "fields.file.fields.file.url"),
    title: _.get(item, "fields.title"),
  }));
  res.setHeader("Content-Type", "application/json");
  res.send(items);
});

app.get("/raw-files", async (req, res) => {
  const pdfDocuments = await client.getEntries({
    content_type: "pdfDocument",
  });
  res.setHeader("Content-Type", "application/json");
  res.send(pdfDocuments);
});

app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});
