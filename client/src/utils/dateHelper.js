import Moment from 'moment';
export const formatDate = (dateString) => {
  return Moment(dateString).format('MMMM DD, YYYY');
};
