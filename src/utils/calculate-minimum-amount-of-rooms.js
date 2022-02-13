const calculateMinimumAmountOfRooms = (guests, occupancy) => {
    return Math.round(guests / occupancy);
};

export default calculateMinimumAmountOfRooms;
