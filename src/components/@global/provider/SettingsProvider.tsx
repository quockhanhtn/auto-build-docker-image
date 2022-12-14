import type { PaletteMode, Direction, PaletteColorOptions } from '@mui/material';
import { createContext, useMemo } from 'react';
// hooks
import { useLocalStorage } from '~/hooks';
// theme
import { ColorCons } from '~/constants';

// ----------------------------------------------------------------------

export type OptionColorSetting = {
  name?: string;
  value?: string;
};

export type PaletteColorSettings = PaletteColorOptions & {
  name?: string;
  main: string;
  lighter?: string;
  darker?: string;
};

export type SettingsContextType = {
  themeMode: PaletteMode;
  themeDirection: Direction;
  themeColor: string;
  onChangeMode: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirection: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  selectedColor: PaletteColorSettings;
  colorOptions: OptionColorSetting[];
};

const PRIMARY_COLORS: PaletteColorSettings[] = [
  {
    name: 'default', // green
    ...ColorCons.Green,
  },
  {
    name: 'pink',
    ...ColorCons.Pink,
  },
  {
    name: 'purple',
    ...ColorCons.Purple,
  },
  {
    name: 'cyan',
    ...ColorCons.Cyan,
  },
  {
    name: 'blue',
    ...ColorCons.Blue,
  },
  {
    name: 'orange',
    ...ColorCons.Orange,
  },
  {
    name: 'red',
    ...ColorCons.Red,
  },
];

function getColorByName(colorName: string): PaletteColorSettings {
  const color = PRIMARY_COLORS.find((n) => n.name === colorName);
  if (color) {
    return color;
  }
  return PRIMARY_COLORS[0];
}

const initialState: SettingsContextType = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColor: 'default',
  onChangeMode: (_arg0: React.ChangeEvent<HTMLInputElement>) => {},
  onChangeDirection: (_arg0: React.ChangeEvent<HTMLInputElement>) => {},
  onChangeColor: (_arg0: React.ChangeEvent<HTMLInputElement>) => {},
  selectedColor: PRIMARY_COLORS[0],
  colorOptions: [],
};

const SettingsContext = createContext(initialState);

export type SettingsProviderProps = {
  children?: React.ReactNode;
};

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<SettingsContextType>('settings', initialState);

  const providerValue = useMemo<SettingsContextType>(
    () => ({
      ...settings,
      // Mode
      onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({
          ...prev,
          themeMode: event?.target?.value === 'dark' ? 'dark' : 'light',
        }));
      },
      // Direction
      onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({
          ...prev,
          themeDirection: event.target.value === 'rtl' ? 'rtl' : 'ltr',
        }));
      },
      // Color
      onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({
          ...prev,
          themeColor: event.target.value,
        }));
      },
      selectedColor: getColorByName(settings.themeColor),
      colorOptions: PRIMARY_COLORS.map((color: PaletteColorSettings) => ({
        name: color.name,
        value: color.main,
      })),
    }),
    [setSettings, settings],
  );

  return <SettingsContext.Provider value={providerValue}>{children}</SettingsContext.Provider>;
}

export { SettingsProvider, SettingsContext };
