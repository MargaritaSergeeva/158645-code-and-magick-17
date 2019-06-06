'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var TEXT_GAP = 5;
var TEXT_HEIGHT = 15;
var TEXT_BLOCK_HEIGHT = 65;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + 10, y - 10, x + 50, y - 10, x + 80, y + 10);
  ctx.bezierCurveTo(x + 90, y, x + 120, y - 5, x + 140, y + 20);
  ctx.bezierCurveTo(x + 160, y + 10, x + 200, y, x + 240, y + 20);
  ctx.bezierCurveTo(x + 260, y + 10, x + 300, y, x + 340, y + 30);
  ctx.bezierCurveTo(x + 380, y + 10, x + 420, y + 40, x + 400, y + 90);
  ctx.bezierCurveTo(x + 410, y + 110, x + 420, y + 130, x + 400, y + 150);
  ctx.bezierCurveTo(x + 410, y + 170, x + 420, y + 190, x + 400, y + 210);
  ctx.bezierCurveTo(x + 410, y + 230, x + 420, y + 260, x + 360, y + 240);
  ctx.bezierCurveTo(x + 350, y + 250, x + 330, y + 260, x + 300, y + 240);
  ctx.bezierCurveTo(x + 270, y + 250, x + 230, y + 260, x + 200, y + 240);
  ctx.bezierCurveTo(x + 170, y + 250, x + 130, y + 260, x + 100, y + 240);
  ctx.bezierCurveTo(x + 70, y + 250, x + 30, y + 260, x + 10, y + 240);
  ctx.bezierCurveTo(x, y + 230, x + 5, y + 220, x + 20, y + 210);
  ctx.bezierCurveTo(x + 10, y + 190, x, y + 160, x + 20, y + 140);
  ctx.bezierCurveTo(x + 10, y + 120, x, y + 90, x + 20, y + 70);
  ctx.bezierCurveTo(x + 10, y + 60, x, y + 20, x, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', 300, 32);
  ctx.fillText('Список результатов:', 300, 50);

  for (var i = 0; i < names.length; i++) {
    var barHeight = times[i] * BAR_MAX_HEIGHT / getMaxElement(times);

    ctx.font = '14px PT Mono';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + TEXT_BLOCK_HEIGHT + BAR_MAX_HEIGHT + TEXT_GAP * 2);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + TEXT_BLOCK_HEIGHT + TEXT_GAP + (BAR_MAX_HEIGHT - barHeight) - TEXT_HEIGHT);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%' + ', 50%)';
    }

    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_Y + TEXT_BLOCK_HEIGHT + TEXT_GAP + (BAR_MAX_HEIGHT - barHeight), BAR_WIDTH, barHeight);
  }
};
