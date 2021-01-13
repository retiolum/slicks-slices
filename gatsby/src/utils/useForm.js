import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Handle numbers.
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // Copy existing values
      ...values,
      // Update changed value
      [e.target.name]: e.target.value,
    });
  }

  return { values, updateValue };
}
