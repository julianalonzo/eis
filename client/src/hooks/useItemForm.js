import { useState } from 'react';

function useItemForm(initialValues) {
  const [itemForm] = useState({
    itemName: initialValues.itemName || '',
    itemCategory: initialValues.itemCategory || '',
    itemCondition: initialValues.itemCondition || '',
    properties: initialValues.properties || []
  });

  return itemForm;
}

export default useItemForm;
