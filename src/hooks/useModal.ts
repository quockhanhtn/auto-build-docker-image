import { useContext } from 'react';
import { ModalContext, ModalContextType } from '~/components/@global/provider/ModalProvider';

const useModal = (): ModalContextType => useContext<ModalContextType>(ModalContext);

export default useModal;
