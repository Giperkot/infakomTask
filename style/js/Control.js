/**
 * Created by Stvolov IS on 09.05.2017.
 */

(function () {
    function Control () {
        this.data = {};
        this.sortedField = "";
        this.radioButtonOrder = 0;
    }

    Control.prototype.refrashTable = function () {
        htmlBuilder.buildTable(this.data);
    };

    Control.prototype.buildTable = function () {
        var users = [];
        // Для начала данные нужно преобразовать в удобный массив, который будет удобн сортировать.
        for (var i = 0; i < this.data.users.length; i++) {
            var userInfo = this.data.users[i];
            for (user in userInfo) {
                //var smth = {user: user, rating: userInfo[user]};
                var smth = {};
                smth[this.data.columns[0]] = user;
                smth[this.data.columns[1]] = userInfo[user];
                users.push(smth);
            }
        }

        this.data.users = users;
        console.log(this.data);
        htmlBuilder.buildTable(this.data);
    };

    // Сортировка данных.
    Control.prototype.sortData = function (columnName) {
        this.sortedField = columnName;
        var comparator = this.comparator(columnName);

        // По возрастанию или убыванию.
        this.radioButtonOrder = htmlBuilder.getOrder();

        this.data.users.sort(comparator);
        console.log(this.data.users);

    };

    Control.prototype.buildButtons = function () {

        // Создание кнопок для сортировки.
        for (var i = 0; i < this.data.columns.length; i++) {
            htmlBuilder.createButton(this.data.columns[i]);
        }

    };

    Control.prototype.parseData = function (data) {
        this.data = JSON.parse(data);
        console.log(data);
    };

    Control.prototype.httpGet = function (url) {

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.send();
        });
    };

    // Компаратор для сортировки.
    Control.prototype.comparator = function () {
        return function (a, b) {
            var result = (a[control.sortedField] > b[control.sortedField]) ? 1 :
                    (a[control.sortedField] == b[control.sortedField]) ? 0 : -1;

            return (control.radioButtonOrder == 1) ? result : -result;
        };
    };


    var control = new Control();
    window.control = control;
})();