export function crop(str: string, start: number, startChar: string, endChar: string) {
  let end = start;
  let aux = 0;
  while (end < str.length) {
    if (str[end] === startChar) aux++;
    if (str[end] === endChar) {
      aux--;
      if (aux == 0) break;
    }
    end++;
  }
  end++;
  return str.substring(start, end);
}
