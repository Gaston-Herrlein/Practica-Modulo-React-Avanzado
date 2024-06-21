import { useState } from "react";
import { useSelector } from "react-redux";
// import { authLoginPending } from "../store/actions";
import { getUi } from "../store/selectors";

const getValueByType = {
  checkbox: ({ checked }) => checked,

  number: ({ value }) => Number(value),

  "select-multiple": ({ selectedOptions }) =>
    [...selectedOptions].map(({ value }) => value),

  file: ({ files }) => files[0] || null,
};

const defaultGetValue = ({ value }) => value;

function useForm(initialFormValue) {
  const { pending: isFetching } = useSelector(getUi);

  const [formValue, setFormValue] = useState(initialFormValue);

  const updateFormValue = (name, value) => {
    setFormValue((currentFormValue) => ({
      ...currentFormValue,
      [name]: value,
    }));
  };

  const handleChange = (ev) => {
    const valueGetter = getValueByType[ev.target.type] || defaultGetValue;
    updateFormValue(ev.target.name, valueGetter(ev.target));
  };

  const handleSubmit = (onSubmit) => (ev) => {
    ev.preventDefault();
    onSubmit(formValue);
  };

  const validate = (username, password) => {
    return !username || !password || isFetching;
  };

  return {
    formValue,
    setFormValue,
    handleChange,
    handleSubmit,
    validate,
  };
}

export default useForm;
