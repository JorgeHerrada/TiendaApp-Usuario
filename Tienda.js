// import objects
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Dimensions,
    FlatList
} from 'react-native';

// importar para navegar entre pantallas
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

// export default class Login extends Component {
export default class Tienda extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // variables definition
        datosServer:"",
        contadorArticulos:0,
    };
  }

  // ejecuta cada que se carga la vista
  componentDidMount(){
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log("Petición enviada a servidor");
      if (this.readyState == 4 && this.status == 200) {
        // save data from server on JS object
        var datos=JSON.parse(xhttp.responseText);
        _this.setState({datosServer:datos}); // save object
        console.log("JSON recibido");
      }
    };
    xhttp.open("GET", "https://herradapinternet.000webhostapp.com/mostrarDatos.php", true);
    xhttp.send();
  }

  render() {
    
    const celda = ({item}) => {
        return(
          <View style={styles.celdaContainer}>
            <TouchableOpacity 
                // onPress={() => getItem(item.id,item.nombre,item.codigo,item.imagen)}
            >
                <Text style={styles.celda}>id: {item.id}</Text>
                <Text style={styles.celda}>nombre: {item.nombre}</Text>
                <Text style={styles.celda}>codigo: {item.codigo}</Text>
                <Text style={styles.celda}>tarea: {item.tarea}</Text>
                <Text style={styles.celda}>imagen URL: {item.imagen}</Text>
            </TouchableOpacity>
          </View>
        )
      }
    
    
    // js programming for objects
    const btnClick = () => {
        this.props.navigation.navigate("Confirmacion");
    }
    
    // Display pop up alert 
    const badLoginalert = () =>
    Alert.alert(
        "Login invalido",
        "Los datos introducidos son inválidos, intenta de nuevo.",
        [
            { text: "OK"}
        ]
    );
    
    
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground
                style={styles.background}
            >
                <View style={styles.espacioTitulo}>
                    <Text style={styles.textoTitulo}> Selecciona tus productos </Text>
                </View>
                
                <View style={styles.espacioProductos}>
                    <FlatList
                        data={this.state.datosServer}
                        renderItem={celda}
                        keyExtractor={(item,index) => index.toString()}
                        style={styles.flatList}
                    />
                </View>
                <View style={styles.espacioFooter}>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={btnClick}
                    >
                        <Text>Ordenar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground> 
        </SafeAreaView>
    );
  }
}


// styles
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#F7F9F9",
        // Make sure the bg image stays same size when keyboard displays
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textoTitulo:{
        fontWeight:"bold",
        fontSize: 40,
        color: "#000",
        textAlign: "center",
        fontFamily:"arial",
    },
    espacioTitulo:{
        flex: 2,
        justifyContent:"center",
        backgroundColor:"#BED8D4"
    },
    espacioProductos:{
        flex: 7,
    },
    espacioFooter:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#78D5D7"
    }, 
    btnFooter:{
        alignItems:"center",
    },
    celdaContainer:{
        marginHorizontal:20,
        marginVertical:20,
        borderWidth:2,
        borderColor:"black",
        padding:10,
        borderRadius:15,
        flex:1,
        backgroundColor: "#FFE3E1",
    },
    celda:{
        fontSize:20,
        fontFamily:"serif",
        color:"black",
    },
})