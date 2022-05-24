import { useState,useEffect} from "react";
import { Alert,View,Text,StyleSheet,TouchableOpacity,KeyboardAvoidingView,TextInput} from "react-native";
import DatePicker from 'react-native-datepicker';

 const ConfirmCart = ({navigation}) => {

     const handleSignOut = () => {  
            navigation.navigate('Signin')
      }
  
      const [Name, setName] = useState('');
      const [Contact, setContact] = useState('');
      const [BillingAddress,setBillingAddress] = useState('');
      const [ShippingAddress,setShippingAddress] = useState('');
      const [Creditcardnumber,setcreditcardnumber] = useState('');
      const [expirydate,setexpirydate] = useState('');
    
      const confirmorder = () => {
    
      if(Creditcardnumber.length == 16 && Contact.length >0 && BillingAddress.length >0 &&
        ShippingAddress.length > 0 && Name.length > 0 && expirydate.length >0  )
       {  alert("The order is confirmed")}
       else
       {
        alert("Enter correct details")
       }
      }
    
      return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.inputContainer}>
          <Text style={styles.score}>Contact Details</Text>
          <TextInput
            placeholder="Enter Name"
            value={Name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Contact"
            value={Contact}
            onChangeText={setContact}
            style={styles.input}
          />

          <Text style={styles.score}>Billing Address</Text>
          <TextInput
            placeholder="Enter Billing Address"
            value={BillingAddress}
            onChangeText={setBillingAddress}
            style={styles.input}
          />
          <Text style={styles.score}>Shipping Address</Text>
          <TextInput
            placeholder="Enter Shipping Address"
            value={ShippingAddress}
            onChangeText={setShippingAddress}
            style={styles.input}
          />
          <Text style={styles.score}>Credit Card Details</Text>
          <TextInput
            placeholder="Enter Credit Card Number"
            value={Creditcardnumber}
            onChangeText={setcreditcardnumber}
            style={styles.input}
          />

         <DatePicker
       onDateChange= {(dob) => {setexpirydate(dob);}}
       date = {expirydate}
       placeholder = "expiry date"
       format="DD/MM/YYYY"
       mode="date"
       minDate="08-04-2022"
       confirmBtnText="Select"
       cancelBtnText="Leave It"
       customStyles={{ 
           dateIcon :{
               position : 'absolute',
               right: -50,
               top: 4,
               marginLeft:0,
           },
           placeholderText:{
             fontSize:18,
             color :'gray',
           },
           dateText:{
               fontSize:18,
               color:'red',
           },
           dateInput:{
               borderColor:'red',
               alignItems:'flex-start',
           },
       }}
         /> 
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
          onPress={confirmorder}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Confirm the Order</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      )
    }
    
    export default ConfirmCart
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      score:{
        fontSize : 15,
        textAlign : 'center',
        padding : 10,
        color: 'black', 
        fontWeight : 'bold',   
        display:'flex',
        
       },
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
    })