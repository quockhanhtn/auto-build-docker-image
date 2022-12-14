export default function MuiLink(_theme: any) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    },
  };
}
