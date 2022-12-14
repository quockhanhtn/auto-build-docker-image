// @mui
import { styled, Theme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import { set, sub } from 'date-fns';
import { SizesCons } from '~/constants';
// utils
import CssStyles from '~/utils/CssStyles';
// components
import Iconify from '~/components/iconify';
import { AccountPopover, LanguagePopover, NotificationsPopover } from '~/components/popover';
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const ACCOUNT = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    onClick: () => {
      alert('Settings');
    },
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: 2,
    title: 'John',
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
];

// ----------------------------------------------------------------------

const StyledRoot = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  ...CssStyles.bgBlur({ color: theme?.palette?.background?.default ?? '' }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${SizesCons.NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
  minHeight: SizesCons.HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: SizesCons.HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export type HeaderProps = {
  onOpenNav: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function Header({ onOpenNav }: HeaderProps) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          <LanguagePopover />
          <NotificationsPopover notifications={NOTIFICATIONS} />
          <AccountPopover account={ACCOUNT} menuOptions={MENU_OPTIONS} />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
