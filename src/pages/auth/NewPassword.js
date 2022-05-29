import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { NewPasswordForm } from '../../sections/auth/new-password';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NewPassword() {
    const [email, setEmail] = useState('');
    const [passreset, setPassReset] = useState(false);


    return (
        <Page title="Reset Password" sx={{ height: 1 }}>
            <RootStyle>
                <LogoOnlyLayout />

                <Container>
                    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                        {!passreset ? (
                            <>
                                <Typography variant="h3" paragraph>
                                    Reset password?
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                                    Please enter your new password below
                                </Typography>

                                <NewPasswordForm onSent={() => setPassReset(true)} onGetEmail={(value) => setEmail(value)} />

                                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                                    Back
                                </Button>
                            </>
                        ) : (

                            <Box sx={{ textAlign: 'center' }}>
                                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                                <Typography variant="h3" gutterBottom>
                                    Password Reset successfully
                                </Typography>
                                <Typography>
                                    Go Back to &nbsp;
                                    <strong>Login Page</strong>
                                </Typography>

                                <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                                    Back
                                </Button>
                            </Box>
                        )}
                    </Box>

                </Container>
            </RootStyle>
        </Page>
    );
}
