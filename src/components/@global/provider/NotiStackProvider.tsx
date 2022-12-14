// icons
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import infoFill from '@iconify/icons-eva/info-fill';

import type { SnackbarProviderProps } from 'notistack';
import { SnackbarProvider } from 'notistack';

import { EerVariantIcon } from '~/components/@eer-mui';

import makeStyles from '@mui/styles/makeStyles';
import { useCustomTheme } from '~/hooks';
import type { CustomTheme } from '~/types/theme.types';

const useStyles = makeStyles((theme: CustomTheme) => {
  const createVariantStyle = {
    color: `${theme.palette.text.primary} !important`,
    backgroundColor: `${theme.palette.background.paper} !important`,
    padding: `${theme.spacing(1.5, 2)} !important`,
    margin: theme.spacing(0.5, 0),
    boxShadow: theme.customShadows.z8,
    // borderRadius: theme.shape.borderRadius,
    borderRadius: `${theme.spacing(1)} !important`,

    '& .SnackbarItem-message': {
      padding: 0,
      fontWeight: theme.typography.fontWeightRegular,
    },

    '& .SnackbarItem-action': {
      marginRight: -4,
      '& svg': {
        width: 20,
        height: 20,
        opacity: 0.48,
        '&:hover': { opacity: 1 },
      },
    },
  };

  return {
    containerRoot: {
      '& .MuiCollapse-wrapperInner': {
        width: '100%',
      },
    },
    variantInfo: { ...createVariantStyle },
    variantSuccess: { ...createVariantStyle },
    variantWarning: { ...createVariantStyle },
    variantError: { ...createVariantStyle },
  };
});

export type NotiStackProviderProps = SnackbarProviderProps & {};

export default function NotiStackProvider({ children, ...other }: NotiStackProviderProps): JSX.Element {
  const theme = useCustomTheme();
  const classes = useStyles(theme);

  return (
    <SnackbarProvider
      maxSnack={5}
      dense
      preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      iconVariant={{
        info: <EerVariantIcon icon={alertCircleFill} color="info" />,
        success: <EerVariantIcon icon={checkmarkCircle2Fill} color="success" />,
        error: <EerVariantIcon icon={infoFill} color="error" />,
        warning: <EerVariantIcon icon={alertTriangleFill} color="warning" />,
      }}
      classes={classes}
      {...other}
    >
      {children}
    </SnackbarProvider>
  );
}
