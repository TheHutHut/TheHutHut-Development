import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const CircularWrapper = styled('div')``;

const CreateBooking = ({ ...rest }) => {
    return (
        <CircularWrapper {...rest}>
            <CircularProgress />
        </CircularWrapper>
    );
};

export default CreateBooking;
