import { FormEvent, useEffect, useMemo, useState } from 'react';
import addHours from 'date-fns/addHours';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import ReactDatePicker from 'react-datepicker';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import { useCalendarStore, useForm, useUIStore } from '@/hooks';
import type { CalEvent, FormCalEvent } from '@/types/calendar';
import Loading from './Loading';

import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/src/sweetalert2.scss';
import './calendar-modal.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

const CalendarModal = () => {
  const { isDateModalOpen, closeModal } = useUIStore();
  const { activeEvent, clearActiveCalendarEvent, startSavingEvent } =
    useCalendarStore();
  const [
    formValues,
    handleInputChange,
    handleDatePickerChange,
    ,
    setFormValues,
  ] = useForm<FormCalEvent>({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { title, notes, start, end } = formValues;

  const titleClassName = useMemo(() => {
    if (!isFormSubmitted) {
      return '';
    }
    return title.trim().length > 0 ? 'is-valid' : 'is-invalid';
  }, [isFormSubmitted, title]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...(activeEvent as CalEvent) });
    }
  }, [activeEvent, setFormValues]);

  const onSave = async () => {
    await startSavingEvent(formValues);
    setIsSaving(false);
    await Swal.fire('Event saved', 'Your event was saved', 'success');
    onCloseModal();
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsFormSubmitted(true);

    const difference = differenceInSeconds(end, start);

    if (Number.isNaN(difference) || difference <= 0) {
      void Swal.fire(
        'Incorrect dates',
        'There is an error on date fields',
        'error'
      );
      return;
    }
    if (title.trim().length === 0) {
      void Swal.fire('Empty title', 'Title cannot be empty', 'error');
      return;
    }

    setIsSaving(true);
    void onSave();
  };

  const onCloseModal = () => {
    clearActiveCalendarEvent();
    setIsFormSubmitted(false);
    setIsSaving(false);
    closeModal();
  };

  return (
    <ReactModal
      isOpen={isDateModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}>
      <i
        role="presentation"
        className="fas fa-times-circle i-close"
        onClick={onCloseModal}
      />

      {isSaving && <Loading />}

      <h1> New event </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Init datetime</label>
          <ReactDatePicker
            name="start"
            selected={start}
            onChange={handleDatePickerChange('start')}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            title="Init datetime"
          />
        </div>

        <div className="form-group mb-2">
          <label>End datetime</label>
          <ReactDatePicker
            name="end"
            selected={end}
            minDate={start}
            onChange={handleDatePickerChange('end')}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            title="End datetime"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and Notes</label>
          <input
            type="text"
            className={`form-control ${titleClassName}`}
            placeholder="Event title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            A small description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows={5}
            name="notes"
            value={notes}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save" />
          <span> Save</span>
        </button>
      </form>
    </ReactModal>
  );
};

export default CalendarModal;
