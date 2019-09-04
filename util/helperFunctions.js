exports.toArray = variable => {
  let array = [];

  if (!Array.isArray(variable)) {
    array = array.push(variable);
  } else {
    array = variable;
  }

  return array;
};
