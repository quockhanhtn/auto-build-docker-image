// icons
import { Icon } from '@iconify/react';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
//
import { useState, forwardRef } from 'react';
// material
import { alpha, useTheme, styled, Theme } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemButton,
  ListItemButtonProps,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListSubheaderProps,
  BoxProps,
} from '@mui/material';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props: ListSubheaderProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }: { theme: Theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled((props: ListItemButtonProps) => <ListItemButton disableGutters {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

type ItemProps = ListItemButtonProps & {
  children: JSX.Element | JSX.Element[];
};

const Item = forwardRef(({ children, ...other }: ItemProps, _ref: any) => (
  <ListItemStyle {...other}>{children}</ListItemStyle>
));

// ----------------------------------------------------------------------

type NavItemProps = {
  item: {
    title: string;
    info?: JSX.Element;
    path: string;
    icon: JSX.Element;
    children?: Array<{
      title: string;
      info?: JSX.Element;
      path: string;
      icon: JSX.Element;
    }>;
  };
  active: (arg0: string) => boolean;
};

function NavItem({ item, active }: NavItemProps) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  // eslint-disable-next-line no-unused-vars
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <Item
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {/* {info && info} */}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </Item>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const isActiveSub = active(item.path);

              return (
                <NextLink key={item.title} href={item.path}>
                  <Item
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main',
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={item.title} />
                  </Item>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path}>
      <Item
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={item.title} />
        {/* {info && info} */}
      </Item>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

export type NavSectionProps = BoxProps & {
  navConfig: Array<{
    subheader: string;
    items: Array<{
      title: string;
      info?: JSX.Element;
      path: string;
      icon: JSX.Element;
    }>;
  }>;
};

function NavSection({ navConfig, ...other }: NavSectionProps) {
  const { pathname } = useRouter();

  const match = (path: string) => {
    const listItemsPath = path.split('/');
    const endPath = listItemsPath[listItemsPath.length - 1];
    const listItemsPathName = pathname.split('/');
    const endPathName = listItemsPathName[listItemsPathName.length - 1];
    return endPathName.includes(endPath);
  };

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            <ListSubheaderStyle>{subheader}</ListSubheaderStyle>
            {items.map((item) => (
              <NavItem key={item.title} item={item} active={match} />
            ))}
          </List>
        );
      })}
    </Box>
  );
}

export default NavSection;
