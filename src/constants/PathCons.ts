const PathCons = {
  auth: {
    login: ['/auth', 'login'].join('/'),
  },
  dashboard: {
    _root: '/dashboard',
    app: {
      _root: ['/dashboard', 'app'].join('/'),
      statistics: ['/dashboard', 'app', 'statistics'].join('/'),
    },
    management: {
      _root: ['/dashboard', 'management'].join('/'),
      users: {
        _root: ['/dashboard', 'management', 'users'].join('/'),
        list: ['/dashboard', 'management', 'users', 'list'].join('/'),
        add: ['/dashboard', 'management', 'users', 'add'].join('/'),
        update: ['/dashboard', 'management', 'users', 'update'].join('/'),
      },
      subjects: ['/dashboard', 'management', 'subjects'].join('/'),
    },
    configs: {
      _root: ['/dashboard', 'configs'].join('/'),
      environment: ['/dashboard', 'configs', 'environment'].join('/'),
    },
  },
} as const;

export default PathCons;
