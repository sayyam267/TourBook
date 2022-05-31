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
  
];

export default menuConfig;
