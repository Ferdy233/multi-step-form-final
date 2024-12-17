import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { validateForm } from '../Utils/validateForm/validateForm';
// import { FormData } from '../types/formTypes';

interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedPlan: {
    type: string;
    price: number;
  };
  billingType: 'monthly' | 'yearly';
  selectedAddOns: string[];
}

interface Errors {
  name: string;
  email: string;
  phone: string;
  plan: string
}
interface FormState {
  step: number;
  formData: FormData;
  errors: Errors;
  isConfirmed: boolean;
  isSubmitted: boolean;
}

const initialFormDataValues: FormData = {
  name: '',
  email: '',
  phone: '',
  selectedPlan: {
    type: '',
    price: 0,
  },
  billingType: 'monthly',
  selectedAddOns: [],
}

const initialErrors: Errors = {
  name: '',
  email: '',
  phone: '',
  plan: ''
}

const initialState: FormState = {
  step: 1,
  formData: initialFormDataValues,
  errors: initialErrors,
  isConfirmed: false,
  isSubmitted: false
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Personal Info
    setPersonalInfo: (state, action: PayloadAction<{
      name?: string;
      email?: string;
      phone?: string;
    }>) => {
        state.formData = {...state.formData, ...action.payload}
    },

    // Plan Selection
    setPlan: (state, action: PayloadAction<{
      type: string;
      price: number;
    }>) => {
      state.formData.selectedPlan = action.payload;
    },

    toggleBillingType: (state) => {
      state.formData.billingType = state.formData.billingType === 'monthly' ? 'yearly' : 'monthly';
    },

    // Add-ons
    toggleAddOn: (state, action: PayloadAction<string>) => {
      const addOnIndex = state.formData.selectedAddOns.indexOf(action.payload);
      if (addOnIndex > -1) {
        state.formData.selectedAddOns.splice(addOnIndex, 1);
      } else {
        state.formData.selectedAddOns.push(action.payload);
      }
    },

    // Step Navigation
    incrementStep: (state) => {
      if (state.step < 4) state.step += 1;
    },

    decrementStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },

    // Reset
    resetForm: (state) => state = initialState,

    handleNextStepClick: (state) => {
      if(state.step === 4) state.isConfirmed = true
      const errors = validateForm(state.formData);
      state.errors = {...state.errors, ...errors};
    },

    validate: state => {
      const errors = validateForm(state.formData);
      state.errors = {...state.errors, ...errors};
    },

    handleFormChange: (state, action: PayloadAction<{fieldToUpdate: Partial<FormData>}>) => {
      const { fieldToUpdate } = action.payload;
      state.formData = { ...state.formData, ...fieldToUpdate };
    },

    handleSubmitValidation: state => {
      state.isSubmitted = true
      validate();
    }
  }
});

export const {
  setPersonalInfo,
  setPlan,
  toggleBillingType,
  toggleAddOn,
  incrementStep,
  decrementStep,
  setStep,
  resetForm,
  validate
} = formSlice.actions;

export const selectStep = (state: RootState) => state.form.step;
export const selectForm = (state: RootState) => state.form.formData;
export const selectErrors = (state: RootState) => state.form.errors;
export const selectIsConfirmed = (state: RootState) => state.form.isConfirmed;
export const selectIsSubmitted = (state: RootState) => state.form.isSubmitted;

export default formSlice.reducer;