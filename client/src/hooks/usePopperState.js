import { useState } from 'react';

function usePopperState(initialValue = null) {
  const [anchorEl, setAnchorEl] = useState(initialValue);

  const openPopperHandler = anchorEl => {
    setAnchorEl(anchorEl);
  };

  const closePopperHandler = () => {
    setAnchorEl(null);
  };

  return [anchorEl, openPopperHandler, closePopperHandler];
}

export default usePopperState;
