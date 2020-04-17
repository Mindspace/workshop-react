import Mousetrap from 'mousetrap';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState, useEffect, DependencyList, useCallback } from 'react';
import { useObservable } from '@mindspace-io/react';

import { Contact } from '@workshop/shared/api';
import { injector } from './contacts.injector';
import { ContactsFacade } from './contacts.facade';

export type ContactsTuple = [string, Contact[], ContactsFacade];
export type ContactDetailsTuple = [Contact, { goBack: () => void }];

export function useContacts(): ContactsTuple {
  const [facade] = useState<ContactsFacade>(() => injector.get(ContactsFacade));
  const [criteria] = useObservable(facade.criteria$, '');
  const [contacts] = useObservable(facade.contacts$, []);

  return [criteria, contacts, facade];
}

export function useContactDetails(): ContactDetailsTuple {
  const { id } = useParams();
  const [facade] = useState<ContactsFacade>(() => injector.get(ContactsFacade));
  const [contact, setContact$] = useObservable<Contact>(null, {} as Contact);
  const history = useHistory();

  useEffect(() => {
    setContact$(facade.selectById(id));
  }, [id, facade]);

  return [contact, history];
}

/**
 * Support global keyboard shortcuts... auto-cleanup when view unmounts
 */
export function useMouseTrap(shortcut: string[] | string, handler: () => void, deps: DependencyList = []) {
  const memoFn = useCallback(handler, deps);

  useEffect(() => {
    Mousetrap.bind(shortcut, memoFn);
    return () => Mousetrap.unbind(shortcut);
  }, [memoFn]);
}
