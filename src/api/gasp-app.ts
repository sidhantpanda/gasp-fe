import superagent from 'superagent';
import GaspData, { GaspDataRange } from '../types/GaspData';
import { asyncWait, generateRandomData } from '../utils';

const HOST = 'http://vwa.databake.nl';

const APIS = {
  GET_CELLS: '/get',
  RANGES: '/ranges'
}

export const getDataForDate = (date: Date, field: string): Promise<GaspData> => {
  // await asyncWait(1000);
  // return generateRandomData();
  const api = HOST + APIS.GET_CELLS;
  console.log('Field received', date);

  function ISODateString(d: Date) {
    function pad(n: number) { return n < 10 ? '0' + n : n }
    if (d.getFullYear != null) {
      return d.getFullYear() + '-'
        + pad(d.getUTCMonth() + 1) + '-'
        + pad(d.getUTCDate()) + 'T'
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ':'
        + pad(d.getUTCSeconds()) + 'Z';
    } else {
      return undefined;
    }
  }

  try {
    console.log('ISO ', ISODateString(date));
  } catch (err) {
    console.error('parsing errir', err);
  }

  return new Promise((resolve, reject) => {
    superagent
      .get(api)
      .query({ field, timestamp: date ? ISODateString(date) : undefined })
      .set('accept', 'json')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
        // Calling the end function will send the request
      });
  });
}

export const getRanges = (): Promise<GaspDataRange> => {
  // await asyncWait(1000);
  // return generateRandomData();
  const api = HOST + APIS.RANGES
  return new Promise((resolve, reject) => {
    superagent
      .get(api)
      .set('accept', 'json')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
        // Calling the end function will send the request
      });
  });
}
