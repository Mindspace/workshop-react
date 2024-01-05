import React, { Component } from 'react';
import { Contact, ContactsService } from '@workshop/data-access';

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
      <div>
        <div className="fixed inset-y-0 w-[320px] border-r border-neutral-200">{/* ContactList here */}</div>

        <main className="flex min-h-screen flex-col pl-[320px] ">
          <ContactDetails />
        </main>
      </div>
    );
  }
}
