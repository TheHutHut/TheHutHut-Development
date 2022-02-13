import { createContext, useContext, useState } from 'react';
// import BookingContext from 'src/contexts/BookingContext';

const Context = createContext({});

const CountProvider = ({ children }) => {
    const [bookingRequestData, setBookingRequestData] = useState(null);

    return (
        <Context.Provider
            value={{
                bookingRequestData,
                setBookingRequestData,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default CountProvider;

// eslint-disable-next-line func-style
export function useBookingContext() {
    return useContext(Context);
}
