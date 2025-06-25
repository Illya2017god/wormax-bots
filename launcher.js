// 📁 project structure:
// - bot.js
// - launcher.js
// - spawnList.txt
// - package.json

// 📦 package.json
{
  "name": "wormax-bot-cluster",
  "version": "1.0.0",
  "main": "launcher.js",
  "scripts": {
    "start": "node launcher.js"
  },
  "dependencies": {
    "ws": "^8.13.0"
  }
}

// 📜 spawnList.txt
// вставь сюда свои HEX-пакеты, по одному на строку
4f41494d77414d6e4a2f38516f71304d516e6c36654d78684141414142473176646d554143306468625756545a584a3261574e6c
4f41494d77414847346c38624c56494d516e6c36654d774d6341414142473176646d554143306468625756545a584a3261574e6c

// 📜 bot.js
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