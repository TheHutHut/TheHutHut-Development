import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import theme from 'src/styles/theme';
import typography from 'src/styles/Typography';

//components
import MuiOutlinedInput from 'src/styles/Style-overrides/Mui-outlined-input';
import MuiInputLabel from 'src/styles/Style-overrides/Mui-input-label';
import MuiButton from 'src/styles/Style-overrides/Mui-button';
import MuiLink from 'src/styles/Style-overrides/Mui-link';
import MuiTableCell from 'src/styles/Style-overrides/Mui-table-cell';
// Create a theme instance.

const themeMUI = createTheme({
    palette: {
        primary: {
            main: theme.color.soilBrown,
        },
        secondary: {
            main: theme.color.beach,
        },
        error: {
            main: red.A400,
        },
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 721,
            laptop: 1152,
            desktop: 1440,
        },
    },
    typography,
    components: {
        // Name of the component
        MuiOutlinedInput,
        MuiInputLabel,
        MuiButton,
        MuiLink,
        MuiTableCell,
    },
});

export default themeMUI;
