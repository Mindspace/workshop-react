import { InjectionToken } from '@mindspace/core';
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

export const API_ENDPOINT = new InjectionToken('endpoint-ui-faces');
export const API_KEY = new InjectionToken('api-key-ui-faces');

export class ContactsService {
  constructor(
    private apiEndPoint: string,
    private apiKey: string,
  ) {}
  /**
   * Load a list from the REST service...
   */
  async getContacts(useCache = false, params?: Record<string, string>): Promise<Contact[]> {
    if (contacts.length && useCache) return contacts;

    contacts = await await this.loadContacts({});
    return contacts;
  }

  async getContactById(id: string): Promise<Contact | null> {
    if (contacts.length === 0) await this.getContacts(false);

    const who = contacts.length
      ? contacts.reduce((result: Contact | null, it: Contact) => {
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
    return Promise.resolve(CONTACTS);
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
