import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Container, Grid } from '@mui/material';
// utils

import Page from '../../components/Page';
// components
import Iconify from '../../components/Iconify';
import BaseOptionChart from '../../components/chart/BaseOptionChart';
import AnalyticsWidgetSummary from '../../sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import useSettings from '../../hooks/useSettings';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    padding: theme.spacing(3),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter,
}));

// ----------------------------------------------------------------------

const TOTAL = 18765;
const PERCENT = 2.6;
const CHART_DATA = [{ data: [111, 136, 76, 108, 74, 54, 57, 84] }];

export default function AdminAnalytics() {
    const { themeStretch } = useSettings();

    useEffect(() => {

    });


    return (
        <Page title="Admin: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AnalyticsWidgetSummary title="Total Credits" total={localStorage.getItem('balance')} icon={'entypo:credit'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AnalyticsWidgetSummary title="New Users" total={1352831} color="info" icon={'uil:user'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AnalyticsWidgetSummary
                            title="Item Orders"
                            total={1723315}
                            color="warning"
                            icon={'ant-design:windows-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AnalyticsWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>
                </Grid>
            </Container>
        </Page>

    );
}






