import { useState, useEffect, useCallback } from 'react';
import { NavigateFunction } from 'react-router';

import { ContactsService, Contact } from '@workshop/data-access';

/**
 * Define tuple types
 */
export type UseContactResults = [Contact[], string, (e: React.ChangeEvent<HTMLInputElement>) => void];
export type UseContactDetailsResult = [Contact | null, NavigateFunction];

/**
 * Custom React Hook useful to search and load Contacts
 */
export function useContacts() {
  const [service] = useState(() => new ContactsService());
  const [criteria, setCriteria] = useState<string>('');
  const [people, setPeople] = useState<Contact[]>([]);
  const [selectedId, setSelectedId] = useState<string>('nll');

  const doSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const criteria = e.target.value;
      setCriteria(criteria);
      service.searchBy(criteria).then(setPeople);
    },
    [service, setPeople],
  );

  useEffect(() => {
    service.searchBy(criteria).then(setPeople);
  }, [criteria, service, setPeople]);

  return [
    { people, criteria, selectedId },
    { doSearch, selectById: setSelectedId },
  ] as const;
}

/**
 * Custom React Hook useful to load Contact details
 */
export function useContactDetails(id: string) {
  const [service] = useState(() => new ContactsService());
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!id) return setContact(null);

    service.getContactById(id).then((contact) => setContact(contact));
  }, [service, id]);

  return contact;
}
