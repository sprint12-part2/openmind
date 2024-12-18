import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function fromNow(date) {
  const now = dayjs();
  const formatDate = dayjs(date);

  if (formatDate.isSame(now) || formatDate.isAfter(now)) {
    return "방금전";
  }

  return formatDate.fromNow();
}
