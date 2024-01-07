import { Component } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ContactsService, Contact } from '@workshop/data-access';

import { ContactListItem } from './contact-list.item';

interface ContactsState {
  people: Contact[];
}

export class ContactsList extends Component<unknown, ContactsState> {
  private service = new ContactsService();

  constructor(props: ContactsState) {
    super(props);
    this.state = { people: [] };
  }

  componentDidMount() {
    this.service.getContacts().then((list) => {
      this.setState({ people: list });
    });
  }

  render() {
    return (
      <nav className="flex flex-col overflow-hidden">
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
        </div>{' '}
        <ul className="-mx-2 space-y-1 mt-4 overflow-scroll">
          {this.state.people.map((item, j) => (
            <li key={item.name}>
              <ContactListItem key={j} person={item} />
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
