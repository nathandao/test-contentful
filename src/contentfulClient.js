require("dotenv").config();
const contentful = require("contentful");

// Set USE_PREVIEW to "true" to render preview content.
// Remember to use a preview token for CONTENTFUL_TOKEN instead
const usePreview = process.env.USE_PREVIEW === "true";

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_TOKEN,
    ...(usePreview ? { host: "preview.contentful.com" } : {}),
});

module.exports = client;
