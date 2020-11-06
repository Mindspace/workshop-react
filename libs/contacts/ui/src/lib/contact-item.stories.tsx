import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Contact } from '@workshop/shared/api';
import { ContactListItem } from './contact-item';

export const primary = () => {
  const person: Contact = {
    name: text('Full name', 'Thomas Burleson'),
    email: text('email', 'ThomasBurleson@gmail.com'),
    position: text('Role', 'Solutions Architect'),
    photo: text('Photo URL', 'https://bit.ly/32nbzZ2'),
  };

  return <ContactListItem person={person} />;
};

export default {
  component: ContactListItem,
  title: 'ContactListItem',
};
