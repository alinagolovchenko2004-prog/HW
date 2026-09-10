import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const filePath = path.resolve("fridge.csv");

function convertToCsv(fridge) {
  let csv = "Наименование,Количество\n";

  for (let i = 0; i < fridge.length; i++) {
    csv += fridge[i].name + "," + fridge[i].count + "\n";
  }

  return csv;
}

async function saveToCsv(fridge) {
  const csvData = convertToCsv(fridge);
  await writeFile(filePath, csvData, "utf-8");
}

function printFridge(fridge) {
  console.log("Список продуктов в холодильнике:");

  if (fridge.length === 0) {
    console.log("Холодильник пуст.");
    return;
  }

  console.table(fridge);
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

    const productIndex = fridge.findIndex((product) => {
      return product.name.toLowerCase() === trimmedName.toLowerCase();
    });

    if (productIndex !== -1) {
      if (count === 0) {
        fridge.splice(productIndex, 1);
        console.log(`Продукт "${trimmedName}" удален из списка.`);
      } else {
        fridge[productIndex].count = count;
        console.log(
          `Количество продукта "${trimmedName}" изменено на ${count}.`,
        );
      }
    } else {
      if (count === 0) {
        console.log(`Продукта "${trimmedName}" нет в списке. Удалять нечего.`);
      } else {
        fridge.push({
          name: trimmedName,
          count: count,
        });

        console.log("Продукт добавлен:", {
          name: trimmedName,
          count: count,
        });
      }
    }

    await saveToCsv(fridge);
    printFridge(fridge);
  }

  rl.close();

  await saveToCsv(fridge);

  console.log(`Данные сохранены в файл: ${filePath}`);

  try {
    const fileData = await readFile(filePath, "utf-8");
    console.log("Данные из CSV файла:");
    console.log(fileData);
  } catch (error) {
    console.error("Ошибка при чтении файла:", error.message);
  }
}

runFridgeApp();
