import { useState,useEffect} from "react";
import { Picker,View,Text,Image,StyleSheet, Pressable,ActivityIndicator, Button,TouchableOpacity} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/core'
import { add } from "react-native-reanimated";
import { auth, fireDB } from '../firebase'


const HomeScreen = ( { navigation }) => {

    const [menudata, setmenudata] = useState([]);
    const [datasearched,setdatasearched] = useState([]);

    const [searchitem,setsearchitem] = useState();

    const [isLoading,setLoading] = useState(true);

    // const navigation = useNavigation();
   
    const getAnimeFromAPI = () => {

        const apiURL = `https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json`
        // console.log(apiURL);
         
        return fetch(apiURL)
        .then((response) => response.json().then ( (json) => {setmenudata(json);  console.log(json); } )
        .catch( (error) => {console.error(error); })
        .finally( () => setLoading(false) )
        );
    }  
    useEffect ( () => {getAnimeFromAPI()
    }, []);
    
   const filterdata = () => {
      // console.log(`data loading ${JSON.stringify(menudata)}`)
      // setdatasearched(JSON.stringify(menudata));
 
      menudata.forEach(element => {
        if(element.Title.match(searchitem))
        {
          datasearched.push(element);
          // setdatasearched(datasearched);
          console.log(datasearched);
        }
      });
      //  console.log(`hii there ${datasearched}`);
      
    }

  //   useEffect( () => {
  //     console.log("executed everytime the component receives new state or prop");
  // });
    

    
    // const Viewcartdata = () => {
    //   console.log(addtocart);
    //   navigation.navigate('Viewcart',{ Datasent : addtocart});
    // }
        
//  const [quantity,setquantity]= useState();

    const renderItem = ( {item} ) => (
        <View style = {styles.listitem}>
                <Image style = {styles.imagestyle} source={ {uri: item.Image}}/>   
                 <Text style= {styles.title}> {item.Title}</Text>
                 <Text style= {styles.synopsis}> {item.Description}</Text>
                 <Text style= {styles.score}>Price : {item.Price}</Text>
                 <Text style= {styles.score}>Available : {item.Available}</Text>
                 {/* <Button title="+" 
                 onPress={
                   () => {
                     setquantity(item.Available + 1);
                    }}/> 
                 <Text>No of Items : {quantity}</Text>
                 <Button title="-"
                 onPress={
                  () => {
                    setquantity(item.Available - 1);
                   }}/> */}
                 <Button title="Add To Cart" 
                 onPress ={ () => {
                      if (item.Available == 0) {
                        alert("Item is not Available. Please Check after Some Time");
                      }else {
                      
                            fireDB.collection(auth.currentUser?.email).add({
                        user: auth.currentUser?.email  ,
                        name: item.Title,
                        price: item.Price,
                        available: item.Available,
                        image: item.Image,  
                      })
                      .then((docRef) => {
                          console.log("Document written with ID: ", docRef.id);
                      })
                      .catch((error) => {
                          console.error("Error adding document: ", error);
                      });
                                     
                  }
                 }}
                />
                <View style = {styles.separator}/>
            </View>
          
    );

    // const handleSignOut = () => {
    //     console.log("signed out from here");
    //     console.log(JSON.stringify(menudata));
    //         navigation.replace("Signin")
    //   }


  
    return(
          
        <View style = {styles.sectionContainer}>
     

     <View style = {styles.buttonalign}>
         
    
     <TextInput
          placeholder="Search Item"
          value={searchitem}
          onChangeText={setsearchitem}
        />
      
      <Button title="Search" onPress={filterdata}></Button>


     <TouchableOpacity
          onPress={() => navigation.navigate('ViewCart')}
        
      >
         {/* <Text style={{bottom:-33,right:-82}}>Cart</Text> */}
    <Image style = {{width:50,height:50,marginLeft:30}} source={{ uri: 'https://toppng.com/uploads/preview/shopping-cart-11530997216xsrc2jr32q.png' }}></Image>
     
        {/* <Image style={styles.buttonText}></Text> */}
      </TouchableOpacity>
      {/* <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
        <TouchableOpacity
          onPress={
            handleSignOut
          }
        style={styles.signout}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}
      
      </View>
{/*  
         {isLoading ? (
                <ActivityIndicator animating={true} size="large"/> ) :}
         (  */}

          {searchitem?.length > 0 ?
           <FlatList
           data = {datasearched}
           keyExtractor = { (item) => {return item.id}}
           renderItem = { renderItem }
          /> :
          <FlatList
          data = {menudata}
          keyExtractor = { (item) => {return item.id}}
          renderItem = { renderItem }
          />
          }

         {/* ) */}
          
        </View>
    );
   
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
          width: '90%',
           padding: 10,
           borderRadius : 1,
           height: 150,

      },
      listitem : {
          flexDirection:'column',
          alignItems :'center',
          padding :10,
        },
        title: {
             fontSize : 16,
             textAlign : 'center',
             padding : 10,
             color: 'orangered',      
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
        padding : 10,
        color: 'black', 
        fontWeight : 'bold',   
       },
       button: {
        backgroundColor: '#0782F9',
        width: '27%',
        borderRadius: 10,
        alignItems: 'center',
      },
      signout: {
        backgroundColor: 'red',
        width: '10%',
        borderRadius: 50,
        alignItems: 'center',
      } ,
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
export default HomeScreen;

    //     fireDB.collection(auth.currentUser.email).where("name", "==", item.Title)
                    //     .get()
                    //     .then((querySnapshot) => {
                    //         querySnapshot.forEach((doc) => {
                    //             console.log(doc.id, " => ", doc.data().name);
                    //             const data = doc.data().name;
                    //             console.log(data);
                    //           });
                    //         })
                    // console.log(data);
                    //  if(data == item.Title){
                    //   alert("The data is already added to the cart");
                    //  }
                    // else {