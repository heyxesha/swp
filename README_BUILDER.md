 Для запуска демок необходимо
 1. Выполнить команду npm install
 2. Конфиг билдера лежит в файле buildTemplate.json
 3. Параметр mode в этом файле отвечает за то, будут ли демки собраны в режиме debug, или же в release. Соответственно
 значений у этого параметра может быть два: "debug" и "release"
 4. Выполнить команду "node build-app". Дождаться завершения.
 5. Выполнит команду "node app". Это запустит сервер с демками.
 6. Перейти на http://localhost:777/Controls-demo/app/Controls-demo%2FIndexOld, чтобы открыть разводящую

 // TODO
 Есть косяк с темой по умолчанию. Из-за него не грузятся шрифты сначала. Если переключиться на тему online, шрифты прилетят

 // TODO
 Не работает редирект на cdn
 Сейчас можно сделать симлинк на cdn в корне репозитория

 Для запуска unit-тестов, выполните команду "node test-server"