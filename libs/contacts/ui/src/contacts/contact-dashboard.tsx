/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { Route, Routes, Location } from 'react-router-dom';

import { ContactsService } from '@workshop/data-access';

import { ContactDetails } from './contact-details';
import { ContactsList } from './contact-list';

export class ContactDashboard extends Component<{ location?: Location<any> }> {
  private service = new ContactsService();

  constructor(props: { location?: Location<any> }) {
    super(props);
    this.state = { people: [] };
  }

  componentDidMount() {
    this.service.getContacts().then((list) => {
      this.setState({ people: list });
    });
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <div className="fixed inset-y-0 w-[320px] border-r border-neutral-200">
          <ContactsList></ContactsList>
        </div>

        <main className="flex min-h-screen flex-col pl-[320px] ">
          <Routes key={location?.pathname} location={location}>
            <Route index element={<ContactDetails />} />
            <Route path=":id" element={<ContactDetails />} />
            <Route path="*" element={<h1>Invalid Route</h1>} />
          </Routes>
        </main>
      </div>
    );
  }
}
