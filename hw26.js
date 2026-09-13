// ## HW_26_TEXT
// Используя два информационных ресурса (API) - https://jsonplaceholder.typicode.com/users и https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
// 1. Получить список пользователей (users) с ресурса https://jsonplaceholder.typicode.com/users
// 2. Для каждого пользователя получить его географические координаты (latitude и longitude)
// 3. Используя эти координаты, получить текущую погоду для каждого пользователя с ресурса https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
// 4. Определить пользователя с самой высокой температурой и вывести его имя, телефон
//  и температуру в консоль.

//  Решите задачу с использованием
//  5.fetch
//  6.axios (для одного из запросов).

import axios from "axios";

const response = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await response.json();
// console.log(users);

let hottestUser = null;

for (let i = 0; i < users.length; i++) {
  const user = users[i];
  const lat = user.address.geo.lat;
  const lon = user.address.geo.lng;

  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const weatherData = await axios.get(weatherURL);
  const temperature = weatherData.data.current_weather.temperature;
  if (hottestUser === null || temperature > hottestUser.temperature) {
    hottestUser = {
      name: user.name,
      phone: user.phone,
      temperature: temperature,
    };
  }
}

console.log("=== Получение пользователя с самой высокой температурой ===");
console.log(
  "Name: " +
    hottestUser.name +
    "\n" +
    "Phone number: " +
    hottestUser.phone +
    "\n" +
    "Temperature: " +
    hottestUser.temperature,
);
