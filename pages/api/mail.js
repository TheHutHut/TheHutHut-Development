/* eslint-disable import/no-anonymous-default-export */
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);

        const message = `
        Name: ${body.name}\r\n
        Email: ${body.email}\r\n
        Telephone: ${body.tel}\r\n
        text: ${body.text}\r\n
    `;

        const data = {
            to: 'admin@thehuthut.com',
            from: 'contactForm@thehuthut.com',
            subject: 'Contact form on website',
            text: message,
            html: message.replace(/\r\n/g, '<br>'),
        };

        await mail.send(data);

        return res.status(200).json({ status: 'ok' });
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            message: "The requested endpoint was not found or doesn't support this method.",
        },
    });
};
