/* eslint-disable no-console */
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const fetchEntries = async (obj) => {
    try {
        const entries = await client.getEntries(obj);
        if (entries.items) {
            return entries.items;
        }
    } catch (contentType) {
        console.error(contentType);
    }
};

export { fetchEntries };
