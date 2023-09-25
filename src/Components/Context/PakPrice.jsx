const PakPrice = ({ price }) => {
  return Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2,
  }).format(price / 100);
};

export default PakPrice;
