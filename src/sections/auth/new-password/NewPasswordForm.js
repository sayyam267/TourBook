import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, InputAdornment, IconButton,Alert ,Box} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

NewPasswordForm.propTypes = {
    onSent: PropTypes.func,
    onGetEmail: PropTypes.func,
};

export default function NewPasswordForm({ onSent, onGetEmail }) {
    const isMountedRef = useIsMountedRef();
    const [showPassword, setShowPassword] = useState(false);
    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(8),
        confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues: { password: 'pass1234', confirmPassword: 'pass1234'},
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (isMountedRef.current && (data.password === data.confirmPassword)) {
                const response = await axios.put("http://tourbook-backend.herokuapp.com/user/update/password", {email:localStorage.getItem('verifyEmail'),password: data.password}).then(res => {
                    onSent();
                    onGetEmail(data.email);
                    console.log(res);
                    localStorage.removeItem('verifyEmail');
                    localStorage.removeItem('code');
})
            }
            else{
                reset()
                console.error("password not matched");
            }
        } catch (error) {
            console.error(error);
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', error);
            }
              }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Box sx={{ mt: 3, mb: 3 }}>
                <Alert severity="error">{errors.afterSubmit.message}</Alert> </Box>}
            <Stack spacing={3}>
                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={'password'}
                />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Reset Password
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
