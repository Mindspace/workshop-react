import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import * as H from 'history';
import { Contact } from '@workshop/shared/api';
import { ContactsService } from './contacts.service';

/**
 * Define tuple types
 */
export type ContactHookResults = [Contact[], (criteria: string) => void];
export type ContactDetailsResult = [Contact, H.History<H.LocationState>];

/**
 * Custom React Hook useful to load Contact details
 */
export function useContactDetailHook(): ContactDetailsResult {
  const { id } = useParams();
  const history = useHistory();
  const [service] = useState(() => new ContactsService());
  const [contact, setContact] = useState<Contact>({} as Contact);

  useEffect(() => {
    service.getContactById(id).then(setContact);
  }, [id]);

  return [contact, history];
}

/**
 * Custom React Hook useful to search and load Contacts
 */
export function useContactsHook(): ContactHookResults {
  const [service] = useState(() => new ContactsService());
  const [criteria, setCriteria] = useState<string>('');
  const [people, setPeople] = useState<Contact[]>([]);

  useEffect(() => {
    service.searchBy(criteria).then(setPeople);
  }, [criteria, service, setPeople]);

  return [people, setCriteria];
}
