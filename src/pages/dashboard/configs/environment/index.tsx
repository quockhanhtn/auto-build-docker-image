import DashboardLayout from '~/layouts/dashboard/DashboardLayout';
import { NextPageWithLayout } from '~/pages/_app';

const ConfigsEnvironmentPage: NextPageWithLayout = () => {
  const a = 0;
  return <h1>Environments</h1>;
};

ConfigsEnvironmentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ConfigsEnvironmentPage;
