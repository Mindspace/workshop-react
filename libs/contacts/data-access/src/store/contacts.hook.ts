import { useState, useEffect, useCallback } from 'react';

import { ContactsService, Contact } from '../services';
import { useDependencyInjector } from '@mindspace/di';

/**
 * Custom React Hook useful to search and load Contacts
 */
export function useContacts() {
  const service = useDependencyInjector<ContactsService>(ContactsService);
  const [criteria, setCriteria] = useState<string>('');
  const [people, setPeople] = useState<Contact[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const doSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const criteria = e.target.value;
      setCriteria(criteria);
      service?.searchBy(criteria).then(setPeople);
    },
    [service, setPeople],
  );

  useEffect(() => {
    service?.searchBy(criteria).then(setPeople);
  }, [criteria, service, setPeople]);

  return [
    { people, criteria, selectedId },
    {
      doSearch,
      selectById: (id: string) => {
        console.log('selectById', id);
        setSelectedId(id);
      },
    },
  ] as const;
}

/**
 * Custom React Hook useful to load Contact details
 */
export function useContactDetails(id: string) {
  const service = useDependencyInjector<ContactsService>(ContactsService);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!id) return setContact(null);

    service?.getContactById(id).then((contact) => setContact(contact));
  }, [service, id]);

  return contact;
}
