import uuid from 'react-uuid';
import { InjectionToken } from '@mindspace/core';

import { Observable, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';

import { Contact } from './contacts.model';

export const API_ENDPOINT = new InjectionToken('endpoint.ui-faces.com');
export const API_KEY = new InjectionToken('api-key.ui-faces.com');
/**
 * Internal state for singleton ContactsService
 */
let contacts: Contact[];

async function loadContacts<T>(apiEndPoint: string, apiKey: string) {
  const headers = { headers: { 'x-API-KEY': apiKey } };

  const result = await fetch(apiEndPoint, headers);
  const data = await result.json();
  return <T>data;
}

export class ContactsService implements ContactsService {
  constructor(private apiEndPoint: string, private apiKey: string) {}
  /**
   * Load a list from the REST service...
   */
  getContacts(skipCache = false): Observable<Contact[]> {
    const request$ = new Observable<Contact[]>(subscriber => {
      let shouldNotify = true;
      this.loadContacts()
        .then(list => {
          if (shouldNotify) {
            subscriber.next((contacts = assignUIDs(list)));
            subscriber.complete();
          }
        })
        .catch(subscriber.error);
      return () => {
        shouldNotify = false;
      };
    });

    // Use cached list
    return !!contacts && !skipCache ? of(contacts) : request$;
  }

  getContactById(id: string): Observable<Contact | undefined> {
    const who = !!contacts
      ? contacts.reduce((result, it) => {
          return result || (it.id === id ? it : null);
        }, null)
      : null;
    return of(who);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return of({ ...contact }).pipe(delay(700));
  }

  /**
   * Watch input stream, apply biz rules and then
   * search for Contacts with partial name terms
   * @param term$
   * @param debounceMs
   */
  autoSearch(term$: Observable<string>, debounceMs = 250): Observable<Contact[]> {
    return term$.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap(term => this.searchBy(term))
    );
  }

  /**
   * Case-insenstive, partial criteria matching...
   * @param userName
   * @param title
   */
  searchBy(userName: string, title: string = ''): Observable<Contact[]> {
    const filterByName = (who: Contact): boolean =>
      userName ? who.name.toLowerCase().indexOf(userName.toLowerCase()) > -1 : true;
    const filterByTitle = (who: Contact): boolean =>
      title ? who.position.toLowerCase().indexOf(title.toLowerCase()) > -1 : true;

    return this.getContacts(true).pipe(
      map(list => list.filter(filterByName)),
      map(list => list.filter(filterByTitle))
    );
  }

  /**
   * internal wrapper to fetch function...
   */
  private loadContacts(): Promise<Contact[]> {
    return loadContacts<Contact[]>(this.apiEndPoint, this.apiKey);
  }
}

function assignUIDs(list: Contact[]): Contact[] {
  return list.map(it => {
    it.id = uuid();
    return it;
  });
}
