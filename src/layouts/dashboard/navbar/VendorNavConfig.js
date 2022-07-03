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
    booking: getIcon('ic_booking'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('carbon:add-alt'),
    dashboard: getIcon('ic_dashboard'),
    listing: getIcon('ic_listing'),
    create: getIcon('ic_create'),
    pending: getIcon('ic_pending'),
    profile: getIcon('ic_profile'),
    credits: getIcon('ic_credits'),
};

const VendorNavConfig = [
    
    {
        subheader: 'general',
        items: [
            { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
            
            { title: 'Create Tour', path: PATH_DASHBOARD.eCommerce.newProduct, icon: ICONS.create },
            { title: 'Your Listings', path: PATH_DASHBOARD.user.cards, icon: ICONS.listing },
            { title: 'Pending Requests', path: PATH_DASHBOARD.blog.postById, icon: ICONS.pending },
            { title: 'Custom Tours', path: PATH_DASHBOARD.kanban, icon: ICONS.booking },
            { title: 'Profile', path: PATH_DASHBOARD.general.banking, icon: ICONS.profile },
            {title: 'TB Credits', path: PATH_DASHBOARD.mail.root, icon: ICONS.credits, children: [
                { title: 'Buy Credits', path: PATH_DASHBOARD.calendar },
                { title: 'Transaction History', path: PATH_DASHBOARD.mail.root },
            ],
            },
            { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
        ],
    },
];

export default VendorNavConfig;
