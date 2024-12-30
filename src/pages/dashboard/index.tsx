import { Box, Grid } from '@mui/material';
import PageHeader from 'components/common/PageHeader';
import TeamMembers from 'components/sections/dashboard/members/TeamMembers';
import OrdersSection from 'components/sections/dashboard/orders/OrdersSection';
import ProgressTracker from 'components/sections/dashboard/progressTracker/ProgressTracker';
import SalesSection from 'components/sections/dashboard/sales/SalesSection';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';

import TodoList from 'components/sections/dashboard/todos/TodoList';
import TopProductsTable from 'components/sections/dashboard/topProducts/TopProductsTable';
import TransactionTable from 'components/sections/dashboard/transactions/TransactionTable';
import CoursesPage from 'pages/courses';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <Box
      sx={{
        pb: 1,
      }}
    >
      <PageHeader>{t("dashboard")}</PageHeader>
      {/* /* ------------- Stats section ---------------- */}

      <Grid container spacing={3} mt={1} mb={3}>
        <Grid item xs={12} lg={12}>
          <StatisticsCards />
        </Grid>
      </Grid>
      {/* /* ------------- Chart section ---------------- */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={7} lg={8} zIndex={1}>
          <OrdersSection />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <SalesSection />
        </Grid>
      </Grid>
      {/* /* ------------- Table section ---------------- */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} xl={6} zIndex={1}>
          
          <CoursesPage isDashBoard={true} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <TopProductsTable />
        </Grid>
      </Grid>
      {/* /* ------------- Team section ---------------- */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={12} xl={4}>
          <TeamMembers />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <TodoList />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <ProgressTracker />
        </Grid>
      </Grid>
      {/* /* ------------- Table section ---------------- **/}
    </Box>
  );
};

export default Dashboard;
