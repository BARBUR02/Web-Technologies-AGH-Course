const board = document.getElementById('board');
const dot = document.querySelector('.dot');
console.log(dot);
const info = document.querySelector('.info');
const header = document.querySelector('.background-text');

board.addEventListener('click', function (e) {
  const leftPos =
    e.pageX - dot.offsetWidth / 2 <= board.offsetLeft
      ? board.offsetLeft + dot.offsetWidth / 2
      : Math.min(
          board.offsetLeft + board.offsetWidth - dot.offsetWidth / 2,
          e.pageX
        );
  const topPos =
    e.pageY - dot.offsetHeight / 2 <= board.offsetTop
      ? board.offsetTop + dot.offsetWidth / 2
      : Math.min(
          board.offsetTop + board.offsetHeight - dot.offsetHeight / 2,
          e.pageY
        );

  dot.style.top = `${topPos}px`;
  dot.style.left = `${leftPos}px`;
  console.log(e.pageY, e.pageX, dot.style.left);
});

window.addEventListener('click', function (e) {
  e.preventDefault();
  //   console.log(e.target);
  if (e.target === board || e.target === header) return;
  console.log(document.documentElement.clientHeight);
  const leftPos = Math.min(
    e.pageX,
    Math.max(document.documentElement.clientWidth, window.innerWidth) -
      info.offsetWidth
  );
  const topPos = Math.min(
    e.pageY,
    Math.max(document.documentElement.clientHeight, window.innerHeight) -
      info.offsetHeight
  );

  info.style.left = `${leftPos}px`;
  info.style.top = `${topPos}px`;
  info.style.opacity = '1';
  this.setTimeout(() => {
    info.style.opacity = '0';
  }, 400);
});

console.log(board.offsetTop);
console.log(board.offsetHeight);
console.log(board.offsetLeft);
console.log(board.offsetWidth);
