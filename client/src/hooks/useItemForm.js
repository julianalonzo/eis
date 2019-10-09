import { useState } from 'react';

function useItemForm(initialValues) {
  const [itemForm, setItemForm] = useState({
    itemName: initialValues.itemName || '',
    itemCategory: initialValues.itemCategory || '',
    itemCondition: initialValues.itemCondition || '',
    properties: initialValues.properties || []
  });

  return [itemForm, setItemForm];
}

export default useItemForm;
