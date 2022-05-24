import {Text,View,StyleSheet,TextInput, Button} from 'react-native';
import React,{ useState } from 'react';
import {useNavigation} from '@react-navigation/native';




const Home = () => {
    const navigation = useNavigation();
    // const {username} = route.params;
    // const [searchQuery, setSearchQuery] = useState('');

    const goToSearchScreen = () => {
        navigation.navigate("Setting" );
    }
    return (
        <View style={styles.container}>

            <Text>Hello Screen</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder='Type Something'
                textContentType="none"
                returnKeyType='done'
                // value={searchQuery}
                // onChangeText={setSearchQuery}
            />

            <Button 
            style = {styles.buttonStyle} 
            color= 'orangered' 
            title='Go' 
            onPress={goToSearchScreen}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },inputStyle: {
        height: 50,
        margin: 8,
        borderColor: 'orangered',
        borderWidth: 1,
        padding: 5,
    },
    buttonStyle: {
        margin: 30,
        padding: 10,
        
    },
  });
export default Home;