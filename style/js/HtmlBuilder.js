/**
 * Created by Stvolov IS on 09.05.2017.
 */

(function () {
    function HtmlBuilder () {
        this.data = {};
        this.leftColumn = document.getElementById("left_column");
        this.center_column = document.getElementById("center_column");
        this.radioButtons = document.getElementsByName("sort");
    }

    // Получение включенной радиокнопки.
    // По возрастанию или убыванию.
    HtmlBuilder.prototype.getOrder = function (title) {
        if (this.radioButtons[0].checked) {
            return 1;
        } else {
            return 0;
        }
    };

    // рисуем кнопки.
    HtmlBuilder.prototype.createButton = function (title) {
        var button = document.createElement('button');
        button.className = "control_button";
        button.innerHTML = title;

        this.leftColumn.appendChild(button);
    };

    /*
     * Отображение таблицы
     * Обычно делаю спомощью шаблонизаторов (handlebars, lodash),
     * таким образом реализовано, исключительно для разнообразия.
     */
    HtmlBuilder.prototype.buildTable = function (data) {
        var table = document.createElement('table');
        table.className = "data_table";

        var titleTr = document.createElement("tr");
        var titleTd = document.createElement("td");
        titleTd.setAttribute("colspan", "2");
        titleTd.innerHTML = data.title;
        titleTr.appendChild(titleTd);
        table.appendChild(titleTr);

        var tr = document.createElement("tr");
        for (var i = 0; i < data.columns.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = data.columns[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);

        for (var i = 0; i < data.users.length; i++) {
            var userInfo = data.users[i];
            var tr = document.createElement("tr");

            var tdUser = document.createElement("td");
            tdUser.innerHTML = data.users[i][data.columns[0]];
            var tdRating = document.createElement("td");
            tdRating.innerHTML = data.users[i][data.columns[1]];
            tr.appendChild(tdUser);
            tr.appendChild(tdRating);

            table.appendChild(tr);
        }

        this.center_column.innerHTML = "";
        this.center_column.appendChild(table);


    };

    var htmlBuilder = new HtmlBuilder();
    window.htmlBuilder = htmlBuilder;
})();