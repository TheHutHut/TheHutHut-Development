import theme from 'src/styles/theme';

const MuiOutlinedInput = {
    styleOverrides: {
        // Name of the slot
        root: {
            // Some CSS
            borderRadius: '0px',
            // "&:hover": {
            //     backgroundColor: "blue",
            // },
            color: theme.color.text,
        },
        notchedOutline: {
            borderColor: theme.color.border,
        },
        focused: {},
        error: {},
        disabled: {},
    },
};

export default MuiOutlinedInput;
