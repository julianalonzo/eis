import { useState } from 'react';

function useItemForm(initialValues) {
  const { name, category, condition, properties } = initialValues;

  const [itemForm, setItemForm] = useState({
    name: name || '',
    category: category || '',
    condition: condition || '',
    properties: properties || []
  });

  return [itemForm, setItemForm];
}

export default useItemForm;
