import { Component } from 'react';
import { cn } from '../utils';

import { Contact } from '@workshop/data-access';

interface ListItemProps {
  person: Contact;
  isButton?: boolean;
}

export class ContactListItem extends Component<ListItemProps, ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
    this.state = { person: props.person, isButton: props.isButton };
  }

  // No side effects needed...
  // componentDidMount(): void {}

  render() {
    return (
      <a
        href={this.state.person.id}
        className={cn(
          'rounded text-gray-600 hover:rounded-md hover:bg-indigo-500 hover:text-white',
          'group flex gap-x-3 p-2 text-sm font-semibold leading-6',
        )}
      >
        <img
          className="ml-4 inline-block aspect-square h-12 w-12 rounded-full bg-cover"
          src={this.state.person.photo}
          aria-hidden="true"
          alt={this.state.person.name}
        />
        <div className="mt-1 flex flex-1 flex-col">
          <h2 className="text-sm font-medium text-gray-900 ">{this.state.person.name}</h2>
          <p className="text-sm font-light text-gray-400 group-hover:text-white">{this.state.person.position}</p>
        </div>
      </a>
    );
  }
}
