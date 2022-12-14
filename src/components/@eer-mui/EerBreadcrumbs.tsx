import type { BreadcrumbsProps } from '@mui/material';
import { Typography, Box, Link, Breadcrumbs } from '@mui/material';
import NextLink from 'next/link';

// ----------------------------------------------------------------------

const Separator = <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />;

type LinkItemProps = {
  link: {
    name: string;
    href?: string;
    icon?: React.ReactNode;
  };
};

function LinkItem({ link }: LinkItemProps) {
  const { href, name, icon } = link;
  return (
    <NextLink key={name} href={href ?? '#'} passHref>
      <Link
        variant="body2"
        sx={{
          lineHeight: 2,
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          '& > div': { display: 'inherit' },
        }}
      >
        {icon && (
          <Box
            sx={{
              mr: 1,
              '& svg': { width: 20, height: 20 },
            }}
          >
            {icon}
          </Box>
        )}
        {name}
      </Link>
    </NextLink>
  );
}

// ----------------------------------------------------------------------

export type EerBreadcrumbsProps = BreadcrumbsProps & {
  links: Array<{
    name: string;
    href?: string;
    icon?: React.ReactNode;
  }>;
  activeLast?: boolean;
};

export default function EerBreadcrumbs({ links, activeLast = false, ...other }: EerBreadcrumbsProps) {
  const currentLink = links.at(-1)?.name;

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} />);
  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator={Separator} {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}
