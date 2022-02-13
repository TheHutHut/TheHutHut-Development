import React, { useState } from 'react';
import { Button, TextField, InputLabel, CircularProgress, Alert } from '@mui/material';
import { fetchPostJSON } from 'src/utils/api-helpers';
import { FieldArray, Form, Formik, getIn } from 'formik';
import { useBookingContext } from 'src/contexts/Booking-context';
import * as Yup from 'yup';
import SelectCountry from 'src/components/Form/Select-country';
import stringifyNumber from 'src/utils/stringify-number';
import styled from '@emotion/styled';
import getStripe from 'src/utils/get-stripejs';

const Wrapper = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 24px;
    width: 100%;
`;

const StyledButton = styled(Button)`
    margin-bottom: 24px;
    min-width: 40%;
    height: 50px;
`;

const StyledInputLabel = styled(InputLabel)`
    margin-bottom: 12px;
`;

const StyledSelectCountry = styled(SelectCountry)`
    margin-bottom: 24px;
    margin-right: 10px;
    width: 100%;

    &.select-residence {
        margin-right: 0px;
    }
`;

const PhoneNumberWrapper = styled('div')`
    display: flex;
`;

const validationSchema = Yup.object().shape({
    email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    guests: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
        })
    ),
    email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    countryCode: Yup.object().shape({
        code: Yup.string().required('Country is required'),
        title: Yup.string().required('Country is required'),
        countryCallingCode: Yup.string().required('Country is required'),
    }),
    telephone: Yup.string('Telephone number is required')
        .min(3, 'This is not a valid number')
        .required('Telephone number is required'),
    countryOfResidence: Yup.object().shape({
        code: Yup.string().required('Country is required'),
        title: Yup.string().required('Country is required'),
        countryCallingCode: Yup.string().required('Country is required'),
    }),
    state: Yup.string(),
    city: Yup.string('City is required').required('City is required'),
    address: Yup.string('Address is required').required('Address is required'),
    postalCode: Yup.string('A zip or postal code is required').required(
        'A zip or postal code is required'
    ),
});

const customErrorMessage =
    'Something went wrong, start the booking over or contact us for more information';

const MyForm = ({ data, ...rest }) => {
    const { bookingRequestData } = useBookingContext();
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initialValues = {
        guests: [{ firstName: '', lastName: 'pandzic' }],
        email: 'admin@thehuthut.com',
        countryCode: {
            code: '46',
            title: 'sweden',
            countryCallingCode: 'SWE',
        },
        telephone: '709710844',
        countryOfResidence: {
            code: '46',
            title: 'sweden',
            countryCallingCode: 'SWE',
        },
        state: 'Vastra gotaland',
        city: 'Gothenburg',
        address: 'Solventilsgatan',
        postalCode: '41708',
    };

    // eslint-disable-next-line require-await
    const handleSubmit = async (values) => {
        setLoading(true);

        const checkoutSession = await fetchPostJSON('/api/checkout_sessions', {
            user: values,
            bookingRequestData,
        });

        if (checkoutSession.statusCode === 500) {
            console.error(checkoutSession.message);
            setError(customErrorMessage);
            setLoading(false);
            return;
        }

        const sessionStorageArr = [
            {
                bookingRequestData,
                values,
                id: checkoutSession.id,
                paymentIntent: checkoutSession.paymentIntent,
            },
        ];

        sessionStorage.setItem('user-data', JSON.stringify(sessionStorageArr));

        // Redirect to Checkout.
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: checkoutSession.id,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.

        if (error) {
            console.warn(error.message);
            setError(customErrorMessage);
        }

        setLoading(false);
    };

    return (
        <Wrapper {...rest}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, touched, handleChange, setFieldValue, errors }) => (
                    <Form
                        style={{
                            width: '50vw',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <FieldArray name="guests">
                            {({ push, remove }) => (
                                <div>
                                    {values.guests.map((g, index) => {
                                        const firstName = `guests[${index}].firstName`;
                                        const touchedFirstName = getIn(touched, firstName);
                                        const errorFirstName = getIn(errors, firstName);

                                        const lastName = `guests[${index}].lastName`;
                                        const touchedLastName = getIn(touched, lastName);
                                        const errorLastName = getIn(errors, lastName);

                                        return (
                                            <div key={index}>
                                                <StyledInputLabel>{`Guest ${
                                                    index + 1
                                                }`}</StyledInputLabel>
                                                <StyledTextField
                                                    fullWidth
                                                    id="firstName"
                                                    label="First name *"
                                                    name={firstName}
                                                    value={g.firstName}
                                                    error={
                                                        touchedFirstName && Boolean(errorFirstName)
                                                    }
                                                    helperText={touchedFirstName && errorFirstName}
                                                    onChange={handleChange}
                                                />
                                                <StyledTextField
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last name *"
                                                    name={lastName}
                                                    value={g.lastName}
                                                    error={
                                                        touchedLastName && Boolean(errorLastName)
                                                    }
                                                    helperText={touchedLastName && errorLastName}
                                                    onChange={handleChange}
                                                />
                                                {index > 0 && index === count - 1 && (
                                                    <StyledButton
                                                        variant="outlined"
                                                        onClick={() => {
                                                            remove(index);
                                                            setCount(count - 1);
                                                        }}
                                                    >{`Remove ${stringifyNumber(
                                                        index + 1
                                                    )} guest `}</StyledButton>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {count < bookingRequestData.guests && (
                                        <StyledButton
                                            variant="outlined"
                                            onClick={() => {
                                                push({ firstName: '', lastName: '' });
                                                setCount(count + 1);
                                            }}
                                        >{`Add ${stringifyNumber(count + 1)} guest`}</StyledButton>
                                    )}
                                </div>
                            )}
                        </FieldArray>
                        <StyledTextField
                            fullWidth
                            id="email"
                            name="email"
                            label="email *"
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            onChange={handleChange}
                        />
                        <PhoneNumberWrapper>
                            <StyledSelectCountry
                                error={
                                    touched.countryCode?.title && Boolean(errors.countryCode?.title)
                                }
                                helperText={touched.countryCode?.title && errors.countryCode?.title}
                                onChange={(e, value) => {
                                    setFieldValue('countryCode', value !== null ? value : null);
                                }}
                            />
                            <StyledTextField
                                fullWidth
                                id="telephone"
                                name="telephone"
                                label="Telephone *"
                                value={values.telephone}
                                error={touched.telephone && Boolean(errors.telephone)}
                                helperText={touched.telephone && errors.telephone}
                                onChange={handleChange}
                            />
                        </PhoneNumberWrapper>
                        <PhoneNumberWrapper>
                            <StyledSelectCountry
                                onlyCountry
                                className="select-residence"
                                error={
                                    touched.countryOfResidence?.title &&
                                    Boolean(errors.countryOfResidence?.title)
                                }
                                helperText={
                                    touched.countryOfResidence?.title &&
                                    errors.countryOfResidence?.title
                                }
                                onChange={(e, value) => {
                                    setFieldValue(
                                        'countryOfResidence',
                                        value !== null ? value : null
                                    );
                                }}
                            />
                        </PhoneNumberWrapper>
                        <StyledTextField
                            fullWidth
                            id="state"
                            name="state"
                            label="State"
                            value={values.state}
                            error={touched.state && Boolean(errors.state)}
                            helperText={touched.state && errors.state}
                            onChange={handleChange}
                        />
                        <StyledTextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City *"
                            value={values.city}
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                            onChange={handleChange}
                        />
                        <StyledTextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address *"
                            value={values.address}
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                            onChange={handleChange}
                        />
                        <StyledTextField
                            fullWidth
                            id="postalCode"
                            name="postalCode"
                            label="Zip or postal code *"
                            value={values.postalCode}
                            error={touched.postalCode && Boolean(errors.postalCode)}
                            helperText={touched.postalCode && errors.postalCode}
                            onChange={handleChange}
                        />
                        <div>
                            <StyledButton variant="outlined" type="submit">
                                {loading && <CircularProgress size={20} />}
                                {!loading && 'PAY'}
                            </StyledButton>
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default MyForm;
