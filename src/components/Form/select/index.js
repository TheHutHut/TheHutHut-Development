import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectAutoWidth({
    labelText,
    parentFunc,
    items,
    initialValue = '',
    helpText,
}) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        parentFunc(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 190 }}>
            <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={labelText}
                onChange={handleChange}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    );
                })}
            </Select>
            {helpText && <FormHelperText>{helpText}</FormHelperText>}
        </FormControl>
    );
}
