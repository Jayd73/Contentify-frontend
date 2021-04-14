let dayjs = require("dayjs");

export function slugify(string) {
  return (
    string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "") +
    Math.random().toString(36).substr(2, 4) +
    dayjs().format("SSSss")
  );
}

export function shuffleArr(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function intlFormat(num) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

export function abbreviateNumber(num) {
  if (num >= 1000000000) return intlFormat(num / 1000000000) + "B";
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "K";
  return intlFormat(num);
}

export function getTimeFromSecs(given_seconds) {
  const hours = Math.floor(given_seconds / 3600);
  const minutes = Math.floor((given_seconds - hours * 3600) / 60);
  const seconds = Math.floor(given_seconds - hours * 3600 - minutes * 60);
  let timeStr = "";

  if (hours.toString().padStart(2, "0") != "00") {
    timeStr += hours.toString().padStart(2, "0") + ":";
  }
  timeStr +=
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return timeStr;
}
