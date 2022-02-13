import React from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { fetchEntries } from 'src/utils/get-contentful.js';
import { Typography, Button } from '@mui/material';
import inBrowser from 'src/utils/in-browser';
import Layout from 'src/components/Layout';
import Link from 'src/components/Link/Mui-link';
import styled from '@emotion/styled';

const PageWrapper = styled('div')`
    width: 100%;
    min-height: 100vh;
    padding: 12px;
    padding-top: 90px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${above.tablet} {
        padding: 24px;
        padding-top: 90px;
        padding-bottom: 90px;
        display: flex;
    }

    ${above.laptop} {
        padding: 32px;
        padding-top: 120px;
        padding-bottom: 120px;
    }
`;

const Heading = styled(Typography)`
    margin-bottom: 32px;
    text-align: center;
`;

const StyledButton = styled(Button)`
    ${above.laptop} {
        margin-left: 56px;
    }
`;

const CreateBooking = ({ headerData, footerData }) => {
    const data = {
        headerData,
        footerData,
        ContentIsRenderedFromCMS: false,
    };

    if (inBrowser) {
        sessionStorage.removeItem('user-data');
    }

    return (
        <Layout data={data}>
            <PageWrapper>
                <Heading>
                    Opps! Something went wrong with your payment and the booking is canceled.
                </Heading>
                <StyledButton variant="outlined" component={Link} href="/booking">
                    Creat a new Booking
                </StyledButton>
            </PageWrapper>
        </Layout>
    );
};

export default CreateBooking;

// eslint-disable-next-line require-await
export const getStaticProps = async () => {
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

    const headerData = header && header[0] && header[0].fields ? header[0].fields : null;

    const footerData = footer && footer[0] && footer[0].fields ? footer[0].fields : null;

    return {
        props: {
            headerData,
            footerData,
        },
    };
};
