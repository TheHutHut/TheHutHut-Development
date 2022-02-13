import React from 'react';
import { fetchEntries } from 'src/utils/get-contentful.js';
import Layout from 'src/components/Layout';

const SubPageBuilder = ({ pageData, headerData, footerData }) => {
    const data = {
        pageData,
        headerData,
        footerData,
        ContentIsRenderedFromCMS: true,
    };

    return <Layout data={data} />;
};

export default SubPageBuilder;

export const getStaticProps = async ({ params }) => {
    // Call contentful API endpoint to get pages
    const contentTypeId = 'page';
    const data = await fetchEntries({
        // eslint-disable-next-line camelcase
        content_type: contentTypeId,
        include: 8,
    });

    const hasSubpageArr = data.filter((page) => {
        if (page.fields.subpageTemplate) {
            return page;
        }
    });

    const pageSlugFromParam = params.subpagebuilder[0];
    const subpageSlugFromParam = params.subpagebuilder[1];

    const pageData = [];
    for (let index = 0; index < hasSubpageArr.length; index++) {
        const subpageArr = hasSubpageArr[index].fields.subpageTemplate;

        for (let j = 0; j < subpageArr.length; j++) {
            const parentPageSlug =
                subpageArr[j].fields.subpageUrlModule.fields.parentPageUrl.fields.urlFirstLevel;
            const subpageSlug = subpageArr[j].fields.subpageUrlModule.fields.urlSecondLevel;

            if (parentPageSlug === pageSlugFromParam && subpageSlug === subpageSlugFromParam) {
                pageData.push(subpageArr[j]);
            }
        }
    }

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

    if (pageData && pageData[0].fields) {
        return {
            props: {
                pageData: pageData[0].fields,
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

    const hasSubpageArr = data.filter((page) => {
        if (page.fields.subpageTemplate) {
            return page;
        }
    });

    // Get the paths we want to pre-render based on pages
    const paths = [];
    for (let index = 0; index < hasSubpageArr.length; index++) {
        const subpageArr = hasSubpageArr[index].fields.subpageTemplate;

        for (let j = 0; j < subpageArr.length; j++) {
            const parentPageSlug =
                subpageArr[j].fields.subpageUrlModule.fields.parentPageUrl.fields.urlFirstLevel;
            const subpageSlug = subpageArr[j].fields.subpageUrlModule.fields.urlSecondLevel;

            paths.push({
                params: { subpagebuilder: [parentPageSlug, subpageSlug] },
            });
        }
    }

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
};
