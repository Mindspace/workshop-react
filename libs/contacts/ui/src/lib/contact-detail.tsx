import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';

import './contact-detail.scss';
import { gridItem } from './styles';

import { Contact, ContactsService } from '@workshop/contacts/data-access';

export interface ContactDetailProps extends RouteComponentProps<{ id: string }> {}
export interface ContactDetailState {
  contact: Contact;
}

export class ContactDetails extends Component<ContactDetailProps, ContactDetailState> {
  constructor(props) {
    super(props);
    this.state = { contact: {} as Contact };
  }

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    const newId = this.props.match.params.id;
    const oldId = this.state.contact ? this.state.contact.id : '';

    if (newId !== oldId) {
      this.loadContact(newId);
    }
  }

  private loadContact(id = '') {
    // Use Router param `id` to lookup
    const service = new ContactsService();
    const params = this.props.match.params;
    const request = service.getContactById(id || params.id);

    request.then(contact => this.setState({ contact }));
  }

  render() {
    const contact = this.state.contact;

    return contact ? (
      <IonPage style={gridItem} className="contactDetails">
        <IonCard>
          <IonCardContent>
            <IonAvatar slot="start">
              <img src={contact.photo} />
            </IonAvatar>
            <IonLabel>
              <h2>{contact.name}</h2>
              <p>{contact.position}</p>
            </IonLabel>
          </IonCardContent>
          <IonFooter>
            <IonButton routerLink="/contacts">Back</IonButton>
          </IonFooter>
        </IonCard>
      </IonPage>
    ) : (
      <Redirect to="/contacts" />
    );
  }
}
