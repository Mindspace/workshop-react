import React from 'react';
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
import { InputChangeEventDetail } from '@ionic/core';

import { inlineItem, iconOnLeft, stickyRight } from './styles';
import { ContactListItem } from './contact-item';

import { ContactsService } from '@workshop/contacts/data-access';

export class ContactsList extends React.Component {
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
    const people = this.state['people'];

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
            {people.map((person, idx) => {
              return <ContactListItem key={idx} person={person} />;
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default ContactsList;
