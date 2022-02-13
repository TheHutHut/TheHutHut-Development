import React, { useState, Fragment } from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries';
import { TextField, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import styled from '@emotion/styled';

const WrapperMobile = styled('div')`
    ${above.laptop} {
        display: none;
    }
`;

const WrapperDesktop = styled('div')`
    ${below.laptop} {
        display: none;
    }
`;

export default function BasicDateRangePicker({ parentFunc }) {
    const [value, setValue] = useState([null, null]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <WrapperMobile>
                <MobileDateRangePicker
                    disablePast
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    renderInput={(startProps, endProps) => (
                        <Fragment>
                            <TextField autoComplete="off" {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField autoComplete="off" {...endProps} />
                        </Fragment>
                    )}
                    onChange={(newValue) => {
                        setValue(newValue);
                        parentFunc(newValue);
                    }}
                />
            </WrapperMobile>
            <WrapperDesktop>
                <DesktopDateRangePicker
                    disablePast
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    renderInput={(startProps, endProps) => (
                        <Fragment>
                            <TextField autoComplete="off" {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField autoComplete="off" {...endProps} />
                        </Fragment>
                    )}
                    onChange={(newValue) => {
                        setValue(newValue);
                        parentFunc(newValue);
                    }}
                />
            </WrapperDesktop>
        </LocalizationProvider>
    );
}
