const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonthYear({ month, year }) {
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

function computeDuration(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

function formatDuration({ years, months }) {
  const yearPart = years > 0 ? `${years} yr${years === 1 ? "" : "s"}` : "";
  const monthPart =
    months > 0 ? `${months} ${months === 1 ? "month" : "months"}` : "";

  if (yearPart && monthPart) return `${yearPart} and ${monthPart}`;
  return yearPart || monthPart || "0 months";
}

export function formatRolePeriod(role) {
  if (!role.periodStart) return role.periodLine ?? "";

  const start = new Date(role.periodStart.year, role.periodStart.month - 1, 1);
  const end = role.periodEnd
    ? new Date(role.periodEnd.year, role.periodEnd.month - 1, 1)
    : new Date();

  const startLabel = formatMonthYear(role.periodStart);
  const endLabel = role.periodEnd ? formatMonthYear(role.periodEnd) : "Present";
  const duration = formatDuration(computeDuration(start, end));

  return `${startLabel} - ${endLabel} · ${duration}`;
}
