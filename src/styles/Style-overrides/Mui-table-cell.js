import theme from 'src/styles/theme';

const MuiTableCell = {
  styleOverrides: {
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

export default MuiTableCell;
