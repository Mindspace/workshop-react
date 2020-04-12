import uuid from 'react-uuid';

import { InjectionToken } from '@mindspace-io/react';
import { Contact } from '@workshop/shared/api';

import { CONTACTS } from './data/contacts';

export const API_ENDPOINT = new InjectionToken('endpoint.ui-faces.com');
export const API_KEY = new InjectionToken('api-key.ui-faces.com');

export interface QueryParams {
  userName: string;
  title?: string;
}
export interface QueryOptions {
  apiKey: string;
  apiEndPoint: string;
}

/**
 * Internal state for singleton ContactsService
 */
let contacts: Contact[] = [];

function fetchContacts(userName: string, options: QueryOptions): Promise<Contact[]> {
  console.log(`GET ${options.apiEndPoint}&name=${userName || ''}`);

  return Promise.resolve(CONTACTS);
}

export class ContactsService {
  constructor(private apiEndPoint: string, private apiKey: string) {}

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
    const scanContact = (contacts) =>
      (contacts || []).reduce((result, it) => {
        return result || (it.id === id ? it : null);
      }, null);

    return !contacts.length ? this.getContacts().then(scanContact) : Promise.resolve(scanContact(contacts));
  }

  /**
   * Case-insenstive, partial criteria matching...
   * @param userName
   * @param title
   */
  searchBy(userName: string, title = ''): Promise<Contact[]> {
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
    it.id = it.id || uuid();
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
