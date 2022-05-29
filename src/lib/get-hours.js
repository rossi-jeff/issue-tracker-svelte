export const GetHours = (/** @type {{ Start: { Date: any; Time: any; }; End: { Date: any; Time: any; }; }} */ clock) => {
  let sDate,
    eDate,
    ms,
    hours = 0;
  if (clock.Start.Date && clock.Start.Time) {
    sDate = new Date(`${clock.Start.Date} ${clock.Start.Time}`);
  }
  if (clock.End.Date && clock.End.Time) {
    eDate = new Date(`${clock.End.Date} ${clock.End.Time}`);
  }
  if (sDate && eDate) {
    ms = eDate.getTime() - sDate.getTime();
    hours = Math.round(ms / 36000) / 100;
  }
  return hours;
};