import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, RootState } from '@/store';

export const useUIStore = () => {
  const dispatch = useDispatch();
  const isDateModalOpen = useSelector(
    (state: RootState) => state.ui.isDateModalOpen
  );

  const openModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //* Properties
    isDateModalOpen,

    //* Methods
    openModal,
    closeModal,
  } as const;
};
