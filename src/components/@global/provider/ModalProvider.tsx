import type { ButtonProps } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState, useMemo } from 'react';

// ----------------------------------------------------------------------

export type ModalButtonProps = {
  label: string;
  onClick?: () => void;
  buttonProps?: ButtonProps;
};

export type ModalDisplayOptions = {
  title?: string | JSX.Element;
  content?: string | JSX.Element;
  icon?: 'info' | 'success' | 'warning' | 'error' | JSX.Element;
  buttons?: Array<ModalButtonProps>;
};

export type ModalContextType = ModalDisplayOptions & {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  showModal: (arg: ModalDisplayOptions) => void;
  clearPrevData: () => void;
};

const initialState: ModalContextType = {
  openState: [false, () => {}],
  title: '',
  content: '',
  icon: undefined,
  buttons: [],
  showModal: () => {},
  clearPrevData: () => {},
};

const ModalContext = createContext(initialState);

export type ModalProviderProps = {
  children?: React.ReactNode;
};

function ModalProvider({ children }: ModalProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [modalConfigs, setModalConfigs] = useState<ModalDisplayOptions>();

  const providerValue = useMemo<ModalContextType>(
    () => ({
      openState: [open, setOpen],
      ...modalConfigs,
      showModal: (arg: ModalDisplayOptions) => {
        setOpen(true);
        setModalConfigs((prev) => ({ ...prev, ...arg }));
      },
      clearPrevData: () => {
        setModalConfigs({
          title: '',
          content: '',
          icon: undefined,
          buttons: [],
        });
      },
    }),
    [modalConfigs, open],
  );

  return <ModalContext.Provider value={providerValue}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
