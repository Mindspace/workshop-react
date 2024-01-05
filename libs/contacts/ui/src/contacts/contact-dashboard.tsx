import { Component } from 'react';
import { ContactsService, Contact } from '@workshop/data-access';

import '../styles.css';

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
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-1">{/* Contact List here */}</div>
        <main className="col-span-2 flex flex-col">{/* List Details here */}</main>
      </div>
    );
  }
}
