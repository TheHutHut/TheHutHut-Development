import { calculateAllNightsOccupied, calculateTotalOfNights } from 'src/utils/format-date';
import { collectionNameReservedDates } from 'src/db-firebase/utils/collection-names';
import { getCollection } from 'src/db-firebase/utils/get';
import { Timestamp } from 'firebase/firestore';
import calculateMinimumAmountOfRooms from 'src/utils/calculate-minimum-amount-of-rooms';

const CheckAvailabilityDb = async (start, end, guests, roomsData) => {
    const dates = calculateAllNightsOccupied(start, end);
    const nights = calculateTotalOfNights(start, end);
    let capacity = 0;

    // Create array filled with dates as timestamps
    const datesAsTimestamps = [];
    for (let i = 0; i < dates.length; i++) {
        const d = dates[i];
        const date = Timestamp.fromDate(d);
        datesAsTimestamps.push(date.seconds);
    }

    // Fetch all nights occupied from DB
    const response = await getCollection(collectionNameReservedDates);

    // Check if room is already occupied over the chosen dates
    const occupiedRooms = [];
    for (let i = 0; i < response.length; i++) {
        const exists = response[i].dates.some((r) => {
            const date = Timestamp.fromDate(new Date(r));
            return datesAsTimestamps.includes(date.seconds);
        });

        if (exists) {
            occupiedRooms.push(response[i].id);
        }
    }

    // add new information to room data based on input and availability
    const test = roomsData
        .filter((room) => {
            const availableRooms = room.fields.roomsId.filter((r) => !occupiedRooms.includes(r));
            return availableRooms.length > 0;
        })
        .map((room) => {
            const roomData = room.fields;

            const available_rooms_id = roomData.roomsId.filter((id) => !occupiedRooms.includes(id));

            const available_rooms = available_rooms_id.length;

            const setTheAmountOfRoomsVisitorCanChoose =
                available_rooms_id.length > guests ? guests : available_rooms_id.length;
            const select_items_arr = Array.from(
                Array(setTheAmountOfRoomsVisitorCanChoose + 1).keys()
            );

            capacity = available_rooms_id.length * roomData.maximumOccupancy + capacity;

            return {
                title: roomData.title,
                guests,
                available_rooms_id,
                available_rooms,
                select_items_arr,
                minimum_order_quantity: calculateMinimumAmountOfRooms(
                    guests,
                    roomData.maximumOccupancy
                ),
                maximum_occupancy_per_room: roomData.maximumOccupancy,
                order_quantity: 0,
                bedding: roomData.bedding,
                check_in: roomData.checkInTime,
                check_out: roomData.checkOutTime,
                details: roomData.details,
                images: roomData.images,
                size: roomData.size,
                stripe_id: roomData.stripeId,
                information_text: roomData.text,
                price: roomData.price,
            };
        });

    // If the capacity exceeds the number of guests return the data
    if (capacity >= guests) {
        return {
            end_date: end,
            start_date: start,
            nights,
            guests,
            dates,
            rooms: test,
        };
    }
    return null;
};

export { CheckAvailabilityDb };
