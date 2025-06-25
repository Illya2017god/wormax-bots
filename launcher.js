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
    // handle server messages if needed
  });

  ws.on('close', () => {
    console.log('[❌] Соединение закрыто');
  });

  ws.on('error', (err) => {
    console.error('[⚠️] Ошибка:', err.message);
  });
}

module.exports = startBot;

// 📜 launcher.js
const fs = require('fs');
const startBot = require('./bot');

const spawnHexes = fs.readFileSync('./spawnList.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

for (let i = 0; i < spawnHexes.length; i++) {
  setTimeout(() => {
    startBot(spawnHexes[i]);
  }, i * 500); // запуск с задержкой
}
