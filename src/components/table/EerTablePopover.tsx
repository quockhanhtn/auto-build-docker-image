import { ListItemIcon, ListItemText, MenuItem, ModalProps, Popover } from '@mui/material';
import Iconify from '~/components/iconify';

export type EerTablePopoverProps = {
  anchorEl?: null | Element | ((element: Element) => Element);
  onClose?: ModalProps['onClose'];
  menuItems: Array<{
    text: string;
    icon?: React.ReactNode | string;
    color?: string;
    onClick?: (arg: void) => void;
  }>;
};

export default function EerTablePopover(props: EerTablePopoverProps) {
  const { anchorEl, onClose, menuItems } = props;
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      {menuItems.map((item, idx) => (
        <MenuItem
          sx={{ color: item.color }}
          key={`menu-item-${idx}`}
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            }
          }}
        >
          {item.icon && (
            <ListItemIcon>
              <Iconify icon={item.icon} width={24} sx={{ color: item.color }} />
            </ListItemIcon>
          )}
          <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      ))}
    </Popover>
  );
}
