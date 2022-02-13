/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { fetchEntries } from 'src/utils/get-contentful.js';
import { fetchPostJSON } from 'src/utils/api-helpers';
import { Typography } from '@mui/material';
import CheckoutSummaryCard from 'src/components/Card/Checkout-summary-card';
import CircularLoader from 'src/components/Loaders/Circular';
import inBrowser from 'src/utils/in-browser';
import Layout from 'src/components/Layout';
import styled from '@emotion/styled';

const PageWrapper = styled('div')`
    width: 100%;
    min-height: 100vh;
    padding: 12px;
    padding-top: 90px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

const StyledCircularLoader = styled(CircularLoader)`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextWrapper = styled('div')`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled(Typography)`
    margin-bottom: 32px;
    text-align: center;
`;

const Text = styled(Typography)`
    margin-bottom: 32px;
`;

const StyledCheckoutSummaryCard = styled(CheckoutSummaryCard)`
    width: 100%;
`;

const CreateBooking = ({ headerData, footerData }) => {
    const [bookingInformation, SetBookingInformation] = useState(null);
    const data = {
        headerData,
        footerData,
        ContentIsRenderedFromCMS: false,
    };

    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('user-data'));
        if (sessionData && sessionData[0]) {
            const createBooking = async () => {
                // eslint-disable-next-line no-unused-vars
                const response = await fetchPostJSON('/api/create_booking', {
                    data: sessionData[0],
                });
                //TODO: Handle response
            };

            createBooking();

            SetBookingInformation(sessionData[0]);

            if (inBrowser) {
                sessionStorage.removeItem('user-data');
            }
        }
    }, []);

    if (!bookingInformation) {
        return (
            <Layout data={data}>
                <StyledCircularLoader />
            </Layout>
        );
    }

    return (
        <Layout data={data}>
            <PageWrapper>
                <TextWrapper>
                    <Heading variant="h4">{`Your booking is confirmed and a confirmation email will be sent to ${bookingInformation.values.email}`}</Heading>
                    <Text>{`Booking id: ${bookingInformation.paymentIntent}`}</Text>
                </TextWrapper>
                <StyledCheckoutSummaryCard
                    title="Booking details"
                    data={bookingInformation.bookingRequestData}
                />
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
