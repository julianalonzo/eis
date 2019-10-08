import { useState } from 'react';

function useThumbnailsForm(initialValue) {
  const [thumbnailsForm, setThumbnailsForm] = useState(initialValue || []);

  const addThumbnailsHandler = thumbnails => {
    setThumbnailsForm(previousThumbnails => {
      return previousThumbnails.concat(thumbnails);
    });
  };

  const removeThumbnailHandler = thumbnailIndex => {
    setThumbnailsForm(previousThumbnails => {
      return previousThumbnails.filter(
        (thumbnail, index) => index !== thumbnailIndex
      );
    });
  };

  return [thumbnailsForm, addThumbnailsHandler, removeThumbnailHandler];
}

export default useThumbnailsForm;
