export const formatCurrency = (value) => {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatQuantity = (value) => {
  return value.toLocaleString("en-IN");
};
