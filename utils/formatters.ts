export const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};