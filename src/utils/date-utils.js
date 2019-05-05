import moment from 'moment';

class DateUtils {
  getFormattedDate (isoString) {
    return moment(isoString).format('DD/MM/YYYY');
  }

  sortListByCreatedDate (list) {
    const listToSort = JSON.parse(JSON.stringify(list));
    return listToSort.sort(
      (a, b) => moment(a.createdDate).format('YYYYMMDD') - moment(b.createdDate).format('YYYYMMDD')
    );
  }
}

export default new DateUtils();
