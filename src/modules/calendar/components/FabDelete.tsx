import { useCalendarStore } from '@/hooks';

const FabDelete = () => {
  const { startRemovingEvent } = useCalendarStore();

  const handleClickRemove = () => {
    void startRemovingEvent();
  };

  return (
    <button
      type="button"
      className="btn btn-danger fab fab-danger"
      onClick={handleClickRemove}
      // disabled={shouldBeDisabled}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};

export default FabDelete;
