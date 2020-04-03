import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps, Redirect, useParams } from 'react-router';
import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';

import Mousetrap from 'mousetrap';
import { useObservable } from '@mindspace-io/react';

import { Contact, injector, ContactsFacade } from '@workshop/contacts/data-access';
import './contact-detail.scss';
import { gridItem } from './styles';

export interface ContactDetailProps extends RouteComponentProps<{ id: string }> {}

export const ContactDetails: React.FC<ContactDetailProps> = () => {
  const history = useHistory();
  const { id } = useParams();
  const [contact, setContact$] = useObservable<Contact>(null, {} as Contact);
  const facade: ContactsFacade = injector.get(ContactsFacade);

  useEffect(() => {
    setContact$(facade.selectById(id));
  }, [facade, id, setContact$]);

  // 'Esc' keyboard shortcut to close the popup
  useEffect(() => {
    const key = 'esc';
    Mousetrap.bind([key], () => history.goBack());
    return () => Mousetrap.unbind([key]);
  }, [history]);

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
};
