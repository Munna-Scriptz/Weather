// -------------Real Time
let TimeTag = document.querySelector('.RealTime')
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + amPm;
  return strTime;
}
TimeTag.innerHTML = formatAMPM(new Date)