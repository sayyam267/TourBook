// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';
// components

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
let PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app;

const pathAfterLogin = () => {

  if (localStorage.getItem('userType') === 'tourist') {
    PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app;
    return PATH_AFTER_LOGIN;
  }
  if (localStorage.getItem('userType') === 'TourGuide') {
    PATH_AFTER_LOGIN = PATH_DASHBOARD.general.ecommerce;
    return PATH_AFTER_LOGIN;
  }
  if (localStorage.getItem('userType') === 'Admin') {
    PATH_AFTER_LOGIN = PATH_DASHBOARD.general.analytics;
    return PATH_AFTER_LOGIN;
  }
  if (localStorage.getItem('userType') === 'TourAgency') {
    PATH_AFTER_LOGIN = PATH_DASHBOARD.root.profile;
    return PATH_AFTER_LOGIN;
  }
}
const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },

  {
    title: 'AboutUs',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  {
    title: 'ContactUs',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },

  {
    title: 'FAQS',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.faqs,
  },
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: 'Other',
  //       items: [
  //         { title: 'About us', path: PATH_PAGE.about },
  //         { title: 'Contact us', path: PATH_PAGE.contact },
  //         { title: 'FAQs', path: PATH_PAGE.faqs },
  //         { title: 'Pricing', path: PATH_PAGE.pricing },
  //         { title: 'Payment', path: PATH_PAGE.payment },
  //         { title: 'Maintenance', path: PATH_PAGE.maintenance },
  //         { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
  //       ],
  //     },
  //     {
  //       subheader: 'Authentication',
  //       items: [
  //         { title: 'Login', path: PATH_AUTH.loginUnprotected },
  //         { title: 'Register', path: PATH_AUTH.registerUnprotected },
  //         { title: 'Reset password', path: PATH_AUTH.resetPassword },
  //         { title: 'Verify code', path: PATH_AUTH.verify },
  //       ],
  //     },
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 404', path: PATH_PAGE.page404 },
  //         { title: 'Page 500', path: PATH_PAGE.page500 },
  //       ],
  //     },
  //     {
  //       subheader: 'Dashboard',
  //       items: [{ title: 'Dashboard', path: pathAfterLogin() }],
  //     },
  //   ],
  // },
  // {
  //   title: 'Documentation',
  //   icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
  //   path: PATH_DOCS,
  // },
];

export default menuConfig;
