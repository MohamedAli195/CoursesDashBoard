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
    image: FileList;
    price: string;
  }
  // interface IFormInput {
  //   name["en"]: string;
  //   name["ar"]: string;
  //   image: string;
  //   price: string;
  // }
  
  function AddPackageForm({handleClose ,refetch}:{handleClose: () => void; refetch:()=>void} ) {
    const { register, handleSubmit } = useForm<IFormInput>();
  
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      console.log(data)
      try {
        // Create a FormData object and append the data
        const formData = new FormData();
        formData.append('name[en]', data.name.en);
        formData.append('name[ar]', data.name.ar);
        formData.append('image', data.image[0]);
        formData.append('price', data.price);
    
        // Define headers with the token
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        };
    
        const response = await axios.post(
          'https://market-mentor.flexi-code.com/public/api/admin/packages',
          formData,
          { headers }
        );
    
        console.log(response.data);
        toast.success('Package added successfully');
        handleClose()
        refetch()
    
      } catch (err) {
        console.error('Error signing in:', err);
        toast.error('Failed to add package, please check your input.');
        
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
              id="price"
              type="text"
              label="Price"
              {...register('price', { required: 'Price is required' })}
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
            Add Package
          </Button>
        </Box>
      </>
    );
  }
  
  export default AddPackageForm;
  