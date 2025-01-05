import PageLoader from 'components/loading/PageLoader';
import Splash from 'components/loading/Splash';
import AuthLayout from 'layouts/auth-layout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './path';
import ProtectedRoute from 'components/protectedRoute/ProtectedRoute';
import PackagesPage from 'pages/packages';
import PackageDetails from 'pages/packages/PackageDetails';
import CategoriesDetails from 'pages/categories/CategoriesDetails';
import CoursesPage from 'pages/courses';
import AddCoursePage from 'pages/courses/AddCoursePage';
import CourseDetails from 'pages/courses/CourseDetails';
import AddCourseLectuerPage from 'pages/courses/AddCourseLectuerPage';
import CourseUpdate from 'pages/courses/CourseUpdate';
import UpdateLectuerForm from 'components/updateLectuerForm';
import LectuerDetails from 'components/lectuerTable/LectuerDetails';
import ViewCustomer from 'components/ViewCustomer';


// Lazy-loaded components
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const LoginPage = lazy(() => import('pages/authentication/login'));
const SignUpPage = lazy(() => import('pages/authentication/register'));
const ForgotPasswordPage = lazy(() => import('pages/authentication/forgot-password'));
const PasswordResetPage = lazy(() => import('pages/authentication/reset-password'));
const CategoriesPage = lazy(() => import('pages/categories'));
const OrdersPage = lazy(() => import('pages/orders'));
const Dashboard = lazy(() => import('pages/dashboard/index'));
// const ProductsPage = lazy(() => import('pages/products'));
const CustomersPage = lazy(() => import('pages/customers'));
const ReportsPage = lazy(() => import('pages/reports'));
const CouponsPage = lazy(() => import('pages/coupons'));
const InboxPage = lazy(() => import('pages/inbox'));
const NotFoundPage = lazy(() => import('pages/not-found'));

// Check if user is logged in
const isLoggedIn = !!localStorage.getItem("token"); // example auth check

export const routes = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.categories,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CategoriesPage isDashBoard={false}/>
              </ProtectedRoute>
            ),
          },
          // {
          //   path: paths.products,
          //   element: (
          //     <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
          //       <ProductsPage />
          //     </ProtectedRoute>
          //   ),
          // },
          {
            path: paths.customers,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CustomersPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          
          {
            path: paths.orders,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
              <OrdersPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.reports,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <ReportsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.coupons,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CouponsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.courses,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CoursesPage isDashBoard={false}/>
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.courses}/add`,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <AddCoursePage />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.courses}/:id/add-lectuer`,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <AddCourseLectuerPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.inbox,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <InboxPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.packages, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <PackagesPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.packages}/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <PackageDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.categories}/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CategoriesDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.courses}/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CourseDetails />
              </ProtectedRoute>
            ),
          },

          {
            path: `${paths.courses}/update/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CourseUpdate />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.lectuers}/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <LectuerDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.lectuers}/update/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <UpdateLectuerForm />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.customers}/:id`,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <ViewCustomer />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.login,
            element: (
              <ProtectedRoute isAllowed={!isLoggedIn} redirect={paths.default}>
                <LoginPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.signup,
            element: <SignUpPage />,
          },
          {
            path: paths.forgotPassword,
            element: <ForgotPasswordPage />,
          },
          {
            path: paths.resetPassword,
            element: <PasswordResetPage />,
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notFound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.notFound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;
