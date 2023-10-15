export const getErrorMessageByPropertyName = (
  obj: Record<string, any>,
  namePath: string
) => {
  const names = namePath.split(".");

  let value = obj;

  for (let prop of names) {
    if (value[prop]) {
      value = value[prop];
    } else {
      return undefined;
    }
  }

  return value.message;
};
