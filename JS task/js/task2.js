const word = prompt('Input a word', 'test');
const numbTwo = 2;
function middleCharacter(word) {
  if (word && !word.trim() || word === '') {
    alert('Invalid value');
  } else
    if (word.length % numbTwo === 0) {
      let firstLetterIndex = word.length / numbTwo;
      const firstCharacter = word[--firstLetterIndex];
      const secondCharacter = word[word.length / numbTwo];
      if (firstCharacter === secondCharacter) {
        alert('Middle characters are the same');
      } else {
        alert(firstCharacter + secondCharacter);
      }
    } else {
      alert(word[Math.trunc(word.length / numbTwo)]);
    }
}
middleCharacter(word);