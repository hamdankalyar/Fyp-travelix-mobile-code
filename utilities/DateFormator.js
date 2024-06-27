export const startAndEndDate = (dateStr) => {
  const [startDateStr, endDateStr] = dateStr.split(" - ");

  //   console.log(startDateStr, endDateStr);
  // Parse the date strings into Date objects
  //   const startDate = new Date(startDateStr);
  //   const endDate = new Date(endDateStr);
  return [startDateStr, endDateStr];
};
