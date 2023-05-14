// ===== Кнопка выхода из личного кабинета

const LogoutButton = new LogoutButton();
LogoutButton.action = () => {
	const callback = (response) => {
		if (response.success) {
			location.reload();
		}
	}
	ApiConnector.logout(callback);
}


// ===== Получение информации о пользователе

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});


// ===== Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

const repeatGetStocks = () => ApiConnector.getStocks((response) => {
	if (response.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(response.data);
	}
});

repeatGetStocks();

setInterval(repeatGetStocks, 60000);


// ===== Операции с деньгами

// ===== Пополнение баланса

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, "Пополнение выполнено успешно");
	} else {
		moneyManager.setMessage(response.error, "Ошибка");
	}
});


// ===== Конвертация валют 

moneyManager.conversionMoneyCallback = (data) => {

	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Конвертация выполнена успешно");
		} else {
			moneyManager.setMessage(response.error, "Ошибка");
		}
	})
}



// ===== Перевод валюты

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Перевод выполнен успешно");
		} else {
			moneyManager.setMessage(response.error, "Ошибка");
		}
	})
}


// ===== Работа с избранным

const favoriteWidgets = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoriteWidgets.clearTable();
		favoriteWidgets.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});


// ===== Добавление пользователя в список избранных

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь добавлен");
	} else {
		favoritesWidget.setMessage(response.error, "Ошибка");
	}
});


// ===== Удаление пользователя из избранного

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь удален");
	} else {
		favoritesWidget.setMessage(response.error, "Ошибка");
	}
});