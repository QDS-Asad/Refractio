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

const timeDifference = (date1,date2) => {
  let difference = date1.getTime() - date2.getTime();

  let daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  // let hoursDifference = Math.floor(difference/1000/60/60);
  // difference -= hoursDifference*1000*60*60

  // let minutesDifference = Math.floor(difference/1000/60);
  // difference -= minutesDifference*1000*60

  // let secondsDifference = Math.floor(difference/1000);
  let result = daysDifference + ' day/s ';// + 
    // hoursDifference + ' hour/s ' + 
    // minutesDifference + ' minute/s ' + 
    // secondsDifference + ' second/s ';
    return result;
}

module.exports = {
    convertCentToDoller,
    convertDollerToCent,
    convertTimestampToDate,
    getCurrentTimeStamp,
    timeDifference
}
