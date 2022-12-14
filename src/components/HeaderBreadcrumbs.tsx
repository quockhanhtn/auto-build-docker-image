import { isString } from 'lodash';
import { Box, Typography, Link, Stack } from '@mui/material';
import { EerBreadcrumbs } from '~/components/@eer-mui';

// ----------------------------------------------------------------------

export type HeaderBreadcrumbsProps = {
  heading: string;
  links: Array<{
    name: string;
    href?: string;
    icon?: React.ReactNode;
  }>;
  action?: React.ReactNode;
  moreLink?: string | string[];
  sx?: any;
};

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = '' || [],
  sx,
  ...other
}: HeaderBreadcrumbsProps) {
  return (
    <Stack sx={sx} mb={2} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <EerBreadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>

      {isString(moreLink) ? (
        <Link href={moreLink} target="_blank" variant="body2" underline="hover">
          {moreLink}
        </Link>
      ) : (
        moreLink.map((href) => (
          <Link
            noWrap
            key={href}
            href={href}
            variant="body2"
            target="_blank"
            sx={{ display: 'flex' }}
            underline="hover"
          >
            {href}
          </Link>
        ))
      )}
    </Stack>
  );
}
