import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const { name, email, photoUrl } = route.params;

  const handleSignOut = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={photoUrl ? { uri: photoUrl } : require('../../assets/default-avatar.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 40,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});