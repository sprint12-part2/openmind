import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function fromNow(date, now) {
  const currentDate = dayjs(now);
  const formatDate = dayjs(date);

  if (formatDate.isSame(currentDate) || formatDate.isAfter(currentDate)) {
    return "방금전";
  }

  return formatDate.from(currentDate);
}
