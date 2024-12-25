import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface SearchFormInputs {
  query: string;
}
interface IProps {

  setsearch:(val:string)=>void

}
const SearchForm= ({setsearch}:IProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>();

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    setsearch( data.query);
    // Add your search logic here
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      noValidate 
      sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
    >
      <label>search</label>
      <TextField
        variant="outlined"
        {...register('query', { required: 'Search query is required' })}
        error={!!errors.query}
        helperText={errors.query?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
