import {
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IFormInput {
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: FileList;
}

function AddCategoryForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
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
      formData.append('description[en]', data.description.en);
      formData.append('description[ar]', data.description.ar);
      formData.append('image', data.image[0]);

      // Define headers with the token
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/categories',
        formData,
        { headers }
      );

      console.log(response.data);
      toast.success('Category added successfully');
      handleClose();
      refetch();
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to add category, please check your input.');
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
          id="description.ar"
          type="text"
          label="Arabic Description"
          error={!!errors.description?.ar}
          helperText={errors.description?.ar?.message}
          {...register('description.ar', { required: 'Arabic description is required' })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="description.en"
          type="text"
          label="English Description"
          error={!!errors.description?.en}
          helperText={errors.description?.en?.message}
          {...register('description.en', { required: 'English description is required' })}
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
          helperText={errors.image?.message}
          {...register('image', { required: 'Image is required' })}
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
        Add Category
      </Button>
    </Box>
  );
}

export default AddCategoryForm;
