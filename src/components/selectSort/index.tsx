import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { t } from 'i18next';

interface Iprops {
  sort: string;
  setSort: (val: string) => void;
}
export default function SelectSort({ sort, setSort }: Iprops) {
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{display:"flex",flexDirection:"row", gap:2 ,justifyContent:"space-between",alignItems:"center"}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${sort}`}
          onChange={handleChange}
          sx={{
            '.MuiSelect-select': {
              lineHeight: 1.1, // Match default height for MUI TextField
              width: 'fit-content',
            },
          }}
        >
          {['asc', 'desc'].map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item ==='asc' ? t("asc") :t('desc')}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      
    </Box>
  );
}
