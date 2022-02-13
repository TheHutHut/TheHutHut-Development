import React from 'react';
import { fetchEntries } from 'src/utils/get-contentful.js';
import Layout from 'src/components/Layout';

const PageBuilder = ({ pageData, headerData, footerData }) => {
    const data = {
        pageData,
        headerData,
        footerData,
        ContentIsRenderedFromCMS: true,
    };

    return <Layout data={data} />;
};

export default PageBuilder;

export const getStaticProps = async ({ params }) => {
    // Call contentful API endpoint to get pages
    const contentTypeId = 'page';
    const data = await fetchEntries({
        // eslint-disable-next-line camelcase
        content_type: contentTypeId,
        include: 8,
    });

    const pageData = data.filter(
        (page) =>
            params.pagebuilder ===
            page.fields.pageTemplate.fields.pageUrlModule.fields.urlFirstLevel
    );

    // Call contentful API endpoint to get header
    const contentIdHeader = process.env.CONTENTFUL_CT_HEADER_ID;
    const header = await fetchEntries({
        include: 8,
        'sys.id': contentIdHeader,
    });
    const headerData = header && header[0] && header[0].fields ? header[0].fields : null;

    // Call contentful API endpoint to get footer
    const contentIdFooter = process.env.CONTENTFUL_CT_FOOTER_ID;
    const footer = await fetchEntries({
        include: 8,
        'sys.id': contentIdFooter,
    });
    const footerData = footer && footer[0] && footer[0].fields ? footer[0].fields : null;

    if (
        pageData &&
        pageData[0].fields &&
        pageData[0].fields.pageTemplate &&
        pageData[0].fields.pageTemplate.fields
    ) {
        return {
            props: {
                pageData: pageData[0].fields.pageTemplate.fields,
                headerData,
                footerData,
            },
        };
    }

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
};

export const getStaticPaths = async () => {
    // Call contentful API endpoint to get pages
    const contentTypeId = 'page';
    const data = await fetchEntries({
        // eslint-disable-next-line camelcase
        content_type: contentTypeId,
        include: 8,
    });
    // Get the paths we want to pre-render based on pages
    const paths = data.map((page) => ({
        params: {
            pagebuilder: page.fields.pageTemplate.fields.pageUrlModule.fields.urlFirstLevel,
        },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
};
