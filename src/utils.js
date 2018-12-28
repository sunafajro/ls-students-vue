import axios from 'axios';

export const getCSRF = () => {
  return axios.get('/site/csrf');
};

export const getMaxOfArray = numArray => {
  return Math.max.apply(null, numArray);
};

export const prepareYears = rows => {
  const years =
    Array.isArray(rows) && rows.length
      ? rows.map(item => item.date.substr(0, 4))
      : [];
  const unique = years.filter((item, i, ar) => ar.indexOf(item) === i);
  const arr = [{ text: '-выбрать год-', value: '' }];
  return {
    filter: unique.length
      ? getMaxOfArray(unique.map(item => parseInt(item)))
      : '',
    years: arr.concat(
      unique.map(item => {
        return { text: item, value: item };
      })
    ),
  };
};
