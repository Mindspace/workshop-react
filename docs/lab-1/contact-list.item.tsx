import { Component } from 'react';
import { cn } from '../utils';

import { Contact } from '@workshop/data-access';

interface ListItemProps {
  person: Contact;
}

export class ContactListItem extends Component<ListItemProps, ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
    // (1) Configure constructor with state
  }

  componentDidMount(): void {
    // (2) Is this needed?
  }

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
          src={/* (3a) Use avatar */}
          aria-hidden="true"
          alt={/* (3b) Use name */}
        />
        <div className="mt-1 flex flex-1 flex-col">
          <h2 className="text-sm font-medium text-gray-900 ">{/* (3c) Use name */}</h2>
          {/* (4) change text color during anchor hover */}
          <p className="text-sm font-light text-gray-400 ">{/* (3d) use position */} </p>
        </div>
      </a>
    );
  }
}
