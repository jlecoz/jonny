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

function toDate({ month, year }) {
  return new Date(year, month - 1, 1);
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

export function formatDateRange(start, end) {
  const startLabel = formatMonthYear(start);
  const endLabel = end ? formatMonthYear(end) : "Present";
  return `${startLabel} – ${endLabel}`;
}

export function formatGroupCompanyMeta(group) {
  if (group.tenureStart) {
    const type = group.employmentType ?? "Full-time";
    const range = formatDateRange(group.tenureStart, group.tenureEnd);
    const location = group.location ? ` · ${group.location}` : "";
    return `${type} · ${range}${location}`;
  }

  return group.companyTagline ?? "";
}

export function formatRolePeriod(role, { includeDuration = true } = {}) {
  if (!role.periodStart) return role.periodLine ?? "";

  const start = toDate(role.periodStart);
  const end = role.periodEnd ? toDate(role.periodEnd) : new Date();
  const range = formatDateRange(role.periodStart, role.periodEnd);

  if (!includeDuration) return range;

  const duration = formatDuration(computeDuration(start, end));
  return `${range} · ${duration}`;
}
