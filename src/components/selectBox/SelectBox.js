import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({
    label = 'Label',
    fullWidth = false,
    data,
    keyName,
    valueName,
    onChange,
    defaultValue
 } = {
}) {

    const [value, setValue] = React.useState(defaultValue || '')
    
    const handleOnChangeSetValue = (e)=>{
        const currvalue = e.target.value
        setValue(currvalue);
        if(onChange) onChange(currvalue);
    }

    return (
        <div>
            <FormControl
            className='!m-0'
            fullWidth={fullWidth} 
            variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleOnChangeSetValue}
                    label={label}
                >
                    {data.map((item, index) => (
                        <MenuItem key={index} value={item[keyName]}>
                            {item[valueName]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
        </div>
    );
}
