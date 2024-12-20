import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface IFormInput {
  name: {
    en: string;
    ar: string;
    fr: string;
  };
  description: {
    en: string;
    ar: string;
    fr: string;
  };
  image: FileList;
}

function AddCategoryForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [fileName, setFileName] = useState<string | null>(null); // State to hold file name
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name[en]', data.name.en);
      formData.append('name[ar]', data.name.ar);
      formData.append('name[fr]', data.name.fr);
      formData.append('description[en]', data.description.en);
      formData.append('description[ar]', data.description.ar);
      formData.append('description[fr]', data.description.fr);
      formData.append('image', data.image[0]);

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
          label={t("ArabicName")}
          error={!!errors.name?.ar}
          helperText={errors.name?.ar?.message}
          {...register('name.ar', { required: t("ArabicNameReq") })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="names.en"
          type="text"
          label={t("EnglishName")}
          error={!!errors.name?.en}
          helperText={errors.name?.en?.message}
          {...register('name.en', { required: t("EnglishNameReq") })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="names.fr"
          type="text"
          label="fr name"
          error={!!errors.name?.fr}
          helperText={errors.name?.fr?.message}
          {...register('name.fr', { required: "fr name is requried" })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="description.ar"
          type="text"
          label={t("descAr")}
          error={!!errors.description?.ar}
          helperText={errors.description?.ar?.message}
          {...register('description.ar', { required: t("descArReq")  })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="description.en"
          type="text"
          label={t("descEn")}
          error={!!errors.description?.en}
          helperText={errors.description?.en?.message}
          {...register('description.en', { required: t("descEnReq")   })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="description.fr"
          type="text"
          label="fr desc"
          error={!!errors.description?.fr}
          helperText={errors.description?.fr?.message}
          {...register('description.fr', { required: "fr desc is required"   })}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="image"
          type="file"
          label={t("image")}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: 'image/*' }}
          error={!!errors.image}
          helperText={errors.image?.message || (fileName ? `Selected file: ${fileName}` : '')}
          {...register('image', {
            required: t("imageReq"),
            onChange: (e) => setFileName(e.target.files?.[0]?.name || null), // Update file name on change
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
        {t("AddCategory")}
      </Button>
    </Box>
  );
}

export default AddCategoryForm;
