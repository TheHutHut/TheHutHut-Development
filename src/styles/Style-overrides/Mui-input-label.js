import theme from 'src/styles/theme';

const MuiInputLabel = {
    styleOverrides: {
        // Name of the slot
        root: {
            // Some CSS
            color: theme.color.text,
            // "&:hover": {
            //     backgroundColor: "blue",
            // },
        },
        notchedOutline: {},
        focused: {},
        error: {},
        disabled: {},
    },
};

export default MuiInputLabel;
