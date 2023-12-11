import { Platform } from 'react-native';
import { useAuthStore } from './store/authStore';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILoginRegisterResponse } from './interfaces/auth/ILoginRegisterResponse';
import { IHistory } from './interfaces/prediction/IHistory';
import { usePredictStore } from './store/predictStore';

const login = async (loginResponse: ILoginRegisterResponse) => {
  const { authorization, user } = loginResponse;

  // set zustand state
  useAuthStore.getState().setToken(authorization.token);
  useAuthStore.getState().setUser(user);

  // store token
  try {
    Platform.OS === 'web'
      ? await AsyncStorage.setItem(
        'USER_TOKEN',
        JSON.stringify(authorization.token)
      )
      : await SecureStore.setItemAsync(
        'USER_TOKEN',
        JSON.stringify(authorization.token)
      );
  } catch (error) {
    console.error('Error storing token: ', error);
  }

  fetchHistory()

  console.log(
    'Logged in: ',
    useAuthStore.getState().token,
    useAuthStore.getState().user
  );
};

const fetchHistory = async () => {
  const history = await AsyncStorage.getItem('history');
  let filteredHistory: IHistory[] | null = null;

  if (history) {
    filteredHistory = JSON.parse(history).filter(
      (historyElement: IHistory) => !historyElement.user_id
    );

    console.log('Filtered history: ', filteredHistory);
  }

  try {
    const response = await fetch(
      'https://soundset.webitup.pl/api/predict/history',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + useAuthStore.getState().token,
        },
        body: JSON.stringify({ history: filteredHistory }),
      }
    );

    const mergedHistory = await response.json()
    console.log(mergedHistory)

    await AsyncStorage.setItem('history', JSON.stringify(mergedHistory.history));
    usePredictStore
      .getState()
      .setRefreshAfterDelete(
        usePredictStore.getState().refreshAfterDelete + 1
      )
  } catch (error) {
    console.error('Error fetching history: ', error);
  }
};

const signInWithGoogle = async (token: string | undefined) => {
  if (!token) return;
  try {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();

    // set zustand state
    useAuthStore.getState().setGoogleUser(user);
    useAuthStore.getState().setGoogleToken(token);

    // store token
    try {
      Platform.OS === 'web'
        ? await AsyncStorage.setItem('googleToken', JSON.stringify(token))
        : await SecureStore.setItemAsync('googleToken', JSON.stringify(token));
    } catch (error) {
      console.error('Error storing google token: ', error);
    }

    console.log(
      'Logged in with Google: ',
      useAuthStore.getState().googleToken,
      useAuthStore.getState().googleUser
    );
  } catch (error) {
    console.error('Error signing in with Google: ', error);
  }
};

const logout = async () => {
  try {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);

    useAuthStore.getState().setGoogleToken(null);
    useAuthStore.getState().setGoogleUser(null);

    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem('USER_TOKEN');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('googleToken');
    } else {
      await SecureStore.deleteItemAsync('USER_TOKEN');
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('googleToken');
    }

    await AsyncStorage.removeItem('history');
  } catch (error) {
    console.error('Error logging out: ', error);
  }
};

export { login, logout, signInWithGoogle };
