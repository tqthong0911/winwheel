function getDefaultSize(segments) {
  const configHaveSize = segments.reduce(
    (countConfigHaveSize, config) =>
      config.size
        ? {
            count: countConfigHaveSize.count + 1,
            totalSize: countConfigHaveSize.totalSize + config.size,
          }
        : countConfigHaveSize,
    {
      count: 0,
      totalSize: 0,
    }
  );

  return (
    (360 - configHaveSize.totalSize) / (segments.length - configHaveSize.count)
  );
}

function setYourCash(newValue) {
  document.getElementById("cash").textContent = newValue.toString().replace(/,/g, "").replace(/\d(?=(\d{3})+(?!\d))/g, "$&,");
}

function getYourCash() {
  return parseFloat(document.getElementById("cash").textContent.replace(',', ''));
}

function getYourBet() {
  return parseFloat(document.getElementById("value").textContent);
}

function setYourBet(newValue) {
  document.getElementById("value").textContent = newValue.toString();
}
function plusBet() {
  const newValue = getYourBet() + 10;
  setYourBet(newValue < 0 ? 0 : newValue);
}

function subBet() {
  const newValue = getYourBet() - 10;
  setYourBet(newValue < 0 ? 0 : newValue);
}
