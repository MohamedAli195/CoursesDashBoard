import { Box, Button, Stack, Typography, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';

function PackagesPageSkeleton() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
  
  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </Stack>
      <Paper sx={{ width: '100%', p: 2 }}>
        <Stack flexDirection={'row'} alignItems={'center'} gap={2} mb={2}>
          <Skeleton variant="rectangular" width={100} height={40} />
          <Skeleton variant="rectangular" width={200} height={40} />
        </Stack>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ marginTop: 2, mx: 2 }}>
          <Skeleton variant="rectangular" width={150} height={40} />
          <Skeleton variant="rectangular" width={100} height={40} />
        </Stack>
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PackagesPageSkeleton;
