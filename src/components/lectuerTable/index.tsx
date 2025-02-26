import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { IPackageLectuerSelected } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/Shared/pagination';
import DeleteModal from 'components/deleteModal';
import { deleteAnyThing, fetchLectuers } from 'functions';
import SearchForm from 'components/Shared/searchForm';
import SelectPerPage from 'components/Shared/selectPerPAge';
import SelectSort from 'components/Shared/selectSort';
import LectuerTables from './LectuersTable';
import BasicModal from 'components/Shared/modal/ShareModal';
import UpdateCategoryForm from 'components/Category/updateCategoryForm/UpdateCategory';
import UpdateLectuerForm from 'components/CourseLectuers/updateLectuerForm';

// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function LectuerTable({ isDashBoard }: IProps) {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [tempId, setTempId] = useState(1);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  // delete modal
  const [opend, setOpend] = useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  const [selectedCategory, setSelectedCategory] = useState<null | IPackageLectuerSelected>(null);
  const handleEditOpen = (categoryData: IPackageLectuerSelected) => {
    console.log(categoryData);
    setSelectedCategory(categoryData); // Set selected package data
    handleOpenU(); // Open the update modal
  };
  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);

  // Pagination settings

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`Lectuers-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchLectuers(id, page, per, search, sort),
  });

  // console.log(data)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  // console.log(data.data.data);
  // Prepare rows for DataGrid

  const totalItems = data.data?.total;
  return (
    <>
      <Typography variant="h1" color="initial">
        {t('CoursesTable')}
      </Typography>

      <Paper sx={{ width: '100%', marginTop: '20px' }}>
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>
        <LectuerTables
          data={data?.data?.data}
          handleEditOpen={handleEditOpen}
          handleOpend={handleOpend}
          setTempId={setTempId}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.ceil(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>
      {/* delete modal */}
      {/* <BasicModal open={opend} handleClose={handleClosed}>
      <Typography variant="h6" component="h2" gutterBottom>
          Delete
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this package?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="contained" color="error" onClick={() => {
            
            deleteLectuer(tempId, refetch)
            handleClosed()
            
            }}>
            Delete 
          </Button>
        </Box>
       
      </BasicModal> */}

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCategory')}</h2>

        <UpdateLectuerForm handleClose={handleCloseU} initialData={selectedCategory} refetch={refetch} />
      </BasicModal>
      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThing(tempId, refetch, 'course-lectures');
        }}
      />

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default LectuerTable;
