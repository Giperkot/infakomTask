/**
 * Created by Stvolov IS on 09.05.2017.
 *
 * Код написан с рассчётом, что нам неизвестны названия колонок.
 */

// Вешаем обработчик на загрузку страницы.
document.addEventListener("DOMContentLoaded", function () {
    // Делаем запрос
    control.httpGet("http://48ff049406e7.sn.mynetname.net:9999/?request=testtask")
        .then(function (response) {
            // Работаем с ответом.
            control.parseData(response);
            // рисуем кнопки.
            control.buildButtons();
            // Отображаем таблицу.
            control.buildTable();
        }, function (reject) {
            // Выводим сообщение об ошибке, если произошла ошибка.
            console.log(reject);
        });
}, true);

// Вешаем обработчик на клик по кнопкам.
document.addEventListener("click", function (e) {
    var target = e.target;

    if (target.tagName.toUpperCase() != "BUTTON") {
        return;
    }

    // target.innerHTML - хранит название колонки.
    control.sortData(target.innerHTML);
    // перерисовка таблицы.
    control.refrashTable();

}, false);

