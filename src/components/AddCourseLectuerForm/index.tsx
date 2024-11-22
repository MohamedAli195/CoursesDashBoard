import {
  Box,
  Button,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';
import { fetchCategories } from 'pages/categories/categoriesFunct';
import { fetchPackages } from 'pages/packages/packagesFunct';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

interface IFormInput {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  course_id: string | undefined;
  video_url: string;
  duration: string;
}

function AddCourseLectuerForm({ vid }: { vid: string | undefined }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('title[en]', data.title.en);
      formData.append('title[ar]', data.title.ar);
      formData.append('description[en]', data.description?.en);
      formData.append('description[ar]', data.description?.ar);
      formData.append('video_url', data.video_url);
      formData.append('duration', data.duration);
      formData.append('course_id', vid || ''); // Ensure course_id is included

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/course-lectures',
        formData,
        { headers },
      );

      console.log(response.data);
      toast.success('course lectuer added successfully');
    } catch (err) {
      console.error('Error adding course lectuer:', err);
      toast.error('Failed to add course lectuer, please check your input.');
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
          {/* Arabic Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Arabic Name"
            error={!!errors.title?.ar}
            helperText={errors.title?.ar?.message}
            {...register('title.ar', { required: 'Arabic title is required' })}
          />

          {/* English Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="English Name"
            error={!!errors.title?.en}
            helperText={errors.title?.en?.message}
            {...register('title.en', { required: 'English title is required' })}
          />

          {/* description Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Arabic description"
            error={!!errors.description?.ar}
            helperText={errors.description?.ar?.message}
            {...register('description.ar', { required: 'Arabic description is required' })}
          />

          {/* description En */}
          <TextField
            fullWidth
            variant="outlined"
            label="English description"
            error={!!errors.description?.en}
            helperText={errors.description?.en?.message}
            {...register('description.en', { required: 'English description is required' })}
          />

          {/* Other Fields */}
          <TextField
            fullWidth
            variant="outlined"
            label="video url"
            error={!!errors.video_url}
            helperText={errors.video_url?.message}
            {...register('video_url', { required: 'video url is required' })}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="video Duration"
            error={!!errors.duration}
            helperText={errors.duration?.message}
            {...register('duration', {
              required: 'video duration is required',
            })}
          />

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
        </Stack>
      </Box>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default AddCourseLectuerForm;
