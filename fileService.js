export async function readFromJsonFile(filePath) {
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`Не удалось прочитать файл продуктов: ${response.status}`);
  }

  return await response.json();
}
