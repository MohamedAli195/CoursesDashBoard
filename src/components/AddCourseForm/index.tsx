import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { fetchCategories } from 'pages/categories/categoriesFunct';
import { fetchPackages } from 'pages/packages/packagesFunct';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

interface IFormInput {
  name: {
    en: string;
    ar: string;
  };
  image: FileList;
  price: string;
  main_video: string;
  course_duration: string;
  course_level: string;
  course_lang: string;
  price_after_discount: string;
  package_id: number;
  category_id: number;
  description: {
    en: string;
    ar: string;
  };
}

interface IPackageRes {
  code: number;
  data: {
    id: number;
    image: string;
    name: { ar: string; en: string; fr: string };
    price: string;
    status: string;
  }[];
}

function AddCourseForm() {
  const [categories, setCategories] = useState<IPackageRes>({
    code: 0,
    data: [],
  });

  const [packages, setPackages] = useState<IPackageRes>({
    code: 0,
    data: [],
  });

  const [fileName, setFileName] = useState<string | null>(null); // State to store the selected file name

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const loadPackages = async () => {
      try {
        const packageData = await fetchPackages();
        setPackages(packageData);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    loadCategories();
    loadPackages();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name[en]', data.name.en);
      formData.append('name[ar]', data.name.ar);
      formData.append('image', data.image[0]);
      formData.append('price', data.price);
      formData.append('main_video', data.main_video);
      formData.append('course_duration', data.course_duration);
      formData.append('course_level', data.course_level);
      formData.append('course_lang', data.course_lang);
      formData.append('price_after_discount', data.price_after_discount);
      formData.append('package_id', data.package_id.toString());
      formData.append('category_id', data.category_id.toString());
      formData.append('description[en]', data.description.en);
      formData.append('description[ar]', data.description.ar);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/courses',
        formData,
        { headers }
      );

      toast.success('Course added successfully');
    } catch (err) {
      console.error('Error adding course:', err);
      toast.error('Failed to add course, please check your input.');
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: { sm: 5, xs: 2.5 },width:"50%"
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          {/* Name Fields */}
          <TextField
            fullWidth
            variant="outlined"
            label="Arabic Name"
            error={!!errors.name?.ar}
            helperText={errors.name?.ar?.message}
            {...register('name.ar', { required: 'Arabic name is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="English Name"
            error={!!errors.name?.en}
            helperText={errors.name?.en?.message}
            {...register('name.en', { required: 'English name is required' })}
          />

          {/* Description Fields */}
          <TextField
            fullWidth
            variant="outlined"
            label="Arabic Description"
            error={!!errors.description?.ar}
            helperText={errors.description?.ar?.message}
            {...register('description.ar', {
              required: 'Arabic description is required',
            })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="English Description"
            error={!!errors.description?.en}
            helperText={errors.description?.en?.message}
            {...register('description.en', {
              required: 'English description is required',
            })}
          />

          {/* Image Upload */}
          <TextField
            fullWidth
            variant="outlined"
            type="file"
            label="Image"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: 'image/*' }}
            error={!!errors.image}
            helperText={errors.image?.message || (fileName ? `Selected file: ${fileName}` : '')}
            {...register('image', {
              required: 'Image is required',
              onChange: (e) =>
                setFileName(e.target.files?.[0]?.name || 'No file selected'),
            })}
          />

          {/* Other Inputs */}
          <TextField
            fullWidth
            variant="outlined"
            label="Price"
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register('price', { required: 'Price is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Main Video URL"
            error={!!errors.main_video}
            helperText={errors.main_video?.message}
            {...register('main_video', { required: 'Main video URL is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Course Duration"
            error={!!errors.course_duration}
            helperText={errors.course_duration?.message}
            {...register('course_duration', {
              required: 'Course duration is required',
            })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Course Level"
            error={!!errors.course_level}
            helperText={errors.course_level?.message}
            {...register('course_level', { required: 'Course level is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Course Language"
            error={!!errors.course_lang}
            helperText={errors.course_lang?.message}
            {...register('course_lang', { required: 'Course language is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Price After Discount"
            error={!!errors.price_after_discount}
            helperText={errors.price_after_discount?.message}
            {...register('price_after_discount', {
              required: 'Price after discount is required',
            })}
          />
          <TextField
         
            select
            fullWidth
            variant="outlined"
            label="Package"
            error={!!errors.package_id}
            helperText={errors.package_id?.message}
            {...register('package_id', { required: 'Package is required' })}
            sx={{
              '.MuiOutlinedInput-root': {
                height: 56, // Match default height for MUI TextField
              },
            }}
          >
            {packages.data.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.name.en}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            variant="outlined"
            label="Category"
            error={!!errors.category_id}
            helperText={errors.category_id?.message}
            {...register('category_id', { required: 'Category is required' })}
            sx={{
              '.MuiOutlinedInput-root': {
                height: 56, // Match default height for MUI TextField
              },
            }}
          >
            {categories.data.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name.en}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{ mt: 3, fontSize: '18px' }}
        >
          Add Course
        </Button>
      </Box>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default AddCourseForm;
