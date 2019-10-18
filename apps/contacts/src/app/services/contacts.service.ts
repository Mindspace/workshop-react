import uuid from 'react-uuid';
import { CONTACTS } from './data/contacts';

/**
 * Internal state for singleton ContactsService
 */
let contacts = [];

const API_ENDPOINT = 'https://uifaces.co/api?limit=25;';
const API_KEY = '873771d7760b846d51d025ac5804ab';

async function fetchContacts(params, options) {
  const url = options.apiEndPoint + (params.userName ? `&name=${params.userName}` : '');
  console.log(`GET ${url}`);

  // const headers = { headers: { 'x-API-KEY': options.apiKey } };
  // const result = await fetch(url, headers);
  // const data = await result.json();
  // return <T>data;

  return Promise.resolve(CONTACTS);
}

export class ContactsService {
  /**
   * Load a list from the REST service...
   */
  getContacts(useCache = false, params = null) {
    const goFetch = () => {
      params = params || {};
      return this.loadContacts(params).then(list => {
        return (contacts = assignUIDs(list));
      });
    };

    // Use cached list
    return contacts.length && useCache ? Promise.resolve(contacts) : goFetch();
  }

  getContactById(id) {
    const who = !!contacts
      ? contacts.reduce((result, it) => {
          return result || (it.id === id ? it : null);
        }, null)
      : null;
    return Promise.resolve(who);
  }

  /**
   * Case-insenstive, partial criteria matching...
   * @param userName
   * @param title
   */
  searchBy(userName, title = '') {
    const filterByName = (who): boolean => (userName ? contains(who.name, userName) : true);
    const filterByTitle = (who): boolean => (title ? contains(who.position, title) : true);

    return this.getContacts(false, { userName, title }).then(list => {
      return !!list ? list.filter(filterByName).filter(filterByTitle) : [];
    });
  }

  /**
   * internal wrapper to fetch function...
   */
  private loadContacts(params) {
    const apiEndPoint = API_ENDPOINT;
    const apiKey = API_KEY;
    return fetchContacts(params || {}, { apiEndPoint, apiKey });
  }
}

/**
 * Add unique IDs to the contacts; since these are not provided
 * by the remote service
 * @param list
 */
function assignUIDs(list) {
  return list.map(it => {
    it.id = uuid();
    return it;
  });
}

/**
 * Determines if the target string contains a case-insensitive substring
 * matching the 'partial'
 * @param target
 * @param partial
 */
function contains(target, partial) {
  return target.toLowerCase().indexOf(partial.toLowerCase()) > -1;
}
