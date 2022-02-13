import theme from "src/styles/theme";

const MuiButton = {
    styleOverrides: {
        // Name of the slot
        root: {
            // Some CSS
            color: theme.color.text,
            borderColor: theme.color.border,
            borderRadius: "0px",

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

export default MuiButton;
