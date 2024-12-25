import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Iprops {
  perPage: number;
  setPerPage: (val: number) => void;
}
export default function SelectPerPage({ perPage, setPerPage }: Iprops) {
  const handleChange = (event: SelectChangeEvent) => {
    setPerPage(+event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">page Count</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${perPage}`}
          label="page Count"
          onChange={handleChange}
          sx={{
            '.MuiSelect-select': {
              lineHeight: 0, // Match default height for MUI TextField
              width: 'fit-content',
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
