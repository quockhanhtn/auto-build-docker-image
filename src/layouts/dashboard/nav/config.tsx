// component
import { PathCons } from '~/constants';
import SvgColor from '~/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string): JSX.Element => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

const navConfig = [
  {
    subheader: 'app',
    items: [
      {
        title: 'dashboard',
        path: PathCons.dashboard._root,
        icon: icon('ic_analytics'),
      },
    ],
  },
  {
    subheader: 'management',
    items: [
      {
        title: 'users',
        path: PathCons.dashboard.management.users._root,
        icon: icon('ic_user'),
        children: [
          { title: 'List', path: PathCons.dashboard.management.users.list },
          { title: 'Add', path: PathCons.dashboard.management.users.add },
          { title: 'Update', path: PathCons.dashboard.management.users.update },
        ],
      },
      {
        title: 'subjects',
        path: PathCons.dashboard.management.subjects,
        icon: icon('ic_category'),
      },
    ],
  },
  {
    subheader: 'configs',
    items: [
      {
        title: 'environment',
        path: PathCons.dashboard.configs.environment,
        icon: icon('ic_configuration'),
      },
    ],
  },
];

export default navConfig;
