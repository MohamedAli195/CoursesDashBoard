import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { deleteLectuer, fetchLectuers } from './LectuerFunct';
import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { IPackageLectuerSelected } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
import BasicModal from 'components/modal/ShareModal';

// Fetch packages function
interface IProps {
  isDashBoard:boolean
}
function LectuerTable({isDashBoard}:IProps) {
    // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(1);
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

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    i18n.language === 'ar'
      ? { field: 'nameAr', headerName: 'الاسم'  ,flex: 1,}
      : { field: 'nameEn', headerName: 'Name' ,flex: 1, },
    // i18n.language === 'ar'
    //   ? { field: 'descriptionAr', headerName: 'الوصف' }
    //   : { field: 'descriptionEn', headerName: 'description' },
    { field: 'vedioUrl', headerName: i18n.language === 'ar' ? 'الرابط' : 'Link',flex: 1, },
    { field: 'vedioDuration', headerName: i18n.language === 'ar' ? 'المدة' : 'time '},
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',

      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="error"
            // onClick={() => deleteLectuer(params.row.id, refetch)}
            onClick={
              ()=>{
              handleOpend()
              setTempId(params.row.id)
            }}
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.lectuers}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`${paths.lectuers}/update/${params.row.id}`)}
          >
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  // Pagination settings

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`Lectuers-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchLectuers(id, page, per, search,sort),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  // console.log(data.data.data);
  // Prepare rows for DataGrid
  const rows =
    data.data?.data?.length > 0
      ? data?.data?.data.map((lecturItem: IPackageLectuerSelected) => ({
          id: lecturItem.id,
          nameEn: lecturItem.title?.en,
          nameAr: lecturItem.title?.ar,
          // descriptionEn: lecturItem.description.en,
          // descriptionAr: lecturItem.description.ar,

          vedioUrl: lecturItem.video_url,
          vedioDuration: lecturItem.duration,
        }))
      : [];
  const totalItems = data.data?.total;
  return (
    <>
      <Typography variant="h1" color="initial">
        {t('CoursesTable')}
      </Typography>

      <Paper sx={{ width: '100%', marginTop: '20px' }}>
        <Stack flexDirection={'row'} alignItems={'center'}>
        <SelectSort setSort={setSort} sort={sort} />
          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
                 
          
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight
          getRowHeight={() => 200} // Set each row's height to 200px
          getRowClassName={(params: GridRowClassNameParams) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
          }
          disableRowSelectionOnClick
          disableMultipleRowSelection
          hideFooterPagination={true}
        />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ marginTop: 2,mx:2}}>
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.round(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>
            {/* delete modal */}
            <BasicModal open={opend} handleClose={handleClosed}>
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
       
      </BasicModal>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default LectuerTable;
