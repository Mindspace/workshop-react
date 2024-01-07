import { Component } from 'react';
import { ContactsService, Contact } from '@workshop/data-access';

import { ContactsList } from './contact-list';
import { ContactDetails } from './contact-details';

interface ContactsState {
  people: Contact[];
}

export class ContactDashboard extends Component {
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
      <div className="grid grid-cols-3 gap-4 p-4 h-screen">
        <div className="col-span-1">
          <ContactsList />
        </div>
        <main className="col-span-2">
          <ContactDetails />
        </main>
      </div>
    );
  }
}
