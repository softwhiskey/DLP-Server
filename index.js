const net = require('net');
const mysql = require('mysql');

const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dlp'
});

db.connect((err) => 
{
    if (err) throw err;
    console.log('Connected to MySQL database!');
});
// * Инициализация сервера
const server = net.createServer((socket) => 
{
    //socket.write("testtt");
    console.log('Клиент подключился: ' + socket.remoteAddress + ':' + socket.remotePort);
    // * Вызывается при получении пакетов от клиента
    socket.on('data', (data) => 
    {
        console.log('Received: ' + data);
        socket.write("testtt");
        if (data.toString() === 'update') 
        {
            // * Выполняем запрос на получение данных о файловом наблюдении
            db.query('SELECT * FROM filewatching', (err, result) => {
                if (err) throw err;
                // * Отправляем данные клиенту в формате JSON
                const dataToSend = "updatefilewatching" + JSON.stringify(result);
                console.log(dataToSend);
                socket.write(dataToSend);
            });
            db.query('SELECT * FROM sniffinghosts', (err, result) => {
                if (err) throw err;
                // * Отправляем данные клиенту в формате JSON
                const dataToSend = "updatesniffinghosts" + JSON.stringify(result);
                console.log(dataToSend);
                socket.write(dataToSend);
            });
        } 
        else 
        {
            socket.write(data);
        }
    });
    // * Вызывается при отключении клиента
    socket.on('close', () => 
    {
        console.log('Клиент отключился');
    });
    // * Вызывается при ошибке
    socket.on('error', (err) => 
    {
        console.error('Ошибка: ', err);
    });
});
server.listen(8888, () => 
{
    console.log('Сервер запущен на порте 8888');
});





