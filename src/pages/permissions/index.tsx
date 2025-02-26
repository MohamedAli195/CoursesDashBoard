import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import AddPackageForm from 'components/addPacageForm';
import UpdatePackageForm from 'components/updatePacageForm';
// import { fetchPackages } from './packagesFunct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { IPackage, IPackageSelected, IPermissions, ITempPermissions } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
import SwitchStatus from 'components/switch';
import DeleteModal from 'components/deleteModal';
import { deleteAnyThing, fetchAllData } from 'functions';
import AddPermissinsForm from 'components/addPermissions';
import PackagesPageSkeleton from 'components/skelton';
import UpdatePermissionsForm from 'components/updatePrrmissionForm/UpdatePermissionsForm';

// Fetch packages function
interface IProps {
  isDashBoard:boolean
}
function PermissionsPage({isDashBoard}:IProps) {
  // states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [per, setper] = useState(10);
  const [tempId, setTempId] = useState(1);
  const [tempIdUpdate, setTempIdUpdate] = useState(1);
  // const [tempPermission, settempPermission] = useState({});
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    // delete modal
    const [opend, setOpend] = useState(false);
    const handleOpend = () => setOpend(true);
    const handleClosed = () => setOpend(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // Define a state to store selected package data
  const [tempPermission, settempPermission] = useState<ITempPermissions | undefined>();

  const handleEditOpen = (packageData: ITempPermissions) => {
    // setTempIdUpdate(packageData.id); // Set selected package data
    // const filterd = packageData.permissions.map(item => item.name);
    // console.log(packageData)
    settempPermission(packageData)
    handleOpenU(); // Open the update modalclg
  };

  // Columns configuration
  const columns: GridColDef[] = [
    
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: i18n.language === 'ar' ? 'الاسم' : 'Name' },
    { field: 'permissions', headerName: i18n.language === 'ar' ? 'الصلاحيات' : 'permissions',flex: 2,renderCell: (params) => (
<Box   sx={{
    display: 'flex',
    flexWrap: 'wrap',
    overflowX: 'auto', // Optional: adds horizontal scrolling if content overflows
  }}>
  {params.row.permissions.map((item:{name:string})=>{
    return(
    
      <Box component="div" sx={{ display: 'inline-block',backgroundColor:"#dfdfdf", m:0.5 ,borderRadius:1,p:0.5}}>{item.name}</Box>

    )
  })}
</Box>
    ), 
  },
    i18n.language === 'ar'
    ? { field: 'display_nameAr', headerName: 'الاسم المعروض',flex: 1, }
    : { field: 'display_nameEn', headerName: 'display name En' ,flex: 1,},

    { field: 'status', headerName: i18n.language === 'ar' ? 'الحالة' : 'status', width: 130 ,renderCell: (params) => (
          <SwitchStatus id={params.row.id} url={"packages"} apiStatus={params.row.status} />
         
        ), },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            
            onClick={
              ()=>{
              handleOpend()
              setTempId(params.row.id)
            }
          }
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>

          <Button variant="contained" color="info" onClick={() => handleEditOpen(params.row)}>
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`roles-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllData(page, per, search, sort,'','roles'),
  });

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;
// console.log(data)
  // Prepare rows for DataGrid
  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data?.map((role: {name:string,id:number,display_name:{
        en:string,
        ar:string
      },permissions:string[]}) => ({
          id: role?.id,
          name: role?.name,
          permissions: role?.permissions,
          // display_name: role?.display_name,
          display_nameEn: role.display_name?.en,
          display_nameAr: role.display_name?.ar,
        }))
      : [];
  const totalItems = data.data?.total;
  // console.log(totalItems)
  return (
    <>
    {
      !isDashBoard && <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
      height={''}
    >
      <Typography variant="h1" color="initial">
        {t('Permissions')}
      </Typography>
      <Button variant="contained" color="info" onClick={handleOpen}>
        {t('addPermissions')}
      </Button>
    </Stack>
    }
      
      <Stack flexDirection={'row'} alignItems={'center'}>
        <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />
        
          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} search={search} />
          
        </Stack>
      <Paper sx={{ width: '100%' }}>
        {
          isDashBoard && <Typography variant="h1" color="initial">
          {t('permissions')}
        </Typography>
        }

        <DataGrid
          rows={rows}
          columns={columns}
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
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 :  Math.ceil(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>{' '}
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('addPermissions')}</h2>
        <AddPermissinsForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      <DeleteModal handleClosed={handleClosed}  opend={opend} refetch={refetch} tempId={tempId} deleteFunc={()=>{deleteAnyThing(tempId,refetch,'roles')}}/>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('editPackage')}</h2>
        <UpdatePermissionsForm
          handleClose={handleCloseU}
          refetch={refetch}
          tempPermission={tempPermission}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PermissionsPage;
