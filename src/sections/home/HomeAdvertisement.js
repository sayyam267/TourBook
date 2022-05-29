import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
import InfoCard from '../@dashboard/general/analytics/InfoCard';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

const ContentStyleGuide = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.warning.main} 0%,
    ${theme.palette.warning.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));
// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <div>
      <Container sx={{
        mt: { md: 10 },
        mb: { md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}>
      <ContentStyle>
        <Box
          sx={{
            pl: { md: 10 },
            pt: { md: 10 },
            pb: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <MotionInView variants={varFade().inDown} sx={{ color: 'common.white', mb: 5 }}>
            <Typography variant="h2">
              Become A Tour Guide
            </Typography>
            <Typography variant="h4">
              Help the world rediscover <br /> Pakistan
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Button
              size="large"
              variant="contained"
              target="_blank"
              rel="noopener"
              href="https://material-ui.com/store/items/minimal-dashboard/"
              sx={{
                whiteSpace: 'nowrap',
                boxShadow: (theme) => theme.customShadows.z8,
                color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.300' },
              }}
            >
              Login
            </Button>
          </MotionInView>
        </Box>

        <MotionInView
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
            // ml: { xs: 3, md: 5 },
            pl: { xs: 3, md: 5 },
            pr: { xs: 3, md: 5 },
          }}
        >
          {/* animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }} */}
          <m.div >
            <InfoCard />
          </m.div>

        </MotionInView>
      </ContentStyle>
    </Container>


      <Container>
        <ContentStyleGuide>
          <Box
            sx={{
              pl: { md: 10 },
              pt: { md: 10 },
              pb: { md: 10 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <MotionInView variants={varFade().inDown} sx={{ color: 'common.white', mb: 5 }}>
              <Typography variant="h2">
                Host a Tour
              </Typography>
              <Typography variant="h4">
                Help the world rediscover <br /> Pakistan
              </Typography>
            </MotionInView>
            <MotionInView variants={varFade().inDown}>
              <Button
                size="large"
                variant="contained"
                target="_blank"
                rel="noopener"
                href="https://material-ui.com/store/items/minimal-dashboard/"
                sx={{
                  whiteSpace: 'nowrap',
                  boxShadow: (theme) => theme.customShadows.z8,
                  color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                  bgcolor: 'common.white',
                  '&:hover': { bgcolor: 'grey.300' },
                }}
              >
                Login
              </Button>
            </MotionInView>
          </Box>

          <MotionInView
            variants={varFade().inUp}
            sx={{
              mb: { xs: 3, md: 0 },
              // ml: { xs: 3, md: 5 },
              pl: { xs: 3, md: 5 },
              pr: { xs: 3, md: 5 },
            }}
          >
            {/* animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }} */}
            <m.div >
              <InfoCard />
            </m.div>
          </MotionInView>
        </ContentStyleGuide>
      </Container>


    </div>
  );
}
