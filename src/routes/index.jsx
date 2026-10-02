import { createBrowserRouter } from 'react-router-dom'
import LazyPage from '../components/LazyPage.jsx'
import RouteErrorState from '../components/RouteErrorState.jsx'
import AppLayout from '../layouts/AppLayout.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import { ROUTES } from '../constants/routes.js'
import { getBasename } from '../utils/withBase.js'
import {
  AdminPage,
  CartPage,
  CheckoutPage,
  ContactPage,
  DownloadAppPage,
  AboutPage,
  BlogDetailsPage,
  BlogPage,
  CategoriesPage,
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
  RegisterPage,
  SearchPage,
  ShopPage,
  WishlistPage,
} from './lazyPages.jsx'

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.home,
      element: <AppLayout />,
      errorElement: <RouteErrorState />,
      children: [
        { index: true, element: <LazyPage component={HomePage} /> },
        { path: ROUTES.products.slice(1), element: <LazyPage component={ProductsPage} /> },
        { path: `${ROUTES.products.slice(1)}/:slug`, element: <LazyPage component={ProductDetailsPage} /> },
        { path: ROUTES.shop.slice(1), element: <LazyPage component={ShopPage} /> },
        { path: ROUTES.admin.slice(1), element: <LazyPage component={AdminPage} /> },
        { path: ROUTES.cart.slice(1), element: <LazyPage component={CartPage} /> },
        { path: ROUTES.wishlist.slice(1), element: <LazyPage component={WishlistPage} /> },
        { path: ROUTES.checkout.slice(1), element: <LazyPage component={CheckoutPage} /> },
        { path: ROUTES.contact.slice(1), element: <LazyPage component={ContactPage} /> },
        { path: ROUTES.downloadApp.slice(1), element: <LazyPage component={DownloadAppPage} /> },
        { path: ROUTES.about.slice(1), element: <LazyPage component={AboutPage} /> },
        { path: ROUTES.categories.slice(1), element: <LazyPage component={CategoriesPage} /> },
        { path: ROUTES.blog.slice(1), element: <LazyPage component={BlogPage} /> },
        { path: `${ROUTES.blog.slice(1)}/:slug`, element: <LazyPage component={BlogDetailsPage} /> },
        { path: ROUTES.search.slice(1), element: <LazyPage component={SearchPage} /> },
        { path: ROUTES.login.slice(1), element: <LazyPage component={LoginPage} /> },
        { path: ROUTES.register.slice(1), element: <LazyPage component={RegisterPage} /> },
        { path: ROUTES.account.slice(1), element: <LazyPage component={LoginPage} /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ],
  {
    // '/' locally, '/orangic' on GitHub Pages (matches vite base)
    basename: getBasename(),
  },
)
