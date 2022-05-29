import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Typography} from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
    ...cssStyles(theme).bgBlur(),
    top: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: APPBAR_MOBILE,
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    [theme.breakpoints.up('md')]: {
        height: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

export default function TBLabel() {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
            <div>
            <Typography variant="h3" sx={{color: 'primary.main',mt:1 }} >T O U R B O O K</Typography>
            </div>
    );
}
