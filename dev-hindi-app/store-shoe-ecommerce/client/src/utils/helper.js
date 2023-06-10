export const calculateDiscountRate = (price, originalPrice) => {
  const discount = originalPrice - price;
  const discountRate = (discount / originalPrice) * 100;
  return discountRate.toFixed(2);
};
