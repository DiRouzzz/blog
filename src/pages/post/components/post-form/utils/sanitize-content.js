export const sanitizeContent = (rawHtml) => {
  return rawHtml
    .replace(/&nbsp;/g, ' ') // убираем неразрывные пробелы
    .replace(/<br\s*\/?>/gi, '\n') // <br> -> \n
    .replace(/<\/div>\s*<div>/gi, '\n') // закрытие одного div и начало другого -> абзац
    .replace(/<\/?div>/gi, '') // удаляем div
    .replace(/<[^>]+>/g, '') // удаляем все остальные теги
    .replace(/[ \t]+/g, ' ') // убираем лишние пробелы
    .replace(/\n{3,}/g, '\n\n') // не больше двух подряд
    .trim(); // убираем пробелы по краям
};
