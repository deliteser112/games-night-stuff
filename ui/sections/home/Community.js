import * as Yup from 'yup';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// routes
import { PATH_PAGE } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const TextContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    width: '90%',
    transform: 'translate(0, -50%)'
  }
}));

// ----------------------------------------------------------------------

export default function Community() {
  const theme = useTheme();

  const isMountedRef = useIsMountedRef();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const defaultValues = {
    name: '',
    email: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('hello world');
      // await register(data.name, data.email);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };
  return (
    <RootStyle>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/bg-community.png"
            sx={{ display: 'none', [theme.breakpoints.up('md')]: { display: 'block' } }}
          />
          <TextContainer>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box>
                <Typography variant="h2">Join our community feed</Typography>
                <Box m={2} />
                <Typography variant="body1">This is just fancy talk for joining our email subscription.</Typography>
                <Box m={2} />
                <Typography variant="body1">
                  By joining our communication feed, you will help us to keep you updated on what we are achieving and
                  give you a conduit by which you can communicate back to us.
                </Typography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                    <RHFTextField name="name" label="Your Name" />
                    <RHFTextField name="email" label="Your Email" />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                      Subscribe
                    </LoadingButton>
                  </Stack>
                </FormProvider>
              </Box>
            </Stack>
          </TextContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
