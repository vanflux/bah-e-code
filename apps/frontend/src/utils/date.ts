export function formatDDMMYYYY(input: string | Date) {
  const date = typeof input === 'string' ? new Date(input) : input;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
