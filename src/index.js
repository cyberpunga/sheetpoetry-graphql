const random = require("lodash.random");
const times = require("lodash.times");
const getSheet = require("./getSheet");

module.exports = async (spreadsheetId, range, howMany) => {
  const values = await getSheet(spreadsheetId, range);

  const [rowRangeMin, rowRangeMax] = range
    .replace(/\D/g, " ")
    .split(" ")
    .filter(el => {
      return el !== "";
    })
    .map(el => {
      return parseInt(el) - 1;
    });

  const steps =
    range
      .replace(/[^a-z]/gi, "")
      .split("")
      .map(el => {
        return el.charCodeAt(0);
      })
      .reduce((acc, num) => {
        return num - acc;
      }) + 1;

  const makeVerse = () => {
    let verse = "";
    let row;
    const selectRandomRow = () => {
      row = values[random(rowRangeMin, rowRangeMax)];
      if (!row) selectRandomRow();
    };
    const selectRandomCell = column => {
      selectRandomRow();
      const cell = row[column];
      if (cell !== undefined) {
        verse += ` ${cell.trim()}`;
      } else {
        selectRandomCell(column);
      }
    };
    times(steps, step => selectRandomCell(step));
    return verse.trim();
  };

  const makePoem = () => {
    let poem = "";
    times(howMany, step => {
      poem += step == howMany - 1 ? `${makeVerse()}` : `${makeVerse()}\n`;
    });
    return poem;
  };

  const sheetpoem = makePoem();

  return sheetpoem;
};
