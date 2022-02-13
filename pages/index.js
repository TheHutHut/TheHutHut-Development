import React from 'react';
import { fetchEntries } from 'src/utils/get-contentful.js';
import Layout from 'src/components/Layout';

const HomePage = ({ pageData, headerData, footerData }) => {
    const data = {
        pageData,
        headerData,
        footerData,
        ContentIsRenderedFromCMS: true,
    };

    return <Layout data={data} />;
};

export default HomePage;

export const getStaticProps = async () => {
    // Call contentful API endpoint to get pages
    const contentTypeId = process.env.CONTENTFUL_CT_INDEX_PAGE_ID;
    const entries = await fetchEntries({ include: 8, 'sys.id': contentTypeId });

    // Call contentful API endpoint to get header
    const contentIdHeader = process.env.CONTENTFUL_CT_HEADER_ID;
    const header = await fetchEntries({
        include: 8,
        'sys.id': contentIdHeader,
    });

    // Call contentful API endpoint to get footer
    const contentIdFooter = process.env.CONTENTFUL_CT_FOOTER_ID;
    const footer = await fetchEntries({
        include: 8,
        'sys.id': contentIdFooter,
    });

    const pageData = entries && entries[0] && entries[0].fields ? entries[0].fields : null;

    const headerData = header && header[0] && header[0].fields ? header[0].fields : null;

    const footerData = footer && footer[0] && footer[0].fields ? footer[0].fields : null;

    return {
        props: {
            pageData,
            headerData,
            footerData,
        },
    };
};
