import { useState, useCallback, useEffect } from 'react';

// Define types for form data and errors
interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const useFormValidation = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Memoize validate function so it remains stable across re-renders
  const validate = useCallback(() => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'This field is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'This field is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'This field is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handle input changes and immediately set the form data
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect to validate form whenever formData changes
  useEffect(() => {
    if (isSubmitted) {
      validate(); // Run validation when form data changes
    }
  }, [formData, isSubmitted, validate]); // Validate whenever formData or submission state changes

  const handleSubmitValidation = () => {
    setIsSubmitted(true);
    return validate(); // Validate entire form on submit
  };

  return {
    formData,
    formErrors,
    isSubmitted,
    setIsSubmitted, // Return setIsSubmitted for manual submission handling
    handleFormChange,
    handleSubmitValidation,
  };
};

export default useFormValidation;
