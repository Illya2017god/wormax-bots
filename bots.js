const WebSocket = require('ws');

function hexToBuffer(hex) {
  return Buffer.from(hex, 'hex');
}

function startBot(spawnHex) {
  const ws = new WebSocket('wss://eu2.wormax.io/ws/9090');

  ws.on('open', () => {
    console.log('[🔗] Подключено');
    const packet = hexToBuffer(spawnHex);
    ws.send(packet);
    console.log('[📤] Отправлен spawn HEX');
  });

  ws.on('message', (data) => {
    // можно добавить логика реакции на сервер
  });

  ws.on('close', () => {
    console.log('[❌] Соединение закрыто');
  });

  ws.on('error', (err) => {
    console.error('[⚠️] Ошибка:', err.message);
  });
}

module.exports = startBot;