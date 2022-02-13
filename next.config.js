let cstValue = '';

if (process.env.NODE_ENV === 'production') {
    cstValue =
        "default-src 'self' https://cdn.firebase.com https://*.firebaseio.com https://*.firebaseio.com https://js.stripe.com; connect-src 'self' https://googleapis.com https://*.googleapis.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' https://js.stripe.com; object-src 'none'; report-uri https://thehuthut.com/csp-violation-report-endpoint/";
}

const securityHeaders = [
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'Content-Security-Policy',
        value: cstValue,
    },
];

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['images.ctfassets.net'],
    },
    // eslint-disable-next-line require-await
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};
