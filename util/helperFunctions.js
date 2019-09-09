exports.toArray = variable => {
  let array = [];

  if (!Array.isArray(variable)) {
    array.push(variable);
  } else {
    array = variable;
  }

  return array;
};

exports.parseElementsToJSON = variable => {
  const parsedElements = this.toArray(variable).map(element => {
    return JSON.parse(element);
  });

  return parsedElements;
};
