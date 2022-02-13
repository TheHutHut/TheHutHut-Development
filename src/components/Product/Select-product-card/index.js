import React, { useState } from 'react';
import { Card, Button, Typography, Divider } from '@mui/material';
import { useBookingContext } from 'src/contexts/Booking-context';
import { useRouter } from 'next/router';
import Select from 'src/components/Form/select';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
    padding: 40px;
`;

const SelectWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const ButtonWrapper = styled('div')`
    height: 56px;
    margin-top: 40px;
`;

const StyledButton = styled(Button)`
    height: 100%;
`;

export default function SelectProductCard() {
    const { bookingRequestData, setBookingRequestData } = useBookingContext();
    const [rooms, setRooms] = useState(bookingRequestData);
    const [disabled, setDisable] = useState(true);
    const router = useRouter();

    const handleOrderQuantity = (value, room) => {
        let totalPrice = 0;
        let orderQuantity = 0;
        let minimumQuantity = 0;

        // Change order quantity
        const newArray = rooms.rooms.map((obj) => {
            if (obj.title === room.title) {
                return { ...obj, order_quantity: value };
            }
            return obj;
        });

        for (let i = 0; i < newArray.length; i++) {
            // Add up to the total cost
            if (newArray[i].order_quantity > 0) {
                const price =
                    newArray[i].price * bookingRequestData.nights * newArray[i].order_quantity;
                totalPrice = totalPrice + price;
            }

            // Make sure enough rooms are selected
            orderQuantity = orderQuantity + newArray[i].order_quantity;
            if (minimumQuantity < newArray[i].minimum_order_quantity) {
                const difference = Math.abs(newArray[i].minimum_order_quantity - minimumQuantity);
                minimumQuantity = minimumQuantity + difference;
            }
        }

        //New object with updated values
        const newBookingObj = { ...bookingRequestData, price_total: totalPrice, rooms: newArray };

        setRooms(newBookingObj);

        if (orderQuantity >= minimumQuantity) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };

    const handleRouting = () => {
        setBookingRequestData(rooms);
        router.push('/booking/pay');
    };

    return (
        <StyledCard>
            <div>
                {bookingRequestData.rooms.map((room, index) => {
                    return (
                        <div key={index}>
                            <SelectWrapper>
                                <Typography variant="h4">{room.title}</Typography>
                                <Select
                                    labelText="Amount of rooms"
                                    items={room.select_items_arr}
                                    initialValue={room.select_items_arr[0]}
                                    parentFunc={(value) => {
                                        handleOrderQuantity(value, room);
                                    }}
                                />
                            </SelectWrapper>
                            <Divider />
                        </div>
                    );
                })}
            </div>
            <ButtonWrapper>
                <StyledButton disabled={disabled} variant="outlined" onClick={handleRouting}>
                    Book now
                </StyledButton>
            </ButtonWrapper>
        </StyledCard>
    );
}
