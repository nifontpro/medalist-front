export const timeConverter = (UNIX_timestamp: number | undefined) => {
  if (UNIX_timestamp != undefined) {
    let a = new Date(UNIX_timestamp);
    let months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    if (date < 10) {
      let time = '0' + date + '.' + month + '.' + year;
      return time;
    } else {
      let time = date + '.' + month + '.' + year;
      return time;
    }

    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  }
};
