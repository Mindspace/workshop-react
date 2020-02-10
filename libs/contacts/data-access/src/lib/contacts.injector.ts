import { createContext } from 'react';
import { ContactsService } from './contacts.service';

/**
 * Used to provide ContactsFacade via the JSX tree or `useContext()` hook
 */
export const ContactsContext = createContext<ContactsService>(null);
