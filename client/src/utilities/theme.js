import { grey, indigo } from '@material-ui/core/colors';

const theme = {
  color: {
    primary: indigo[500],
    primaryLighter: indigo[200],
    primaryDarker: indigo[700],
    secondary: grey[500],
    secondaryLighter: grey[200],
    secondaryDarker: grey[700]
  },
  fontSize: 16,
  shadow: {
    subtle: '0px 3px 15px rgba(0, 0, 0, 0.2)'
  },
  fontWeight: {
    bold: 500,
    bolder: 700,
    boldest: 900
  },
  space: 12
};

export default theme;
