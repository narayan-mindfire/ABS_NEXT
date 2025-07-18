export function isOld(date: string, time: string): boolean {
  if (!date || !time) return false;
  const combined = new Date(`${date}T${time}:00`);
  return combined.getTime() < new Date().getTime();
}
