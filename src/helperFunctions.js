export const formatFileSize = rawFileSize => {
  const i = Math.floor(Math.log(rawFileSize) / Math.log(1024));
  return (
    (rawFileSize / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
};
