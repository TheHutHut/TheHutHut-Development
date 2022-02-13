/* eslint-disable camelcase */
import { addNewDoc } from 'src/db-firebase/utils/add';
import {
    collectionNameReservations,
    collectionNameReservedDates,
} from 'src/db-firebase/utils/collection-names';
import { pushValuesToArray } from 'src/db-firebase/utils/update';
import { Timestamp } from 'firebase/firestore';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createReservationObj = (data, stripeData, paymentIntent) => {
    const { end_date, nights, start_date, price_total, rooms, dates } = data.bookingRequestData;
    const { email, guests } = data.values;
    const { created, customer, status } = stripeData;

    const occupiedRoomsArray = rooms
        .filter((room) => room.order_quantity > 0)
        .map((room) => {
            const SlicedArray = room.available_rooms_id.slice(0, room.order_quantity);
            return {
                title: room.title,
                quantity: room.order_quantity,
                occupied_rooms_id: SlicedArray,
            };
        });

    const obj = {
        id: paymentIntent,
        email,
        guests,
        duration: nights,
        end_date: Timestamp.fromDate(new Date(end_date)),
        start_date: Timestamp.fromDate(new Date(start_date)),
        issued: Timestamp.fromDate(new Date()),
        rooms: occupiedRoomsArray,
        payment: {
            stripe_customer: customer,
            status,
            price_total,
            date: Timestamp.fromDate(new Date(created)),
            payment_intent: paymentIntent,
        },
        reserved_dates: dates,
    };

    return obj;
};

// eslint-disable-next-line require-await
export default async function handler(req, res) {
    const { paymentIntent } = req.body.data;

    if (req.method === 'POST') {
        // Get stripe data
        const responseStripeData = await stripe.paymentIntents.retrieve(paymentIntent);

        // create reservation obj
        const reservationObj = createReservationObj(
            req.body.data,
            responseStripeData,
            paymentIntent
        );

        //save reservation in collection reservation
        addNewDoc(collectionNameReservations, reservationObj);

        //save dates in Collection reserved_dates
        //TODO: Should be possible to do with only one api update.
        for (let i = 0; i < reservationObj.rooms.length; i++) {
            const element = reservationObj.rooms[i];

            if (element.quantity > 0) {
                for (let j = 0; j < element.occupied_rooms_id.length; j++) {
                    const id = element.occupied_rooms_id[j];
                    pushValuesToArray(
                        collectionNameReservedDates,
                        id,
                        'dates',
                        reservationObj.reserved_dates
                    );
                }
            }
        }

        res.status(200).json({ message: 'Booking complete' });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
