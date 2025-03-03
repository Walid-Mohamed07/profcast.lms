export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  // Format to dd/mm/yyyy
  return `${day}/${month}/${year}`;
};
