import theme from "src/styles/theme";

const MuiLink = {
    styleOverrides: {
        // Name of the slot
        root: {
            // Some CSS
            color: theme.color.text,
            borderColor: theme.color.border,

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

export default MuiLink;
