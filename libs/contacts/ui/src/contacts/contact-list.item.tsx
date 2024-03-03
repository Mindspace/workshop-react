import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils';

import { Contact } from '@workshop/data-access';

interface ListItemProps {
  person: Contact;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export class ContactListItem extends Component<ListItemProps, ListItemProps> {
  render() {
    const { person, isSelected, onSelect } = this.props;
    return (
      <NavLink
        to={`/contacts/${person.id}`}
        onClick={() => onSelect?.(person.id!)}
        className={({ isActive }) =>
          cn(
            'rounded text-gray-600 hover:rounded-md hover:bg-indigo-500 hover:text-white',
            'group flex gap-x-3 p-2 text-sm font-semibold leading-6',
            isSelected || isActive ? 'bg-indigo-500 text-white' : '',
          )
        }
      >
        <img
          className="ml-4 inline-block aspect-square h-12 w-12 rounded-full bg-cover"
          src={person.photo}
          aria-hidden="true"
          alt={person.name}
        />
        <div className="mt-1 flex flex-1 flex-col">
          <h2 className="text-sm font-medium text-gray-900 ">{person.name}</h2>
          <p className="text-sm font-light text-gray-400 group-hover:text-white">{person.position}</p>
        </div>
      </NavLink>
    );
  }
}
