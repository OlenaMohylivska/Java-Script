const batteries = +prompt('input amount of batteries', 0);
const defectiveBatteries = +prompt('input percentage of defective batteries', 0);
const maxAmount = 100;
const twoCharacters = 2;

function calculate(batteries, defectiveBatt) {
  if (batteries > 0 && defectiveBatt >= 0 && defectiveBatt <= maxAmount) {
    const amountOfDefBatt = batteries * (defectiveBatt / maxAmount);
    const amountOfWorkingBatt = batteries - amountOfDefBatt;
    alert(`
        Amount of batteries: ${batteries}
        Defective rate: ${defectiveBatt}%
        Amount of defective batteries: ${amountOfDefBatt.toFixed(twoCharacters)}
        Amount of working batteries: ${amountOfWorkingBatt.toFixed(twoCharacters)}`);
  } else {
    alert('Invalid input data');
  }
}

calculate(batteries, defectiveBatteries);