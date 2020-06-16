const toHTMLString = require("@contentful/rich-text-html-renderer")
    .documentToHtmlString;
const client = require("../../contentfulClient");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    try {
        const result = await client.getEntries({
            content_type: "aboutUsPageInformation",
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ data: result.items }),
        };
    } catch (err) {
        console.log(err);
        return { statusCode: 500, body: err.toString() };
    }
};
