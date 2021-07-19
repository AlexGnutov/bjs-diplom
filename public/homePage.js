
//Выход из личного кабинета
let logoutButton = new LogoutButton();

logoutButton.action = function () {
    ApiConnector.logout(logoutResponse);
}
function logoutResponse(reply) {
    if (reply.success === true) {
        clearInterval(stocksInterval);
        location.reload();
    } else {
        form.setLoginErrorMessage(reply.error);
    }
}

//Загрузка информации о пользователе
ApiConnector.current(getUserData);
function getUserData(reply) {
    if (reply.success === true) {
        ProfileWidget.showProfile(reply.data);
    } 
}

//Получение текущих курсов валют
let ratesBoard = new RatesBoard();

ApiConnector.getStocks(setStocks);
let stocksInterval = setInterval(ApiConnector.getStocks, 60000, setStocks);

function setStocks(reply) {
   if (reply.success === true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(reply.data);
       // console.log("stock renewed");
   }
}

//Операции с деньгами

let moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, addMoneyResponse);
}
function addMoneyResponse(reply) {
    if (reply.success === true) {
        ProfileWidget.showProfile(reply.data);
        moneyManager.setMessage(true, 'Выполнено успешно')
    } else {
        moneyManager.setMessage(false, reply.error);
    }   
}

//Конвертирование валюты
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, convertMoneyResponse);
}
function convertMoneyResponse(reply) {
    if (reply.success === true) {
        ProfileWidget.showProfile(reply.data);
        moneyManager.setMessage(true, 'Выполнено успешно')
    } else {
        moneyManager.setMessage(false, reply.error);
    }   
}

//Перевод валюты
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, sendMoneyResponse);
} 
function sendMoneyResponse(reply) {
    if (reply.success === true) {
        ProfileWidget.showProfile(reply.data);
        moneyManager.setMessage(true, 'Выполнено успешно')
    } else {
        moneyManager.setMessage(false, reply.error);
    }   
}

//Работа с избранным - начальный список
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(getFavoritesResponse);

function getFavoritesResponse(reply) {
    if (reply.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(reply.data);
        moneyManager.updateUsersList(reply.data);
    }
}

//Добавление пользователя
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, addUserToFavoritesResponse);
}

function addUserToFavoritesResponse(reply) {
    if (reply.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(reply.data);
        moneyManager.updateUsersList(reply.data);
        moneyManager.setMessage(true, 'Выполнено успешно')
    } else {
        moneyManager.setMessage(false, reply.error);
    }
}

//Удаление пользователя
favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, removeUserFromFavoritesResponse);
}

function removeUserFromFavoritesResponse(reply) {
    if (reply.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(reply.data);
        moneyManager.updateUsersList(reply.data);
        moneyManager.setMessage(true, 'Пользователь удалён');
    } else {
        moneyManager.setMessage(false, reply.error);
    }
}