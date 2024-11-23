import { Box, Typography } from '@mui/material';
import AddCourseLectuerForm from 'components/AddCourseLectuerForm';
import React from 'react';
import { useParams } from 'react-router-dom';

function AddCourseLectuerPage() {
    const {id}= useParams()
    console.log(typeof(id))
  return (
    <>
      <Typography variant="h1" color="initial">
        Add Course Lecuter Page
      </Typography>
      <Box sx={{width:"50%"}}>
          <AddCourseLectuerForm vid={id} />
      </Box>
    
    </>
  );
}

export default AddCourseLectuerPage;
