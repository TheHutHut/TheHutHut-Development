const getYearMonthDay = (date) => {
    // eslint-disable-next-line prefer-const
    let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
    month = `0${month}`.slice(-2);
    day = `0${day}`.slice(-2);

    const yearMontDay = `${year}-${month}-${day}`;

    return yearMontDay;
};

const calculateTotalOfNights = (from, to) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(from);
    const secondDate = new Date(to);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return diffDays;
};

const formatDateDayMonthYear = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
};

const calculateAllNightsOccupied = (start, end) => {
    const arr = new Array(),
        dt = new Date(start);

    while (dt < new Date(end)) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
};

export {
    getYearMonthDay,
    calculateTotalOfNights,
    formatDateDayMonthYear,
    calculateAllNightsOccupied,
};
