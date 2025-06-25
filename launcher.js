const fs = require('fs');
const startBot = require('./bots');

const spawnHexes = fs.readFileSync('./spawnList.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

for (let i = 0; i < spawnHexes.length; i++) {
  setTimeout(() => {
    startBot(spawnHexes[i]);
  }, i * 500); // Задержка между ботами
}
