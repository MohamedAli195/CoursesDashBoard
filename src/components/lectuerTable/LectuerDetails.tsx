import { useLocation, useParams } from 'react-router-dom';
import { fetchLectuer } from './LectuerFunct';
import { useQuery } from '@tanstack/react-query';
import ViewPackageForm from 'components/viewpackageForm';
import { useEffect } from 'react';
import i18n from 'i18n';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ViewLectuerForm from 'components/viewLectuerForm';

function LectuerDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['LectuerDetails', id],
    queryFn: () => fetchLectuer(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h1" color="initial">
        {t('LectuerPage')}
      </Typography>
      <ViewLectuerForm />
    </>
  );
}

export default LectuerDetails;
