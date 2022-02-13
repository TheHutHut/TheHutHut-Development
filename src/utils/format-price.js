const formatPrice = (numberString) => numberString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const convertCentsToDollar = (number) => {
    return number / 100;
};

const calculateTotalPricePerRoom = (price, days) => {
    let totalPrice = price;

    for (let i = 0; i < days; i++) {
        totalPrice = totalPrice + price;
    }

    return totalPrice;
};

const calculateTotalPrice = (price, days, rooms) => {
    let totalPrice = 0;
    const newPrice = price * rooms;

    for (let i = 0; i < days; i++) {
        totalPrice = totalPrice + newPrice;
    }

    return totalPrice;
};

const centsToDollarString = (price, style, currency) => {
    const priceInDollar = price / 100;
    return priceInDollar.toLocaleString('en-US', { style, currency });
};

export {
    formatPrice,
    convertCentsToDollar,
    calculateTotalPricePerRoom,
    calculateTotalPrice,
    centsToDollarString,
};
