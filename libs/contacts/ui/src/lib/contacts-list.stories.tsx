import React from 'react';
import { ContactsList } from './contacts-list';

export default {
  component: ContactsList,
  title: 'ContactsList',
};

export const primary = () => {
  return <ContactsList />;
};
