/**
 * utility function, checks whether the given date and time combination is in the past.
 *
 * @param {string} date - The date in `YYYY-MM-DD` format.
 * @param {string} time - The time in `HH:MM` (24-hour) format.
 * @returns {boolean} - Returns `true` if the combined date and time is in the past, otherwise `false`.
 */
export function isOld(date: string, time: string): boolean {
  if (!date || !time) return false;
  const combined = new Date(`${date}T${time}:00`);
  return combined.getTime() < new Date().getTime();
}
