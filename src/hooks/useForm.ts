import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialState = {}) => {
  const [values, setValues] = useState<T>(initialState as T);

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const handleDatePickerChange = (inputName: string) => (date: Date | null) => {
    setValues((state) => ({
      ...state,
      [inputName]: date,
    }));
  };

  const resetForm = (newState = initialState) => {
    setValues(newState as T);
  };

  return [
    values,
    handleInputChange,
    handleDatePickerChange,
    resetForm,
    // FIXME:
    // Shouldn't expose this method, resetForm is causing max call stacked
    setValues,
  ] as const;
};
