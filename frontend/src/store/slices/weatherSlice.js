import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Create async thunk for fetching dropdown options
export const fetchDropdownOptions = createAsyncThunk(
  "weather/fetchDropdownOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("fetch-weather-data/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Network error";
      return rejectWithValue(error);
    }
  }
);

// Create async thunk for submitting form data
export const submitFormData = createAsyncThunk(
  "weather/submitFormData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "fetch-weather-data/",
        formData
      );
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Network error";
      return rejectWithValue(error);
    }
  }
);

// Create async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("all-data/");
      console.log("Response from fetchWeatherData:", response.data);
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Network error";
      return rejectWithValue(error);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    dropdownOptions: {
      region_choices: [],
      parameter_choices: [],
      year_choices: [],
    },
    formData: {
      region: "",
      parameter: "",
      year: "",
    },
    data: {
      metadata: "",
      monthly_data: [],
      seasonal_data: [],
      annual_data: [],
    },
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropdownOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDropdownOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.dropdownOptions = action.payload;
      })
      .addCase(fetchDropdownOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dropdown options.";
      })
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit form data.";
      })
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch weather data.";
      });
  },
});

export const { setFormData } = weatherSlice.actions;
export default weatherSlice.reducer;
