import React, { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IFormInput {
  name: {
    en: string;
    ar: string;
  };
  image: FileList;
  price: string;
}

function AddPackageForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
  const [fileName, setFileName] = useState<string | null>(null); // State to store the selected file name

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // Create a FormData object and append the data
      const formData = new FormData();
      formData.append('name[en]', data.name.en);
      formData.append('name[ar]', data.name.ar);
      formData.append('image', data.image[0]);
      formData.append('price', data.price);

      // Define headers with the token
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/packages',
        formData,
        { headers }
      );

      toast.success('Package added successfully');
      handleClose();
      refetch();
    } catch (err) {
      console.error('Error signing in:', err);
      toast.error('Failed to add package, please check your input.');
    }
  };

  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <TextField
          fullWidth
          variant="outlined"
          id="names.ar"
          type="text"
          label="Arabic Name"
          error={!!errors.name?.ar}
          helperText={errors.name?.ar?.message}
          {...register('name.ar', { required: 'Arabic name is required' })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="names.en"
          type="text"
          label="English Name"
          error={!!errors.name?.en}
          helperText={errors.name?.en?.message}
          {...register('name.en', { required: 'English name is required' })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="price"
          type="text"
          label="Price"
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register('price', {
            required: 'Price is required',
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: 'Enter a valid price (e.g., 12.34)',
            },
          })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="image"
          type="file"
          label="Image"
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: 'image/*' }}
          error={!!errors.image}
          helperText={
            errors.image?.message || (fileName ? `Selected file: ${fileName}` : '')
          }
          {...register('image', {
            required: 'Image is required',
            onChange: (e) =>
              setFileName(e.target.files?.[0]?.name || 'No file selected'),
          })}
        />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 3, fontSize: '18px' }}
      >
        Add Package
      </Button>
    </Box>
  );
}

export default AddPackageForm;
