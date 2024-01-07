import React from 'react';
import clsx from 'clsx';

import { Contact } from '@workshop/data-access';

interface ListItemProps {
  person: Contact;
  isButton?: boolean;
}

export const ContactListItem: React.FC<ListItemProps> = ({ person }) => {
  return (
    <a
      href={person.id}
      className={clsx(
        'text-gray-600 hover:text-white hover:bg-indigo-700',
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
      )}
    >
      <img
        className="inline-block h-12 w-12 rounded-full bg-cover"
        src={person.photo}
        aria-hidden="true"
        alt={person.name}
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-sm font-medium text-gray-900 ">{person.name}</h2>
        <p className="text-sm font-light text-gray-400">{person.position}</p>
      </div>
    </a>
  );
};
