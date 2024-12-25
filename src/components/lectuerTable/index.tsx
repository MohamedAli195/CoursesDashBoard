import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import AddPackageForm from 'components/addPacageForm';
import UpdatePackageForm from 'components/updatePacageForm';
import { deleteLectuer, fetchLectuers } from './LectuerFunct';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import paths from 'routes/path';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';
import { ICourseLectuer, IPackage, IPackageLectuerSelected, IPackageSelected } from 'interfaces';
import { deletePackage } from 'pages/packages/packagesFunct';
import UpdateLectuerForm from 'components/updateLectuerForm';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';

// Fetch packages function

function LectuerTable() {
  const [page, setPage] = useState(1);
  const [per, setper] = useState(1);
  const [search, setSearch] = useState('');
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  // states
  const navigate = useNavigate();
  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // Define a state to store selected package data
  const [selectedLectuer, setSelectedLectuer] = useState<null | ICourseLectuer>(null);

  const handleEditOpen = (packageData: ICourseLectuer) => {
    setSelectedLectuer(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  // fetchLectuers(id);

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    i18n.language === 'ar'
      ? { field: 'nameAr', headerName: 'الاسم' }
      : { field: 'nameEn', headerName: 'Name' },
    i18n.language === 'ar'
      ? { field: 'descriptionAr', headerName: 'الوصف' }
      : { field: 'descriptionEn', headerName: 'description' },
    { field: 'vedioUrl', headerName: i18n.language === 'ar' ? 'الرابط' : 'Link', width: 130 },
    { field: 'vedioDuration', headerName: i18n.language === 'ar' ? 'المدة' : 'time', width: 130 },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteLectuer(params.row.id, refetch)}
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
    queryKey: [`Lectuers-${page}-${per}-${search}`],
    queryFn: () => fetchLectuers(id, page, per, search),
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
          descriptionEn: lecturItem.description.en,
          descriptionAr: lecturItem.description.ar,

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

      <Paper sx={{ height: '800px', width: '100%', marginTop: '20px' }}>
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SearchForm setsearch={setSearch} />
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
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.round(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>

      {/* add modal
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('addPackage')}</h2>

        <AddPackageForm handleClose={handleClose} refetch={refetch} />
      </BasicModal> */}

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default LectuerTable;
