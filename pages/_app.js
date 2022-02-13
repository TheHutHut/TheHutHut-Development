import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import BookingContext from 'src/contexts/Booking-context';
import createEmotionCache from 'src/components/Emotion/create-emotion-cache';
import CssBaseline from '@mui/material/CssBaseline';
import MuiTheme from 'src/styles/Mui-theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <CssBaseline />
            <ThemeProvider theme={MuiTheme}>
                <BookingContext>
                    <Component {...pageProps} />
                </BookingContext>
            </ThemeProvider>
        </CacheProvider>
    );
}
