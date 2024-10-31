import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

WebBrowser.maybeCompleteAuthSession();

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  });

  React.useEffect(() => {
    handleSignInResponse();
  }, [response]);

  const handleSignInResponse = async () => {
    if (response?.type === 'success') {
      const { authentication } = response;
      
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${authentication?.accessToken}` },
          }
        );

        const userInfo = await userInfoResponse.json();
        navigation.replace('Home', {
          name: userInfo.name,
          email: userInfo.email,
          photoUrl: userInfo.picture,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image
          source={require('../../assets/google-icon.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#444',
    fontSize: 16,
    marginLeft: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
});