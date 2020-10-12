import React from 'react';
import { IonApp, IonContent } from '@ionic/react';

import './app.scss';

export const App = () => {
  return (
    <IonApp>
      <IonContent>
        <div className="splash">
          <img src="assets/react-master-class.png" width="50%" alt=""></img>
        </div>
      </IonContent>
    </IonApp>
  );
};
