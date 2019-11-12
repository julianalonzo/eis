export function formatFileSize(rawFileSize) {
  const i = Math.floor(Math.log(rawFileSize) / Math.log(1024));
  return (
    (rawFileSize / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export function getParamValueByKey(paramsString, key) {
  const params = new URLSearchParams(paramsString);
  const value = params.get(key);

  return value;
}

export function parseFormSubmissionError(errors) {
  let submissionErrors = {};
  for (const error of errors) {
    submissionErrors = {
      ...errors,
      [error.param]: error.msg
    };
  }

  return submissionErrors;
}
