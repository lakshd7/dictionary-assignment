async function getDef(word) {
  try {
    const obj = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await obj.json();

    if (data.title) throw new Error;

    const wordObj = data[0];
    const meaning = wordObj.meanings;
    let meanings = [];
    meaning.forEach(m => {
      m.definitions.forEach(d => {
        meanings.push(d.definition)
      });
    });
    if (meanings.length > 4) meanings = meanings.splice(0, 4);
    const html = meanings.join('<br><br>');
    meaningEl.innerHTML = '';
    meaningEl.insertAdjacentHTML('beforeend', html);
  } catch {
    meaningEl.textContent = 'No definitions found';
  } finally {
    background.style.opacity = 1;
    background.style.pointerEvents = 'all';
  }
}

const formEl = document.querySelector('.cover form');
const inputEl = document.querySelector('.cover input')
const background = document.querySelector('.definition');
const modal = document.querySelector('.definition .container')
const closeBtn = document.querySelector('.close');
const wordEl = document.querySelector('.definition .word');
const meaningEl = document.querySelector('.definition .meaning');


let userInput;
formEl.addEventListener('submit', open)
background.addEventListener('click', close);
closeBtn.addEventListener('click', close);

function open(e) {
  e.preventDefault();
  userInput = inputEl.value;
  inputEl.blur();
  inputEl.value = '';

  wordEl.textContent = userInput;
  getDef(userInput);
}

function close(e) {
  if (e.target.closest('.definition .container') === modal && e.target !== closeBtn) return;
  background.style.opacity = 0;
  background.style.pointerEvents = 'none';
}