import { CONTACTS } from './data/contacts.data';
import { Contact } from './contacts.model';

export type Params = Record<string, string>;
export interface FetchOptions {
  apiEndPoint: string;
  apiKey: string;
}
/**
 * Internal state for singleton ContactsService
 */
let contacts: Contact[] = [];

const API_ENDPOINT = 'https://uifaces.co/api?limit=25;';
const API_KEY = '873771d7760b846d51d025ac5804ab';

async function fetchContacts(params: Params, options: FetchOptions) {
  const url = options.apiEndPoint + (params.userName ? `&name=${params.userName}` : '');
  console.log(`GET ${url}`);

  // const headers = { headers: { 'x-API-KEY': options.apiKey } };
  // const result = await fetch(url, headers);
  // const data = await result.json();
  // return assignIds(data) as <T>;

  return Promise.resolve(CONTACTS);
}

export class ContactsService {
  /**
   * Load a list from the REST service...
   */
  async getContacts(useCache = false, params?: Record<string, string>): Promise<Contact[]> {
    const goFetch = async () => {
      params = params || {};
      const list = await this.loadContacts(params);
      return list;
    };

    if (contacts.length && useCache) return contacts;

    const results = await goFetch();
    return (contacts = results);
  }

  async getContactById(id: string): Promise<Contact | null> {
    const list = await this.getContacts(true);
    const who = list.length
      ? list.reduce((result: Contact | null, it: Contact) => {
          return result || (it.id === id ? it : null);
        }, null)
      : null;

    return who;
  }

  /**
   * Case-insenstive, partial criteria matching...
   * @param userName
   * @param title
   */
  async searchBy(userName: string, title = '') {
    const filterByName = (who: Contact): boolean => (userName ? contains(who.name, userName) : true);
    const filterByTitle = (who: Contact): boolean => (title ? contains(who.position, title) : true);

    const list = await this.getContacts(false, { userName, title });
    return list ? list.filter(filterByName).filter(filterByTitle) : [];
  }

  /**
   * internal wrapper to fetch function...
   */
  private loadContacts(params: Params): Promise<Contact[]> {
    const apiEndPoint = API_ENDPOINT;
    const apiKey = API_KEY;
    return fetchContacts(params || {}, { apiEndPoint, apiKey });
  }
}

/**
 * Determines if the target string contains a case-insensitive substring
 * matching the 'partial'
 * @param target
 * @param partial
 */
function contains(target: string, partial: string) {
  return target.toLowerCase().indexOf(partial.toLowerCase()) > -1;
}
