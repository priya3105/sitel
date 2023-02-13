export function getNextSevenDays(): string[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu',];
  const next7Days = [];
  for (let i = 0; i < 5; i++) {
    next7Days.push(days[new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).getDay()]);
  }
  return next7Days;
}
