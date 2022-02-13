const breakpoints = ['0px', '721px', '1152px', '1440px', '2560px'];
const breakpointsMax = ['720px', '1151', '1439px', '2559px', '99999px'];
const labels = ['mobile', 'tablet', 'laptop', 'desktop', 'desktop_xl'];

const soilBrown = '#624E41';
const beach = '#FDF8F1';

const theme = {
    color: {
        white: '#fff',
        black: '#000',
        soilBrown,
        beach,

        text: soilBrown,
        border: soilBrown,
        header: beach,
        background: beach,
        hamburger: soilBrown,

        footer: '#fff',
    },

    height: {
        header: '74px',
        headerMobile: '74px',
    },

    media: {
        above: {
            desktop_xl: '@media (min-width: 2560px)',
            desktop: '@media (min-width: 1440px)',
            laptop: '@media (min-width: 1152px)',
            tablet: '@media (min-width: 721px)',
            // mobile: '@media (min-width: 0px)',
        },
        below: {
            desktop_xl: '@media (min-width: 2559px)',
            desktop: '@media (min-width: 1439px)',
            laptop: '@media (min-width: 1151px)',
            tablet: '@media (min-width: 720px)',
            // mobile: '@media (min-width: -1px)',
        },
    },
};

export default theme;
