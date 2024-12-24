import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IProps {
  pageCounter: number; // Total number of pages
  setPage: (newPage: number) => void; // Function to set the current page
  page: number; // Current page
}

export default function PaginationComponent({ page, pageCounter, setPage }: IProps) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // Call the setPage function with the new page value
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCounter}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handlePageChange} // Handle page changes here
      />
    </Stack>
  );
}
