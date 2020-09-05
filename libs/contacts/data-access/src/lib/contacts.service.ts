import uuid from 'react-uuid';

import { Contact } from '@workshop/shared/api';
import { CONTACTS } from './data/contacts';

/**
 * Internal state for singleton ContactsService
 */
let contacts: Contact[] = [];

const API_ENDPOINT = 'https://uifaces.co/api?limit=25;';
const API_KEY = '873771d7760b846d51d025ac5804ab';

export interface QueryParams {
  userName: string;
  title?: string;
}
export interface QueryOptions {
  apiKey: string;
  apiEndPoint: string;
}

function fetchContacts(userName: string, options: QueryOptions): Promise<Contact[]> {
  console.log(`GET ${options.apiEndPoint}&name=${userName || ''}`);

  return Promise.resolve(CONTACTS);
}

export class ContactsService {
  private apiEndPoint = API_ENDPOINT;
  private apiKey = API_KEY;

  /**
   * Load a list from the REST service...
   */
  getContacts(useCache = false, params: QueryParams = null): Promise<Contact[]> {
    const goFetch = () => {
      return this.loadContacts(params).then((list) => {
        return (contacts = assignUIDs(list));
      });
    };

    // Use cached list
    return contacts.length && useCache ? Promise.resolve(contacts) : goFetch();
  }

  getContactById(id: string): Promise<Contact | null> {
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
  searchBy(userName: string, title: string = ''): Promise<Contact[]> {
    const filterByName = (who: Contact): boolean => (userName ? contains(who.name, userName) : true);
    const filterByTitle = (who: Contact): boolean => (title ? contains(who.position, title) : true);

    return this.getContacts(false, { userName, title }).then((list) => {
      return list.filter(filterByName).filter(filterByTitle);
    });
  }

  /**
   * internal wrapper to fetch function...
   */
  private loadContacts(params: QueryParams | null): Promise<Contact[]> {
    const { apiEndPoint, apiKey } = this;
    return fetchContacts(params ? params.userName : '', { apiEndPoint, apiKey });
  }
}

/**
 * Add unique IDs to the contacts; since these are not provided
 * by the remote service
 * @param list
 */
function assignUIDs(list: Contact[]): Contact[] {
  return list.map((it) => {
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
function contains(target: string, partial: string): boolean {
  return target.toLowerCase().indexOf(partial.toLowerCase()) > -1;
}
