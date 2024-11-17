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
  // interface IFormInput {
  //   name["en"]: string;
  //   name["ar"]: string;
  //   image: string;
  //   price: string;
  // }
  
  function AddCategoryForm({handleClose ,refetch}:{handleClose: () => void; refetch:()=>void} ) {
    const { register, handleSubmit } = useForm<IFormInput>();
  
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      console.log(data)
      try {
        // Create a FormData object and append the data
        const formData = new FormData();
        formData.append('name[en]', data.name.en);
        formData.append('name[ar]', data.name.ar);
        formData.append('image', data.image[0]);
        formData.append('description[en]', data.description.en);
        formData.append('description[ar]', data.description.ar);

    
        // Define headers with the token
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        };
    
        const response = await axios.post(
          'https://market-mentor.flexi-code.com/public/api/admin/categories',
          formData,
          { headers }
        );
         console.log(formData);
        console.log(response.data);
        toast.success('category added successfully');
        handleClose()
        refetch()
    
      } catch (err) {
        console.error('Error signing in:', err);
        toast.error('Failed to add category, please check your input.');
        
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
              id="desc.en"
              type="text"
              label="description.en"
              {...register('description.en', { required: 'desc.en is required' })}
            />


            <TextField
              fullWidth
              variant="outlined"
              id="image"
              type="file"
              label="Image"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: 'image/*' }}
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
      </>
    );
  }
  
  export default AddCategoryForm;
  