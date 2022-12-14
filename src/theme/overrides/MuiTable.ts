// ----------------------------------------------------------------------

export default function MuiTable(theme: any) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          '&:first-of-type': {
            // paddingLeft: theme.spacing(1),
            borderTopLeftRadius: theme.shape.borderRadiusSm,
            borderBottomLeftRadius: theme.shape.borderRadiusSm,
            // boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`,
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(1),
            borderTopRightRadius: theme.shape.borderRadiusSm,
            borderBottomRightRadius: theme.shape.borderRadiusSm,
            // boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        // body: {
        //   '&:first-of-type': {
        //     paddingLeft: theme.spacing(1),
        //     boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`,
        //   },
        //   '&:last-of-type': {
        //     paddingRight: theme.spacing(1),
        //     boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`,
        //   },
        // },
      },
    },
  };
}
