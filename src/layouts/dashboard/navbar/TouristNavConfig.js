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
    banking: getIcon('ic_banking'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    booking: getIcon('ic_booking'),
    credits: getIcon('ic_credits'),
    mytour: getIcon('ic_mytour'),
    profile: getIcon('ic_profile'),
};

const TouristNavConfig = [
    // ----------------------------------------------------------------------
    {
        subheader: 'general',
        items: [
            { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
            { title: 'My Tours', path: PATH_DASHBOARD.user.list, icon: ICONS.mytour },
            {
                title: 'Custom Tour', path: PATH_DASHBOARD.blog.root, icon: ICONS.booking, children: [
                    { title: 'Create a Custom Tour', path: PATH_DASHBOARD.blog.newPost },
                    { title: 'My Custom Tour', path: PATH_DASHBOARD.user.account },
                ], },
            { title: 'Profile', path: PATH_DASHBOARD.general.banking, icon: ICONS.profile },
            {
                title: 'TB Credits', path: PATH_DASHBOARD.mail.root, icon: ICONS.credits,  children: [
                    { title: 'Buy Credits', path:PATH_DASHBOARD.calendar },
                    { title: 'Transaction History', path: PATH_DASHBOARD.mail.root },
                ],
            },
            
           
            { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
        ],
    },

];

export default TouristNavConfig;
