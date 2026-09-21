const logMessage = require("./logger");


logMessage("Моё первое системное сообщение", (err) => {
  if (err) return;

  logMessage("Я вошла в систему", (err) => {
    if (err) return;

    logMessage("Завершение работы приложения", (err) => {
      if (err) return;
      console.log("Все задачи логирования выполнены.");
    });
  });
});