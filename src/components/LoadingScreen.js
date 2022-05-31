import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Logo from './Logo';
import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

const loading = () =>{
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "rgba(0, 0, 0, 0) none repeat scroll 0% 0%",
        display: "block",
        shapeRendering: "auto",
      }}
      width="210px"
      height="210px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx={84} cy={50} r={10} fill="#388e3c">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.2717391304347826s"
          calcMode="spline"
          keyTimes="0;1"
          values="13;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#388e3c;#388e3c;#388e3c;#388e3c;#388e3c"
          begin="0s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#388e3c">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;13;13;13"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx={50} cy={50} r={10} fill="#388e3c">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;13;13;13"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.2717391304347826s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.2717391304347826s"
        />
      </circle>
      <circle cx={84} cy={50} r={10} fill="#388e3c">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;13;13;13"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5434782608695652s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5434782608695652s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#388e3c">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;13;13;13"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8152173913043478s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0869565217391304s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8152173913043478s"
        />
      </circle>
    </svg>
  )
}

export default function LoadingScreen({ isDashboard, ...other }) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <RootStyle {...other}>
          <m.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Logo disabledLink sx={{ width: 64, height: 64 }} />
          </m.div>

          <Box
            component={m.div}
            animate={{
              scale: [1.2, 1, 1, 1.2, 1.2],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '25%',
              position: 'absolute',
              border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />

          <Box
            component={m.div}
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{
              ease: 'linear',
              duration: 3.2,
              repeat: Infinity,
            }}
            sx={{
              width: 120,
              height: 120,
              borderRadius: '25%',
              position: 'absolute',
              border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />
        </RootStyle>
      )}
    </>
  );
}
