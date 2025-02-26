import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, Stack, Typography } from '@mui/material';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import ViewCoursForm from 'components/Courses/viewCoursForm';
import LectuerTable from 'components/lectuerTable';
import { fetchOne } from 'functions';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['CourseDetails', id],
    queryFn: () => fetchOne(id,'courses'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant="h1" color="initial">
          {t('coursepage')}
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(`${paths.courses}/${id}/add-lectuer`)}
        >
          {t('AddCourseLectuer')}
        </Button>
      </Stack>

      <ViewCoursForm initialData={data?.data} />
      <Box>

      <LectuerTable isDashBoard={false}  />
      </Box>
    </>
  );
}

export default CourseDetails;
