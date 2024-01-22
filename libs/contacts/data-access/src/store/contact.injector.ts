import { createContext } from 'react';
import { ContactsService } from '../services';

/**
 * Used to provide ContactsFacade via the JSX tree or `useContext()` hook
 */
export const ContactsContext = createContext<ContactsService | null>(null);
