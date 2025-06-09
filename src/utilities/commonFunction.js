import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const classNames = (...classes) => {
  return classes.join(" ").split(/\s+/).filter(Boolean).join(" ");
};

export const profileName = (name) => {
  let result = "";

  if (name) {
    let processedName = name.split(" ");

    if (processedName.length === 1 && processedName[0].length > 1) {
      result = processedName[0].charAt(0) + processedName[0].charAt(1);
    } else if (processedName.length >= 2) {
      result = processedName[0].charAt(0) + processedName[1].charAt(0);
    } else {
      result = processedName[0].charAt(0);
    }
  } else {
    result = "NA";
  }

  return result.toUpperCase();
};

export function convertToUserTimezone(utcDate) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const FMT = "DD-MM-YYYY hh:mm A";
  const parsedUtc = dayjs.tz(utcDate, FMT, "UTC");
  return parsedUtc.tz(userTimeZone).format(FMT);
}
