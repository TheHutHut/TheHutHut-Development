/* eslint-disable camelcase */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { formatDateDayMonthYear } from 'src/utils/format-date';

export default async function handler(req, res) {
    const { start_date, end_date, nights, rooms } = req.body.bookingRequestData;
    const { email } = req.body.user;

    if (req.method === 'POST') {
        const line_items = rooms
            .filter((room) => room.order_quantity > 0)
            .map((room) => {
                const price = nights * room.price;
                return {
                    price_data: {
                        currency: 'usd',
                        unit_amount: price,
                        product: room.stripe_id,
                    },
                    description: `${formatDateDayMonthYear(start_date)} - ${formatDateDayMonthYear(
                        end_date
                    )}`,
                    quantity: room.order_quantity,
                };
            });

        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items,
                customer_email: email,
                mode: 'payment',
                success_url: `${req.headers.origin}/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/canceled?canceled=true`,
            });
            res.json({ id: session.id, paymentIntent: session.payment_intent });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
