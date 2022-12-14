import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { SizesCons } from '~/constants';
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: SizesCons.APP_BAR_MOBILE + 12,
  paddingBottom: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    paddingTop: SizesCons.APP_BAR_DESKTOP + 12,
  },
}));

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  children: JSX.Element;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>{children}</Main>
    </StyledRoot>
  );
}
