import { useState } from 'react';

function useDialogState(initialValue = false) {
  const [dialogState, setDialogState] = useState(initialValue);

  const openDialogHandler = () => {
    setDialogState(true);
  };

  const closeDialogHandler = () => {
    setDialogState(false);
  };

  return [dialogState, openDialogHandler, closeDialogHandler];
}

export default useDialogState;
