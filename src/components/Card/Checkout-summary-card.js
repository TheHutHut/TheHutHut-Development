import React from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { Card, Typography, Divider } from '@mui/material';
import { centsToDollarString } from 'src/utils/format-price';
import { formatDateDayMonthYear } from 'src/utils/format-date';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
    min-height: 300px;
    padding: 40px;

    ${above.laptop} {
        flex-direction: row;
    }
`;

const Text = styled(Typography)`
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledDivider = styled(Divider)`
    margin-top: 32px;
`;

const Heading = styled(Typography)`
    margin-bottom: 32px;
`;

const Span = styled('span')`
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
`;

export default function CheckoutSummaryCard({ data, title = 'Summary', ...rest }) {
    const { start_date, end_date, guests, nights, price_total, rooms } = data;

    return (
        <StyledCard {...rest}>
            <Heading variant="h4">{title}</Heading>
            <Text>
                <Span>From: </Span>
                {formatDateDayMonthYear(start_date)}
            </Text>
            <Text>
                <Span>To: </Span>
                {formatDateDayMonthYear(end_date)}
            </Text>

            <Text>
                <Span>Check-in: </Span>
                3:00 pm
            </Text>
            <Text>
                <Span>Check-out: </Span>
                11:00 am
            </Text>

            <Text>
                <Span>Guests: </Span>
                {guests}
            </Text>

            <Text>
                <Span>Number of Nights: </Span>
                {nights}
            </Text>
            <StyledDivider />
            {rooms.map((room, index) => {
                return (
                    room.order_quantity > 0 && (
                        <div key={index}>
                            <Text>
                                <Span>{room.title}</Span>
                            </Text>
                            <Text>
                                <Span>Quantity:</Span>
                                {room.order_quantity}
                            </Text>
                            <Text>
                                <Span>Per Night:</Span>
                                {centsToDollarString(room.price, 'currency', 'USD')}
                            </Text>
                            <StyledDivider />
                        </div>
                    )
                );
            })}
            <Text>
                <Span>Total Price: </Span>
                {centsToDollarString(price_total, 'currency', 'USD')} (vat + taxes)
            </Text>
        </StyledCard>
    );
}
