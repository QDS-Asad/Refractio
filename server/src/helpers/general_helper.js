const convertCentToDoller = (price) => {
  return price * 100;
};

const convertDollerToCent = (price) => {
  return price / 100;
};

const convertTimestampToDate = (timestamp) => {
  return timestamp * 1000;
};

const getCurrentTimeStamp = () => {
  return Date.now() / 1000
};

module.exports = {
    convertCentToDoller,
    convertDollerToCent,
    convertTimestampToDate,
    getCurrentTimeStamp
}
