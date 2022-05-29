import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

SimpleCard.propTypes = {
    product: PropTypes.object,
};

export default function SimpleCard({ product }) {
    const { title, description } = product;

    // const linkTo = `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(title)}`;

    return (
        // <div>{title}{description}</div>
        <Card>
            <Box sx={{ position: 'relative' }}>
                
                {/* <Image alt={title} src={cover} ratio="1/1" /> */}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                {/* <Link  color="inherit" component={RouterLink}> */}
                    <Typography variant="subtitle2" noWrap>
                        {title}
                    </Typography>
                {/* </Link> */}

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2" noWrap>
                        {description}
                    </Typography>
                    
                </Stack>
            </Stack>
        </Card>
    );
}
