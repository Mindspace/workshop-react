import React, { useEffect } from 'react';
import { Redirect } from 'react-router';

import Mousetrap from 'mousetrap';
import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';

import { useContactDetailHook } from '@workshop/contacts/data-access';

import './contact-detail.scss';
import { gridItem } from './styles';

export const ContactDetails: React.FC = () => {
  const [contact, history] = useContactDetailHook();

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
