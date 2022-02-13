import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectAutoWidth({ parentFunc, roomsData }) {
    const [amountOfAdults, setAmountOfAdults] = useState('');

    const handleChange = (event) => {
        setAmountOfAdults(event.target.value);
        parentFunc(event.target.value);
    };

    let count = 0;
    for (let i = 0; i < roomsData.length; i++) {
        count = count + roomsData[i].fields.roomsId.length;
    }

    const arr = Array.from(Array(Math.max(count) * 2).keys());

    return (
        <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }}>
            <InputLabel id="demo-simple-select-label">Adults</InputLabel>
            <Select
                sx={{ minWidth: 180 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={amountOfAdults}
                label="Adults"
                MenuProps={{ PaperProps: { sx: { maxHeight: 275 } } }}
                onChange={handleChange}
            >
                {arr.map((number, index) => {
                    const amount = number + 1;
                    return (
                        <MenuItem key={index} value={amount}>
                            {amount}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
