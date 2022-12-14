import { useRouter } from 'next/router';
import { VN, EN } from '~/lang';

const useTrans = () => {
  const { locale } = useRouter();

  const data: any = locale === 'vi' ? VN : EN;

  const t = (key: string, opt: {}) => {
    const keys = key.split('.');

    let rs = data;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      rs = rs[k];
    }

    Object.entries(opt).forEach(([key, value]) => {
      rs = rs.replace(`{{${key}}}`, value);
    });

    return rs;
  };

  return { t };
};

export default useTrans;
