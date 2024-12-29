import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Search } from 'lucide-react';
import InputAdornment from '@mui/material/InputAdornment';
import i18n from 'i18n';
import { FormControl } from '@mui/material';

interface SearchFormInputs {
  query: string;
}

interface IProps {
  setsearch: (val: string) => void;
}

const SearchForm = ({ setsearch }: IProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>();

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    setsearch(data.query);
    // Add your search logic here
  };

  const isArabic = i18n.language === 'ar';

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', gap: 2, alignItems: 'center', m: 2 }}
    >
      <FormControl >
        <TextField
          variant="outlined"
          {...register('query', { required: 'Search query is required' })}
          error={!!errors.query}
          helperText={errors.query?.message}
          placeholder={isArabic ? 'البحث فى الجدول' : 'Search In Table'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{width:"500px"}}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
