/*
HW_21-22_TEXT
1.
 
a) Создайте несколько объектов-продуктов. В каждом объекте
должно быть поле name (название), description(описание), price(цена),
info (функция, которая формирует строку вида:
`товар: notebook lenovo thinkpad; цена: 1283 описание: cpu intel core7, ram:16gb ...`
 
b) создайте конструктор для создания объектов-товаров.
Создайте несколько товаров
 
с) Создайте массив из товаров. Напишите функцию, которая
выводит в консоль информацию о всех товарах в виде:
```
Tовар 1
    name: notebook lenovo thinkpad
    price: 1283
    description: .....
    info: ....
```  
т.е. `поле: значение` При этом: поля, которые являются
функциями, нужно выводить результат работы функции
(не текст функции)
 
2.ADV****  Как обязательная на понедельник 31.08.2026
 
### 2
a)
Создай функцию-конструктор объектов Account(iban,owner, balance),
которая возвращает объект с:
- номер счета (iban)
- именем владельца (owner)
- балансом (balance)  
методами:
- **deposit**(amount) — пополнение счёта
- **withdraw**(amount) — снятие денег (если хватает баланса)
- **getBalance**() — вывод текущего баланса
 
Создайте несколько объектов счетов. Создайте массив из
счетов. Выведите информацию о всех счетах в консоль
 
b) напишите функцию, transfer, которая получает два счета,
и выполняет перевод между счетами вызывая методы deposit и
withdraw соответственно.
 
с) (чуть сложнее****************)
 В качестве результата функции transaer, в случае успешной
операции, должен cформироваться объект:
- account1 (счет списания),
- account2 (счет зачисления),
- amount (сумма)
- transactionInfo() (функция, которая выводит информацию о транзакции)  
 
Если транзакция прошла неуспешно, объект должен содержать
еще и поле error c информацией об ошибке. Естественно,
transactionInfo() должна в этом случае выводить информацию
о неуспешной транзакции. В случае, если транзакция успешна,
поля error не должно быть.
 
 
// */

const productManual1 = {
    name: 'notebook lenovo thinkpad',
    description: 'cpu intel core7, ram:16gb',
    price: 1283,
    info: function() {
        return `товар: ${this.name}; цена: ${this.price}; описание: ${this.description}`;
    }
};

const productManual2 = {
    name: 'hp victus',
    description: 'cpu intel core i5, ram:8gb',
    price: 2025,
    info: function() {
        return `товар: ${this.name}; цена: ${this.price}; описание: ${this.description}`;
    }
};

const productManual3 = {
    name: 'dell xps',
    description: 'cpu intel core i7, ram:16gb',
    price: 1800,
    info: function() {
        return `товар: ${this.name}; цена: ${this.price}; описание: ${this.description}`;
    }
};

console.log(productManual1.info());
console.log(productManual2.info());
console.log(productManual3.info());


function Product(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.info = function() {
        return `товар: ${this.name}; цена: ${this.price}; описание: ${this.description}`;
    };
}

const product1 = new Product('notebook lenovo thinkpad', 'cpu intel core7, ram:16gb', 1283);
const product2 = new Product('hp victus', 'cpu intel core i5, ram:8gb', 2025);
const product3 = new Product('dell xps', 'cpu intel core i7, ram:16gb', 1800);

const products = [product1, product2, product3];

function getProductsInfo(products) {
    let res = '';

    for (let i = 0; i < products.length; i++) {
        res += 'Товар ' + (i + 1) + '\n';

        for (let key in products[i]) {
            if (typeof products[i][key] === 'function') {
                res += key + ': ' + products[i][key]() + '\n';
            } else {
                res += key + ': ' + products[i][key] + '\n';
            }
        }

        res += '\n';
    }

    return res;
}

console.log(getProductsInfo(products));


function Account(iban, owner, balance) {
    this.iban = iban;
    this.owner = owner;
    this.balance = balance;

    this.deposit = function(amount) {
        this.balance += amount;
    };

    this.withdraw = function(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return true;
        } else {
            return false;
        }
    };

    this.getBalance = function() {
        return this.balance;
    };
}


const account1 = new Account('123456789', 'Alice', 1000);
const account2 = new Account('987654321', 'Bob', 500);
const account3 = new Account('555555555', 'Kate', 2000);

const accounts = [account1, account2, account3];


function getAccountsInfo(accounts) {
    let res = '';

    for (let i = 0; i < accounts.length; i++) {
        res += 'Счет ' + (i + 1) + '\n';
        res += 'iban: ' + accounts[i].iban + '\n';
        res += 'owner: ' + accounts[i].owner + '\n';
        res += 'balance: ' + accounts[i].getBalance() + '\n';
        res += '\n';
    }

    return res;
}

console.log(getAccountsInfo(accounts));


function transfer(account1, account2, amount) {
    let result = {
        account1: account1,
        account2: account2,
        amount: amount
    };

    if (account1.withdraw(amount)) {
        account2.deposit(amount);

        result.transactionInfo = function() {
            return 'Транзакция успешна. Со счета ' + this.account1.iban +
                ' переведено ' + this.amount +
                ' на счет ' + this.account2.iban;
        };
    } else {
        result.error = 'Недостаточно средств';

        result.transactionInfo = function() {
            return 'Транзакция не выполнена. Ошибка: ' + this.error +
                '. На счете ' + this.account1.iban +
                ' недостаточно средств для перевода ' + this.amount;
        };
    }

    return result;
}


const transaction1 = transfer(account1, account2, 300);

console.log(transaction1.transactionInfo());
console.log(getAccountsInfo(accounts));


const transaction2 = transfer(account2, account3, 5000);

console.log(transaction2.transactionInfo());
console.log(getAccountsInfo(accounts));