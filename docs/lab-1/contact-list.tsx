import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Contact, ContactsService } from '@workshop/data-access';
import { Component } from 'react';

import { ContactListItem } from './contact-list.item';

interface ContactsState {
  people: Contact[];
}

export class ContactsList extends Component<unknown, ContactsState> {
  private contactsService = new ContactsService();

  constructor(props: ContactsState) {
    // (1) Configure constructor with state
  }

  componentDidMount() {
    // (2) Fetch contacts from the service and update state
  }

  render() {
    return (
      // Bottom padding equals height of search field to account for full height on scrolling nav below
      <div className="h-full pb-9">
        <div className="relative mt-2 rounded-md p-4 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            name="search"
            type="search"
            autoFocus
            placeholder="Search by name..."
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <nav className="mt-4 h-full overflow-y-auto pb-4">
          <ul className="-mx-2 space-y-1">{/* (3) Loop over 'people' and render ContactListItem instances */}</ul>
        </nav>
      </div>
    );
  }
}
