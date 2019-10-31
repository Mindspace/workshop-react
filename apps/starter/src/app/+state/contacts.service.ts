import uuid from 'react-uuid';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './contacts.model';

/**
 * Internal state for singleton ContactsService
 */
let contacts: Contact[];

const API_ENDPOINT = 'https://uifaces.co/api?limit=25;';
const API_HEADERS = { headers: { 'x-API-KEY': '873771d7760b846d51d025ac5804ab' } };

async function fetchFaces<T>() {
  const result = await fetch(API_ENDPOINT, API_HEADERS);
  const data = await result.json();
  return <T>data;
}

export class ContactsService implements ContactsService {
  /**
   * Load a list from the REST service...
   */
  getContacts(skipCache = false): Observable<Contact[]> {
    const request$ = new Observable<Contact[]>(subscriber => {
      let shouldNotify = true;
      fetchFaces<Contact[]>()
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
}

function assignUIDs(list: Contact[]): Contact[] {
  return list.map(it => {
    it.id = uuid();
    return it;
  });
}
