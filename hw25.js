import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const filePath = path.resolve("fridge.csv");

function convertToCsv(fridge) {
  let csv = "Наименование,Количество,Цена,Срок годности\n";

  for (let i = 0; i < fridge.length; i++) {
    csv +=
      fridge[i].name +
      "," +
      fridge[i].count +
      "," +
      fridge[i].price +
      "," +
      fridge[i].expirationDate +
      "\n";
  }

  return csv;
}

async function writeToCsvFile(fridge) {
  const csvData = convertToCsv(fridge);
  await writeFile(filePath, csvData, "utf-8");
}

async function readFromCsvFile() {
  const fileData = await readFile(filePath, "utf-8");
  return fileData;
}

async function displayFileCsvContents() {
  const fileData = await readFromCsvFile();

  console.log("Данные из CSV файла:");
  console.log(fileData);
}

function displayFridgeContents(fridge) {
  console.log("Список продуктов в холодильнике:");

  if (fridge.length === 0) {
    console.log("Холодильник пуст.");
    return;
  }

  console.table(fridge);
}

function findProductIndex(fridge, name) {
  return fridge.findIndex((product) => {
    return product.name.toLowerCase() === name.toLowerCase();
  });
}

function removeProduct(fridge, name) {
  const productIndex = findProductIndex(fridge, name);

  if (productIndex !== -1) {
    fridge.splice(productIndex, 1);
    return true;
  }

  return false;
}

function addOrUpdateProduct(fridge, name, count, price, expirationDate) {
  const productIndex = findProductIndex(fridge, name);

  if (productIndex !== -1) {
    fridge[productIndex].count = count;
    fridge[productIndex].price = price;
    fridge[productIndex].expirationDate = expirationDate;

    return "updated";
  }

  fridge.push({
    name: name,
    count: count,
    price: price,
    expirationDate: expirationDate,
  });

  return "added";
}

async function runFridgeApp() {
  const rl = readline.createInterface({ input, output });
  const fridge = [];

  const stopWords = ["exit", "выход", "стоп", "stop"];

  console.log("Программа для учета продуктов в холодильнике.");
  console.log("Введите продукты в холодильнике.");
  console.log("Для завершения введите: exit, выход, стоп или stop.");

  while (true) {
    const name = await rl.question("Введите наименование продукта: ");
    const trimmedName = name.trim();

    if (stopWords.includes(trimmedName.toLowerCase())) {
      break;
    }

    if (trimmedName === "") {
      console.log(
        "Наименование продукта не может быть пустым. Попробуйте снова.",
      );
      continue;
    }

    const countInput = await rl.question(
      `Введите количество продукта "${trimmedName}": `,
    );

    const count = Number(countInput.trim());

    if (Number.isNaN(count)) {
      console.log("Количество должно быть числом. Попробуйте снова.");
      continue;
    }

    if (count === 0) {
      const removed = removeProduct(fridge, trimmedName);

      if (removed) {
        console.log(`Продукт "${trimmedName}" удален из списка.`);
      } else {
        console.log(`Продукта "${trimmedName}" нет в списке. Удалять нечего.`);
      }

      await writeToCsvFile(fridge);
      displayFridgeContents(fridge);
      continue;
    }

    const priceInput = await rl.question(
      `Введите цену продукта "${trimmedName}": `,
    );

    const price = Number(priceInput.trim());

    if (Number.isNaN(price)) {
      console.log("Цена должна быть числом. Попробуйте снова.");
      continue;
    }

    const expirationDate = await rl.question(
      `Введите срок годности продукта "${trimmedName}": `,
    );

    const trimmedExpirationDate = expirationDate.trim();

    const result = addOrUpdateProduct(
      fridge,
      trimmedName,
      count,
      price,
      trimmedExpirationDate,
    );

    if (result === "updated") {
      console.log(`Продукт "${trimmedName}" обновлен.`);
    } else {
      console.log(`Продукт "${trimmedName}" добавлен.`);
    }

    await writeToCsvFile(fridge);
    displayFridgeContents(fridge);
  }

  rl.close();

  await writeToCsvFile(fridge);

  console.log(`Данные сохранены в файл: ${filePath}`);

  try {
    await displayFileCsvContents();
    displayFridgeContents(fridge);
  } catch (error) {
    console.error("Ошибка при работе с CSV файлом:", error.message);
  }
}

runFridgeApp();
