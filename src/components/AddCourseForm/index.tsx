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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInput>();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData); // Should be an object matching IPackageRes
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const loadPackages = async () => {
      try {
        const packageData = await fetchPackages();
        setPackages(packageData); // Should be an object matching IPackageRes
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    

    loadCategories();
    loadPackages();
  }, []);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
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
      formData.append('description[en]', data.description?.en);
      formData.append('description[ar]', data.description?.ar);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        'https://market-mentor.flexi-code.com/public/api/admin/courses',
        formData,
        { headers },
      );

      console.log(response.data);
      toast.success('course added successfully');
    } catch (err) {
      console.error('Error adding course:', err);
      toast.error('Failed to add course, please check your input.');
    }
  };

  // console.log(packages)
  // console.log(categories)
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
            error={!!errors.name?.ar}
            helperText={errors.name?.ar?.message}
            {...register('name.ar', { required: 'Arabic name is required' })}
          />

          {/* English Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="English Name"
            error={!!errors.name?.en}
            helperText={errors.name?.en?.message}
            {...register('name.en', { required: 'English name is required' })}
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

          {/* Price */}
          <TextField
            fullWidth
            variant="outlined"
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

          {/* Category */}
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              {...register('category_id', { required: true })}
              onChange={(e) => setValue('category_id', Number(e.target.value))}
              value={watch('category_id') || ''}
            >
              {/* <MenuItem value={10}>Female</MenuItem>
              <MenuItem value={20}>Male</MenuItem>
              <MenuItem value={30}>Other</MenuItem> */}
              {categories.data &&
                categories.data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name.en}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Package */}
          <FormControl fullWidth>
            <InputLabel id="package-label">Package</InputLabel>
            <Select
              labelId="package-label"
              {...register('package_id', { required: true })}
              onChange={(e) => setValue('package_id', Number(e.target.value))}
              value={watch('package_id') || ''}
            >
              {/* <MenuItem value={1}>Basic</MenuItem>
              <MenuItem value={2}>Standard</MenuItem>
              <MenuItem value={3}>Premium</MenuItem> */}
              {packages.data &&
                packages.data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name.en}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Other Fields */}
          <TextField
            fullWidth
            variant="outlined"
            label="Main Video"
            error={!!errors.main_video}
            helperText={errors.main_video?.message}
            {...register('main_video', { required: 'Main video is required' })}
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

          {/* Image Upload */}
          <TextField
            fullWidth
            variant="outlined"
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
          Add Package
        </Button>
      </Box>
      
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default AddCourseForm;

