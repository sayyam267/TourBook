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
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    listing: getIcon('ic_listing'),
    create: getIcon('ic_create'),
    pending: getIcon('ic_pending'),
    profile: getIcon('ic_profile'),
};

const VendorNavConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'general',
        items: [
            { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
            { title: 'Analytics', path: PATH_DASHBOARD.general.vendoranalytics, icon: ICONS.analytics },
            { title: 'Create Tour', path: PATH_DASHBOARD.eCommerce.newProduct, icon: ICONS.create },
            { title: 'Your Listings', path: PATH_DASHBOARD.user.cards, icon: ICONS.listing },
            { title: 'Pending Requests', path: PATH_DASHBOARD.blog.postById, icon: ICONS.pending },
            { title: 'Custom Tours', path: PATH_DASHBOARD.kanban, icon: ICONS.booking },
            { title: 'Profile', path: PATH_DASHBOARD.general.banking, icon: ICONS.profile },
            { title: 'Buy Credits', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
            { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
        ],
    },

    // MANAGEMENT
    // // ----------------------------------------------------------------------
    // {
    //     subheader: 'management',
    //     items: [
    //         // MANAGEMENT : USER
    //         {
    //             title: 'user',
    //             path: PATH_DASHBOARD.user.root,
    //             icon: ICONS.user,
    //             children: [
    //                 { title: 'profile', path: PATH_DASHBOARD.user.profile },
    //                 { title: 'cards', path: PATH_DASHBOARD.user.cards },
    //                 { title: 'list', path: PATH_DASHBOARD.user.list },
    //                 { title: 'create', path: PATH_DASHBOARD.user.newUser },
    //                 { title: 'edit', path: PATH_DASHBOARD.user.editById },
    //                 { title: 'account', path: PATH_DASHBOARD.user.account },
    //             ],
    //         },

    //         // MANAGEMENT : E-COMMERCE
    //         {
    //             title: 'e-commerce',
    //             path: PATH_DASHBOARD.eCommerce.root,
    //             icon: ICONS.cart,
    //             children: [
    //                 { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
    //                 { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
    //                 { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
    //                 { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
    //                 { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
    //                 { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
    //                 { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
    //             ],
    //         },

    //         // MANAGEMENT : BLOG
    //         {
    //             title: 'blog',
    //             path: PATH_DASHBOARD.blog.root,
    //             icon: ICONS.blog,
    //             children: [
    //                 { title: 'posts', path: PATH_DASHBOARD.blog.posts },
    //                 { title: 'post', path: PATH_DASHBOARD.blog.postById },
    //                 { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
    //             ],
    //         },
    //     ],
    // },

    // APP
    // ----------------------------------------------------------------------
    // {
    //     subheader: 'app',
    //     items: [
    //         {
    //             title: 'mail',
    //             path: PATH_DASHBOARD.mail.root,
    //             icon: ICONS.mail,
    //             info: (
    //                 <Label variant="outlined" color="error">
    //                     +32
    //                 </Label>
    //             ),
    //         },
    //         { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
    //         { title: 'Buy Credits', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
    //         {
    //             title: 'kanban',
    //             path: PATH_DASHBOARD.kanban,
    //             icon: ICONS.kanban,
    //         },
    //     ],
    // },
];

export default VendorNavConfig;
