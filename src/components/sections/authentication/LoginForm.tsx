import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import paths from './../../../routes/path';
import { redirect } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {

  /**States */
  const navigate = useNavigate();
  const {pathname}= useLocation()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<IFormInput>();
  const url = import.meta.env.VITE_API_URL;
  /**Handlers */
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        `${url}/admin/login`,
        data
      );
  
      // console.log('Token:', response.data.token); // Check if token exists
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Sign-in successful, redirecting to dashboard...');
          // Redirect to dashboard or home page
      navigate('/');
      
      // Refresh the page after navigating
      
        window.location.reload();
   
        
        // <Navigate to="/"  />
      } else {
        setError('Login was successful, but no token was returned.');
      }
  
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      // console.log(err.response || err); // Logs the actual error for debugging
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
            id="email"
            type="text"
            label="Email"
            {...register('email', { required: 'Email is required' })}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...register('password', { required: 'Password is required' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <IconifyIcon icon="el:eye-close" color="action.active" />
                    ) : (
                      <IconifyIcon icon="el:eye-open" color="action.focus" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )}

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{ mt: 3, fontSize: '18px' }}
        >
          Sign In
        </Button>
      </Box>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default LoginForm;
