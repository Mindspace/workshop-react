import { Observable, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Contact } from '@workshop/shared/api';
import { ContactsService } from './contacts.service';

export class ContactsFacade {
  private emitter: Subject<string>;

  readonly contacts$: Observable<Contact[]>;
  readonly criteria$: Observable<string>;

  constructor(private service: ContactsService) {
    const emitter = new Subject<string>();
    const term$ = emitter.asObservable();
    const searchByCriteria$ = service.autoSearch(term$);
    const allContacts$ = service.getContacts().pipe(takeUntil(term$));

    this.emitter = emitter;
    this.criteria$ = term$;
    this.contacts$ = merge(searchByCriteria$, allContacts$);
  }

  /**
   * Search changes emits from `criteria$` which then triggers
   * the ContactsService to requery the API based on partial user name
   * matches.
   *
   * It also kills a full-load if that request is still pending.
   */
  searchFor(partial: string): Observable<Contact[]> {
    this.emitter.next(partial);
    return this.contacts$;
  }

  selectById(id: string): Observable<Contact | undefined> {
    return this.service.getContactById(id);
  }
}
