import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _analyticTraffic } from '../../../../_mock';

// ----------------------------------------------------------------------
const card = [{ index: '1', name: 'hello', description: 'Get familiar with hosting standards' },
    { index: '2', name: 'hello', description: 'Login and create an experience' },
    { index: '3', name: 'hello', description: 'Experience review' },
    { index: '4', name: 'hello', description: 'Start earning through TourBook' }]

export default function InfoCard() {
    return (
        <Card>
            {/* <CardHeader title="Traffic by Site" /> */}
            <CardContent>
                <Grid container spacing={2}>
                    {card.map((data) => (
                        <SiteItem key={data.index} site={data} />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

// ----------------------------------------------------------------------

InfoCard.propTypes = {
    site: PropTypes.shape({
        index: PropTypes.any,
        name: PropTypes.string,
        description: PropTypes.string,
    }),
};

function SiteItem({ site }) {
    const { index, name, description } = site;

    return (
        <Grid item xs={6}>
            <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Box sx={{ mb: 0.5 }}>{index}</Box>
                {/* <Typography variant="h6">{fShortenNumber(name)}</Typography> */}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </Paper>
        </Grid>
    );
}
