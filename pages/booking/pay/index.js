import React, { useEffect } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { Alert } from '@mui/material';
import { fetchEntries } from 'src/utils/get-contentful.js';
import { useBookingContext } from 'src/contexts/Booking-context';
import { useRouter } from 'next/router';
import CheckoutSummaryCard from 'src/components/Card/Checkout-summary-card';
import CircularLoader from 'src/components/Loaders/Circular';
import CustomerDetailsForm from 'src/components/Form/customer-details-form';
import Layout from 'src/components/Layout';
import styled from '@emotion/styled';

const PageWrapper = styled('div')`
    width: 100%;
    min-height: 100vh;
    padding: 12px;
    padding-top: 90px;
    padding-bottom: 60px;

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

const CustomerDetailsWrapper = styled('div')`
    flex: 1;
`;

const StyledCustomerDetailsForm = styled(CustomerDetailsForm)`
    width: 80%;
`;

const BookingDetailsWrapper = styled('div')`
    width: 500px;
`;

const StyledCircularLoader = styled(CircularLoader)`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorWrapper = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledAlert = styled(Alert)`
    width: 80%;
`;

const CreateBooking = ({ headerData, footerData }) => {
    const router = useRouter();
    const { bookingRequestData } = useBookingContext();

    useEffect(() => {
        if (!bookingRequestData) {
            router.push('/booking');
        }
    }, []);

    const data = {
        headerData,
        footerData,
        ContentIsRenderedFromCMS: false,
    };

    if (!bookingRequestData) {
        return (
            <Layout data={data}>
                <StyledCircularLoader />
            </Layout>
        );
    }

    //TODO: make this more dry
    if (typeof Storage === 'undefined') {
        const errorMessage = `This is an error alert — I'm sorry, but you won't be able to make a reservation with us because of the browser you're using or the settings you've enabled. Update your browser or contact us for assistance.`;
        return (
            <Layout data={data}>
                <ErrorWrapper>
                    <StyledAlert severity="error">{errorMessage}</StyledAlert>
                </ErrorWrapper>
            </Layout>
        );
    }

    return (
        <Layout data={data}>
            <PageWrapper>
                <CustomerDetailsWrapper>
                    <StyledCustomerDetailsForm />
                </CustomerDetailsWrapper>
                <BookingDetailsWrapper>
                    <CheckoutSummaryCard title="Checkout summary" data={bookingRequestData} />
                </BookingDetailsWrapper>
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

    // Call contentful API endpoint to get room data
    const contentIdRooms = 'W7KD1ymQtC0ZYgH45RyVz';
    const rooms = await fetchEntries({
        include: 8,
        'sys.id': contentIdRooms,
    });

    const headerData = header && header[0] && header[0].fields ? header[0].fields : null;

    const footerData = footer && footer[0] && footer[0].fields ? footer[0].fields : null;

    const roomsData = rooms && rooms[0] && rooms[0].fields ? rooms[0].fields : null;

    return {
        props: {
            headerData,
            footerData,
            roomsData,
        },
    };
};
