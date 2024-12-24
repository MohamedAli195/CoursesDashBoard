import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import AddPackageForm from 'components/addPacageForm';
import UpdatePackageForm from 'components/updatePacageForm';
import { deleteCustomer, fetchCustomer, fetchCustomers } from './costumersFunct';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';
import AddCustomer from 'components/addCustomer';
import UpdateCustomerForm from 'components/updatePacageForm/updateCustomer';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';

// Fetch packages function

function CustomersPage() {
  const [page, setPage] = useState(1);
  const [per, setper] = useState(1);

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
  const [selectedPackage, setSelectedPackage] = useState<null | {
    id: number;
    name: string;
    email: string;
    phone: string;
    partner_code: string;
  }>(null);

  const handleEditOpen = (packageData: {
    id: number;
    name: string;
    email: string;
    phone: string;
    partner_code: string;
  }) => {
    setSelectedPackage(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  fetchCustomers();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'الاسم' }
      : { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email' },

    { field: 'phone', headerName: i18n.language === 'ar' ? 'الحالة' : 'phone', width: 130 },
    {
      field: 'partner_code',
      headerName: i18n.language === 'ar' ? 'رقم الشريك' : 'partner_code',
      width: 130,
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCustomer(params.row.id, refetch)}
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.packages}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  // Pagination settings
  // const paginationModel = { page: 0, pageSize: 5 };

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`customers-${page}-${per}`],
    queryFn: () => fetchCustomers(page, per),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Prepare rows for DataGrid
  console.log(data.data?.total);
  const rows =
    data.data.data.length > 0
      ? data.data.data.map(
          (packageItem: {
            id: number;
            name: string;
            email: string;
            phone: string;
            partner_code: string;
          }) => ({
            id: packageItem.id,
            name: packageItem.name,
            email: packageItem.email,
            phone: packageItem.phone,
            partner_code: packageItem.partner_code,
          }),
        )
      : '';

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        height={''}
      >
        <Typography variant="h1" color="initial">
          {t('customers')}
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          {t('Addcustomers')}
        </Button>
      </Stack>

      <Paper sx={{ height: '800px', width: '100%' }}>
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
            pageCounter={
              data.data?.total % per === 0 ? data.data?.total / per : (data.data?.total % per) + 1
            }
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>{' '}
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('Addcustomers')}</h2>

        <AddCustomer handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCustomer')}</h2>
        <UpdateCustomerForm
          handleClose={handleCloseU}
          initialData={selectedPackage}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default CustomersPage;
