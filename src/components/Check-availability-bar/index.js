/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { Button, CircularProgress } from '@mui/material';
import { CheckAvailabilityDb } from 'src/db-firebase/utils/check';
import { useBookingContext } from 'src/contexts/Booking-context';
import DateRangePicker from 'src/components/Check-availability-bar/Date-range-picker';
import Selector from 'src/components/Check-availability-bar/Selector';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    ${above.laptop} {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const ElementWrapper = styled('div')`
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-of-type(2n) {
        margin: 16px;

        ${above.laptop} {
            margin: 0px;
            margin-left: 16px;
            margin-right: 16px;
        }
    }
`;

const StyledButton = styled(Button)`
    height: 100%;
    border-radius: 0px;
    font-size: 1rem;
    font-weight: 400;
    text-transform: capitalize;
`;

export default function CheckAvailabilityBar({ roomsData }) {
    const [amountOfGuests, setAmountOfGuests] = useState(null);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const { bookingRequestData, setBookingRequestData } = useBookingContext();

    const showOptions = async () => {
        if (amountOfGuests && dates[0] && dates[1]) {
            setLoading(true);
            const responseData = await CheckAvailabilityDb(
                dates[0],
                dates[1],
                amountOfGuests,
                roomsData
            );

            if (responseData !== null) {
                setBookingRequestData(responseData);
            } else {
                setBookingRequestData({ availability: false });
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        if (bookingRequestData !== null) {
            setBookingRequestData(null);
        }
    }, [amountOfGuests, dates]);

    return (
        <Wrapper>
            <ElementWrapper>
                <Selector parentFunc={setAmountOfGuests} roomsData={roomsData} />
            </ElementWrapper>
            <ElementWrapper>
                <DateRangePicker parentFunc={setDates} />
            </ElementWrapper>
            <ElementWrapper>
                <StyledButton
                    variant="outlined"
                    style={{ minWidth: '180px' }}
                    onClick={showOptions}
                >
                    {loading && <CircularProgress size={20} />}
                    {!loading && 'Check Availability'}
                </StyledButton>
            </ElementWrapper>
        </Wrapper>
    );
}
