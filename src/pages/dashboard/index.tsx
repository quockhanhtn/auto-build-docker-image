import { useRouter } from 'next/router';

import DashboardLayout from '~/layouts/dashboard/DashboardLayout';
import { NextPageWithLayout } from '~/pages/_app';
import { useTrans } from '~/hooks';

const DashboardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTrans();
  const { tenant } = router.query;

  return (
    <h1>
      statistics - Tenant: {tenant} {t('admin.general.test', { name: 'Test' })}
    </h1>
  );
};

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
