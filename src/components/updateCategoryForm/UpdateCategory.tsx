import { Box, Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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

function UpdateCategoryForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | {
    id: number;
    //   name: { en: string; ar: string };
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;

    image: FileList;
  };
}) {
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const { t } = useTranslation();
  useEffect(() => {
    console.log(initialData?.image);
    if (initialData) {
      setValue('name.en', initialData.nameEn);
      setValue('name.ar', initialData.nameAr);
      setValue('description.en', initialData.descriptionEn);

      setValue('description.ar', initialData.descriptionAr);

      // Since `image` is a FileList, ensure it's correctly passed when uploading
      if (initialData.image && initialData.image.length > 0) {
        setValue('image', initialData.image);
      }
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      // Create a FormData object and append the data
      const formData = new FormData();
      formData.append('name[en]', data.name.en);
      formData.append('name[ar]', data.name.ar);

      // Check if a new image is selected
      if (data.image.length > 0) {
        formData.append('image', data.image[0]); // Access the first file in the FileList
      } else if (initialData?.image && initialData.image.length > 0) {
        // Use the existing image from `initialData`
        formData.append('image', initialData.image[0]); // Existing image
      } // Access the first file in the FileList
      
      formData.append('description[en]', data.description.en);
      formData.append('description[ar]', data.description.ar);

      // Define headers with the token
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        `https://market-mentor.flexi-code.com/public/api/admin/categories/${initialData?.id}/update`,
        formData,
        { headers },
      );

      console.log(response.data);
      toast.success('Category updated successfully');
      refetch();
      handleClose();
    } catch (err) {
      console.error('Error updating package:', err);
      toast.error('Failed to update package, please check your input.');
    }
  };

  return (
    <>
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
            label="names.ar"
            {...register('name.ar', { required: 'names.ar is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="names.en"
            type="text"
            label="names.en"
            {...register('name.en', { required: 'names.en is required' })}
          />

          <TextField
            fullWidth
            variant="outlined"
            id="description.ar"
            type="text"
            label="description.ar"
            {...register('description.ar', { required: 'description.ar is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="description.en"
            type="text"
            label="description.en"
            {...register('description.en', { required: 'description.en is required' })}
          />

          <TextField
            fullWidth
            variant="outlined"
            id="image"
            type="file"
            label="Image"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: 'image/*' }}
            {...register('image')}
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
          {t("updateCategory")}
        </Button>
      </Box>
    </>
  );
}

export default UpdateCategoryForm;
