import React from 'react';
import Navigation from './components/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './store/configureStore';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  let persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
