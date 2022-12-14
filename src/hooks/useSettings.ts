import type { SettingsContextType } from '~/components/@global/provider/SettingsProvider';
import { SettingsContext } from '~/components/@global/provider/SettingsProvider';

import { useContext } from 'react';

// ----------------------------------------------------------------------

const useSettings = (): SettingsContextType => useContext<SettingsContextType>(SettingsContext);

export default useSettings;
