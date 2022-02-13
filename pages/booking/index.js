/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { addNewDoc } from 'src/db-firebase/utils/add';
import { collectionNameReservedDates } from 'src/db-firebase/utils/collection-names';
import { deleteDocument } from 'src/db-firebase/utils/delete';
import { fetchEntries } from 'src/utils/get-contentful.js';
import { getDocument, getCollection } from 'src/db-firebase/utils/get';
import { setNewDoc } from 'src/db-firebase/utils/set';
import { Timestamp } from 'firebase/firestore';
import { Typography } from '@mui/material';
import { useBookingContext } from 'src/contexts/Booking-context';
import Carousel from 'src/components/Carousel';
import CheckAvailabilityBar from 'src/components/Check-availability-bar';
import Layout from 'src/components/Layout';
import ProductCard from 'src/components/Product/Product-card';
import SelectProductCard from 'src/components/Product/Select-product-card';
import styled from '@emotion/styled';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper';
import { useFormik } from 'formik';

const ProductList = ({ bookingRequestData, roomsData }) => {
    if (bookingRequestData.availability === false) {
        return (
            <InfoWrapper>
                <CardWrapper>
                    <Title variant="h4" component="h2">
                        We are sorry to inform you that we are fully booked for these dates. We
                        would be delighted to welcome you, however we urge that you consider
                        alternative dates.
                    </Title>
                </CardWrapper>
            </InfoWrapper>
        );
    }

    return (
        <>
            <CardWrapper>
                <SelectProductCard />
            </CardWrapper>
            {roomsData.map((room, index) => {
                //TODO: move this outside of jxs
                const exist = bookingRequestData.rooms.some((r) => r.title === room.fields.title);
                return (
                    exist && (
                        <CardWrapper key={index}>
                            <ProductCard data={room} bookingRequestData={bookingRequestData} />
                        </CardWrapper>
                    )
                );
            })}
        </>
    );
};

const Product = ({ pageData }) => {
    return (
        <InfoWrapper>
            <StyledCarousel images={pageData.images} />
            {pageData.text && (
                <TextWrapper>
                    <Text data={pageData.text} />
                </TextWrapper>
            )}
        </InfoWrapper>
    );
};

const BookingWrapper = ({ pageData, headerData, footerData, roomsData }) => {
    const { bookingRequestData } = useBookingContext();
    const [showBooking, setShowBooking] = useState(false);

    const data = {
        pageData,
        headerData,
        footerData,
        ContentIsRenderedFromCMS: false,
    };

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: (values) => {
            if (values.password === process.env.NEXT_PUBLIC_PASSWORD) {
                setShowBooking(true);
            }
        },
    });

    //process.env.NODE_ENV === 'production' or showBooking
    if (process.env.NODE_ENV === 'production') {
        return (
            <Layout data={data}>
                <PageWrapper>
                    <Title style={{ marginTop: '100px', width: '80%' }} variant="h3" component="h1">
                        Dear visitors, booking a Bungalow at The Hut Hut is now unavailable. The
                        hotel is nearing completion, and as soon as it is, you will be able to
                        reserve a Bungalow and enjoy our magnificent surroundings and design.
                    </Title>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="text"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </PageWrapper>
            </Layout>
        );
    }

    return (
        <Layout data={data}>
            <PageWrapper>
                {pageData.title && (
                    <Title variant="h3" component="h1">
                        {pageData.title}
                    </Title>
                )}
                <CheckAvailabilityBar roomsData={roomsData.data} />
                {bookingRequestData ? (
                    <ProductList
                        bookingRequestData={bookingRequestData}
                        roomsData={roomsData.data}
                    />
                ) : (
                    <Product pageData={pageData} />
                )}
            </PageWrapper>
        </Layout>
    );
};

export default BookingWrapper;

export const getStaticProps = async () => {
    // Call contentful API endpoint to get pages
    const contentTypeId = process.env.CONTENTFUL_CT_BOOKING_PAGE_ID;
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

    const contentIdRooms = 'W7KD1ymQtC0ZYgH45RyVz';
    const rooms = await fetchEntries({
        include: 8,
        'sys.id': contentIdRooms,
    });

    const pageData = entries && entries[0] && entries[0].fields ? entries[0].fields : null;

    const headerData = header && header[0] && header[0].fields ? header[0].fields : null;

    const footerData = footer && footer[0] && footer[0].fields ? footer[0].fields : null;

    const roomsData = rooms && rooms[0] && rooms[0].fields ? rooms[0].fields : null;

    //TODO remove these after development
    // deleteDocument(collectionNameReservedDates, 'bubungalow1');
    // deleteDocument(collectionNameReservedDates, 'bubungalow2');
    // deleteDocument(collectionNameReservedDates, 'bubungalow3');
    // deleteDocument(collectionNameReservedDates, 'bubungalow4');
    // deleteDocument(collectionNameReservedDates, 'test1');
    // deleteDocument(collectionNameReservedDates, 'test2');
    // deleteDocument(collectionNameReservedDates, 'test3');
    // deleteDocument(collectionNameReservedDates, 'test4');

    const removeAndSaveRoomId = async (rooms) => {
        const response = await getCollection(collectionNameReservedDates);

        for (let i = 0; i < response.length; i++) {
            const element = response[i];

            if (!rooms.includes(element.id)) {
                //TODO: Add email alert to admin if this happens and make removeAndSaveRoomId and addRoomIdDB one function
                const dataObj = {
                    id: element.id,
                    dates: element.dates,
                    deleted_at: Timestamp.fromDate(new Date()),
                };
                addNewDoc('reserved_dates_deleted', dataObj);
                deleteDocument(collectionNameReservedDates, element.id);
            }
        }
    };

    const addRoomIdDB = async (roomsData) => {
        const roomIdArray = [];
        for (let i = 0; i < roomsData.data.length; i++) {
            const element = roomsData.data[i].fields;

            for (let j = 0; j < element.roomsId.length; j++) {
                const id = element.roomsId[j];

                const response = await getDocument(collectionNameReservedDates, id);

                if (response === null) {
                    setNewDoc(collectionNameReservedDates, id, { dates: [] });
                }

                roomIdArray.push(id);
            }
        }

        removeAndSaveRoomId(roomIdArray);
    };

    if (roomsData) {
        // TODO: add this line of code when we go live
        addRoomIdDB(roomsData);
    }

    return {
        props: {
            pageData,
            headerData,
            footerData,
            roomsData,
        },
    };
};

const PageWrapper = styled('div')`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 12px;
    padding-top: 60px;
    padding-bottom: 60px;

    ${above.tablet} {
        padding: 0px;
        padding-top: 90px;
        padding-bottom: 90px;
    }

    ${above.laptop} {
        padding-top: 120px;
        padding-bottom: 120px;
    }
`;

const Title = styled(Typography)`
    text-align: center;
    margin-bottom: 40px;
`;

const InfoWrapper = styled('div')`
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    ${above.laptop} {
        align-items: initial;
        flex-direction: row;
        justify-content: space-evenly;
    }
`;

const StyledCarousel = styled(Carousel)`
    width: 500px;
    height: 550px;

    ${above.tablet} {
        width: 500px;
    }
`;

const TextWrapper = styled('div')`
    max-width: 700px;
    margin-bottom: 40px;
    text-align: center;

    ${above.laptop} {
        margin-bottom: 0px;
        padding-left: 32px;
        padding-right: 32px;
        padding-top: 40px;
    }
`;

const Text = styled(WysiwygWrapper)``;

const CardWrapper = styled('div')`
    margin-top: 32px;
    width: 100%;

    ${above.tablet} {
        width: 90%;
    }
`;
