import React, { Component } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonInput,
} from '@ionic/react';
import { search } from 'ionicons/icons';

import { Contact } from '@workshop/shared/api';
import { ContactsService } from '@workshop/contacts/data-access';

import { inlineItem, iconOnLeft, stickyRight } from './styles';
import { ContactListItem } from './contact-item';
import { InputChangeEventDetail } from '@ionic/core';

interface ContactsState {
  people: Contact[];
}

export class ContactsList extends Component<{}, ContactsState> {
  private service = new ContactsService();

  constructor(props) {
    super(props);
    this.state = { people: [] };
  }

  componentDidMount() {
    this.service.getContacts().then((list) => {
      this.setState({ people: list });
    });
  }

  render() {
    const doSearch = (criteria) => {
      this.service.searchBy(criteria).then((list) => {
        this.setState({ people: list });
      });
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonItem style={inlineItem}>
              <IonIcon icon={search.md}></IonIcon>
              <IonInput
                clearInput
                autofocus
                style={iconOnLeft}
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => doSearch(e.detail.value)}
                placeholder="Search by name..."
              ></IonInput>
            </IonItem>
            <IonTitle style={stickyRight}> Employees </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {this.state.people.map((person, idx) => {
              return <ContactListItem key={idx} person={person} />;
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

// ************************
// ContactList Styles
// ************************
