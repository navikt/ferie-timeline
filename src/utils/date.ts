export const prettyDayMonth = (date: Date) => {
  return `${date.getDate()} ${monthIntToString(date.getMonth())}`;
};

export const monthIntToString = (month: number) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "Mai";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Okt";
    case 10:
      return "Nov";
    case 11:
      return "Des";
    default:
      return "???";
  }
};
