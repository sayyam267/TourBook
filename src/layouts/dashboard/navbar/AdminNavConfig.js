// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    blog: getIcon('ic_blog'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_mail'),
    user: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    profile: getIcon('ic_profile'),
};

const navConfig = [
   
    {
        subheader: 'general',
        items: [
            { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
            // { title: 'Analytics', path: PATH_DASHBOARD.general.adminanalytics, icon: ICONS.dashboard },
            { title: 'AdminPanel', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
            { title: 'Profile', path: PATH_DASHBOARD.general.banking, icon: ICONS.profile },
            
        ],
    },
];

export default navConfig;
