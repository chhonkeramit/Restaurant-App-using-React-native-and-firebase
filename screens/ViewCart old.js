import { useState,useEffect} from "react";
import { View,Text,Image,StyleSheet,SafeAreaView, Pressable,ActivityIndicator,Button,TouchableOpacity} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { UserDetails, UserDetailsCollectionRef } from '../models/userDetails';
import { cartCard } from "../components/cartCard";
// import { useNavigation } from '@react-navigation/core'
import { auth, fireDB } from '../firebase'
import { useGestureHandlerRef } from "react-navigation-stack";
import { hasStartedLocationUpdatesAsync } from "expo-location";

// const navigation = useNavigation();

const ViewCart = ({ navigation }) => {
    const [displayList, setUserLocation] = useState([[]]);
    // const  [pricechange,setpricechange] = useState();
    const [coupon, setCoupon] = useState('');


    const [total,settotal] = useState();
    const [disc,setdiscount] = useState();
   
    useEffect(() => {
        //Runs on every render
            showData();

      },1000);


    const handleSignOut = () => {  
            navigation.navigate('Signin')
      }


   const showtotal= () => {
        let sum = 0;
        let discount = 0;
        // console.log("executed everytime the component receives new state or prop");
        fireDB.collection(auth.currentUser.email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            sum = sum + doc.data().price;
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data().price);
                // console.log(sum);              
            })
            if(sum < 80)
               {
                 discount = 0.05 * sum;
                 setdiscount(discount);
                console.log(`discount ${discount}`);
                }
                if(coupon) {
                    alert("Congrats You Got 50% discount")
                    discount = 0.5 * sum;
                    setdiscount(discount);
                }

               if(sum>=80 && sum<100)
               {
                discount = 0.2 * sum;
                setdiscount(discount);
               }
               if(sum >= 100)
               {
                discount = 0.3 * sum;
                setdiscount(discount);
               }
               settotal(sum);
                 console.log(`total: ${total}`);
               console.log(`totalwithdisc: ${total - disc}`);
        });

    }
    
    
    // var arrayDisplayList = displayList.split(',');
    // const {Datasent} = route.params;
// var i;
    // console.log(`welcome to viewcart ${JSON.stringify(Datasent)}`);

    // const renderItem = ( {row} ) => (
    //     <View style = {styles.listitem}>
    //             <Image style = {styles.imagestyle} source={ {uri: row.image}}/>   
    //              <Text style= {styles.title}> {row.name}</Text>
    //              <Text style= {styles.synopsis}> {item.price}</Text>
    //              {/* <Text style= {styles.score}>Price : {item.Price}</Text> */}
    //             <View style = {styles.separator}/>
    //         </View>
          
    // );

    function showData() {
        fireDB.collection(auth.currentUser?.email).get().then((querySnapshot) => {
            let bigArr = []
          querySnapshot.forEach((doc) => {
              // console.log(`${doc.id} => ${doc.data().first}`)
              let newArr = []
              newArr.push(`${doc.data().user}`)
              newArr.push(`${doc.data().name}`)
              newArr.push(`${doc.data().price}`)
              newArr.push(`${doc.data().available}`)
              newArr.push(`${doc.data().image}`)
              bigArr.push(newArr)
          });
          setUserLocation(bigArr)
          
        //   console.warn("~~~~~~~~~~~~~~ newArr: ", newArr)
      });
       }
    return(
        <View>
            {/* <TouchableOpacity
          onPress={
            handleSignOut}
            style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}
            <Text style={styles.score}>Total : {total}</Text>    
            <Text style={styles.score}>Discount : {disc}</Text>  
            <Text style={styles.score}>TotalAfterDisc : {total-disc}</Text>
            <Text>  </Text> 
            <TextInput style={styles.score} placeholder="Coupon Code" onChangeText={text => setCoupon(text)}></TextInput>
            <Button color='green' title = "Confirm Cart" onPress={() => navigation.navigate('ConfirmCart')}></Button>  
            <Text>  </Text> 
            <Button title="showtotal" onPress={showtotal}/>        
         
           <Text> </Text> 
            {/* <Button title='Show data' onPress={showData} /> */}
            {/* <Text>{console.warn("check kar raha hoon array",displayList)}</Text> */}
            {displayList.map((row, ind) => {
                {console.log("~~~~~~~~~~ row:", row)};
                return ( <View style = {styles.listitem}>

                    {/* ***condition for duplicate*** */}
                   {/* if(row[1] == row[1]) {

                    } */}


                {/* <Text key={ind}>{row[0]}</Text> */}
                <Image style = {styles.imagestyle} key={ind} source={ {uri: row[4]}}/>   
                <Text style={styles.title} key={ind}>{row[1]}</Text>
                <Text style={styles.score} key={ind}>Price: ${row[2]}</Text>
                
               
                <Text style={styles.score} key={ind}>Available: {row[3]}</Text>
                {/* <Text style={styles.score} key={ind}></Text> */}
                <Button title="remove item" onPress={(ind) => {
                                     console.log( `remove data ${ind}`);
                                     const currentUserId = auth.currentUser.email;
                                     console.log(currentUserId);
                                    
                                 fireDB.collection(currentUserId).where("name", "==", row[1])
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if(doc.data().user == currentUserId)
            {
                console.log("entered if loop");
                console.log(doc.data().user)

                 fireDB.collection(currentUserId).doc(doc.id).delete().then(() => {
                    alert("Item successfully deleted!");
                    showData();
                    // navigation.replace("ViewCart")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                
            }
        });
    })
    
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });



                }}></Button>
                {/* <cartCard name={row[1]} price={row[1]}></cartCard> */}
                </View> )
            })}
           
        </View>
    )
}
const styles = StyleSheet.create({
    sectionContainer:{
        marginTop: 10,
        paddingHorizontal: 24,
        flex:1,
    },
      separator :{
          height : 1,
          backgroundColor : "#dddddd",
      },
      imagestyle:{
          width: '80%',
           padding: 10,
           borderRadius : 1,
           height: 150,

           display: 'flex',
 

      },
      listitem : {
          flexDirection:'column',
          alignItems :'center',
          padding :10,
          
        },
        title: {
             fontSize : 16,
             textAlign : 'center',
             padding : 5,
             color: 'orangered',   
             
           display:'flex',
          
        },
        text: {
            fontSize : 16,
            textAlign : 'center',
           fontWeight:'bold',  
       },
        pickerstyle:{
            width:50,
            height:20,
             },
        synopsis : {
            fontSize : 15,
            textAlign : 'center',
            padding : 10,
            color: 'black',         
       },
       score:{
        fontSize : 15,
        textAlign : 'center',
        padding : 8,
        color: 'black', 
        fontWeight : 'bold',   
        
        display:'flex',
       
       },
       button: {
        backgroundColor: '#0782F9',
        width: '40%',
        borderRadius: 10,
        alignItems: 'center',
      }, 
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonalign:{
          flexDirection : "row",
        padding :10,
        alignItems: 'flex-end',
      }
});

export default ViewCart