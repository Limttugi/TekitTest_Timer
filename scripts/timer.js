const timerArr = document.querySelectorAll('.inputTime');
const startBtnElement = document.querySelector('.start-btn');
const pauseBtnElement = document.querySelector('.pause-btn');
const resetBtnElement = document.querySelector('.reset-btn');

timerArr.forEach((timer, index) => {
  // Hour Timer
  if (index === 0) {
    timer.addEventListener('input', e => {
      zeroEnteredInTimerEvent(e);

      if (e.target.value >= 24) {
        alert('최대 23까지 입력 가능합니다.');
        e.target.value = 23;
      }
    });
  } // Not Hour Timer
  else
    timer.addEventListener('input', e => {
      zeroEnteredInTimerEvent(e);

      if (e.target.value >= 60) {
        alert('최대 59까지 입력 가능합니다.');
        e.target.value = 59;
      }
    });
});
// input === 0 event
function zeroEnteredInTimerEvent(e) {
  if (parseInt(e.target.value) === 0) buttonDisabled();
  else buttonShow();
}

function buttonDisabled() {
  startBtnElement.disabled = true;
  resetBtnElement.disabled = true;
  startBtnElement.className = 'btn start-btn disabled';
  resetBtnElement.className = 'btn reset-btn disabled';
}

function buttonShow() {
  startBtnElement.disabled = false;
  resetBtnElement.disabled = false;
  startBtnElement.className = 'btn start-btn';
  resetBtnElement.className = 'btn reset-btn';
}

let timerInterval;
// 타이머 숫자 줄어드는 이벤트
function startTimer() {
  timerInterval = setInterval(() => {
    timerArr[2].value -= 1;

    if (parseInt(timerArr[2].value) < 0) {
      timerArr[1].value -= 1;
      timerArr[2].value = 59;
      if (parseInt(timerArr[1].value) < 0) {
        timerArr[0].value -= 1;
        timerArr[1].value = 59;
      }
    }

    // 종료조건
    if (parseInt(timerArr[0].value) === 0 && parseInt(timerArr[1].value) === 0 && parseInt(timerArr[2].value) === 0) {
      resetTimer();
      setZeroInTimer();
      buttonDisabled();
    }
  }, 1000);
}

function setZeroInTimer() {
  timerArr[0].value = '00';
  timerArr[1].value = '00';
  timerArr[2].value = '00';
}

function resetTimer() {
  clearInterval(timerInterval);
}

function toggleReadOnlyInInput() {
  if (timerArr[0].disabled) timerArr.forEach(btn => (btn.disabled = false));
  else timerArr.forEach(btn => (btn.disabled = true));
}

startBtnElement.addEventListener('click', () => {
  startTimer();
  toggleReadOnlyInInput();
  startBtnElement.style.display = 'none';
  pauseBtnElement.style.display = 'flex';
});

pauseBtnElement.addEventListener('click', () => {
  toggleReadOnlyInInput();
  resetTimer();
  startBtnElement.style.display = 'flex';
  pauseBtnElement.style.display = 'none';
});

resetBtnElement.addEventListener('click', () => {
  resetTimer();
  setZeroInTimer();
  buttonDisabled();
  toggleReadOnlyInInput();
  startBtnElement.style.display = 'flex';
  pauseBtnElement.style.display = 'none';
});
