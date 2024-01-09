import { Contact, ContactsService } from '@workshop/data-access';
import { Component } from 'react';

import { ContactDetails } from './contact-details';
import { ContactsList } from './contact-list';

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
        <div className="fixed inset-y-0 border-r border-neutral-200 w-[320px] p-4">
          <ContactsList />
        </div>

        <div className="flex min-h-screen flex-col pl-[320px]">
          <main className="relative flex flex-1 flex-col p-4">
            <ContactDetails />
          </main>
        </div>
      </div>
    );
  }
}
