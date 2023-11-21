import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './StackNavigator';
import { UserContext } from './UserContext';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <>
      <PaperProvider>
        <UserContext>
          <Navigation/> 
        </UserContext>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
