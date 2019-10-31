import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, retry, take, tap, withLatestFrom } from 'rxjs/operators';

import { Contact } from './contacts.model';
import { ContactsService } from './contacts.service';

export class ContactsFacade {
  contacts$ = new BehaviorSubject<Contact[]>([]);
  criteria$ = new BehaviorSubject<string>('');
  loading$ = new BehaviorSubject<boolean>(false);
  selectedContact$ = new BehaviorSubject<Contact | null>(null);

  constructor(private service: ContactsService) {
    this.loading$.next(true);
    this.service.getContacts().subscribe(contacts => {
      this.contacts$.next(contacts);
      this.loading$.next(false);
    });
  }

  /**
   * Update the current selected contact
   */
  selectContact(id: string): Observable<Contact | null> {
    this.contacts$.pipe(take(1)).subscribe(contacts => {
      this.selectedContact$.next(findContact(contacts, id));
    });
    return this.selectedContact$;
  }

  /**
   * Save contact to server 1st, then upsert into the in-memory cache
   */
  saveContact(contact: Contact): Observable<boolean> {
    const updated$ = this.service.updateContact(contact);
    return updated$.pipe(
      retry(3),
      withLatestFrom(this.contacts$, this.loading$),
      tap(([newContact, list, loading]) => {
        upsertContact(list, newContact);
        this.selectContact(String(contact.id));
      }),
      map(_ => true)
    );
  }

  autoSearch(term$: Observable<string>): Observable<Contact[]> {
    return this.service.autoSearch(term$).pipe(
      withLatestFrom(term$),
      map(([list, term]) => {
        this.contacts$.next(list);
        this.criteria$.next(term);
        return list;
      })
    );
  }

  search(criteria: string) {
    const pending$ = this.service.searchBy(criteria);
    pending$.subscribe(list => {
      this.contacts$.next(list);
      this.criteria$.next(criteria);
    });
  }
}

/**
 * Find (if present) the contact in the in-memory cache
 */
function findContact(contacts: Contact[], id: string): Contact | null {
  const matches = (it: Contact) => `${it.id}` === id;
  const scanContact = (result, it) => (result || matches(it) ? it : null);
  return contacts.reduce(scanContact, null);
}

/**
 * Insert or update the specified contact into the in-memory cache
 */
function upsertContact(contacts: Contact[], contact: Contact): Contact[] {
  const matches = (it: Contact) => `${it.id}` === `${contact.id}`;
  const list = contacts.map(it => (matches(it) ? { ...it, ...contact } : it));
  return findContact(list, String(contact.id)) ? list : list.concat([contact]);
}
