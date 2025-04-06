import { useDispatch, useSelector } from "react-redux";
import {
  fetchDropdownOptions,
  submitFormData,
  fetchWeatherData,
  setFormData,
} from "../store/slices/weatherSlice";

const useWeatherApp = () => {
  const dispatch = useDispatch();
  const { dropdownOptions, formData, data, loading, error, message } =
    useSelector((state) => state.weather);

  const loadDropdownOptions = () => {
    dispatch(fetchDropdownOptions());
  };

  const submitForm = () => {
    dispatch(submitFormData(formData));
  };

  const loadWeatherData = () => {
    dispatch(fetchWeatherData());
  };

  const updateFormData = (field, value) => {
    dispatch(setFormData({ [field]: value }));
  };

  return {
    dropdownOptions,
    formData,
    updateFormData,
    submitForm,
    loadDropdownOptions,
    loadWeatherData,
    data,
    loading,
    error,
    message,
  };
};

export default useWeatherApp;
