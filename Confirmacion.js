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
    FlatList,
    Image,
    TextInput,
} from 'react-native';

// importar para navegar entre pantallas
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

// export default class Login extends Component {
export default class Confirmacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // variables definition
            datosServer:"",
            contadorArticulos:0,
            carrito:[],
            deliveryAddress:"",
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
                console.log("JSON recibido: " + datos[0]["id"]);
            }
        };
        xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/mostrarCarrito.php?orderID="+this.props.route.params.orderID, true);
        xhttp.send();
    }

  

  render() {
    
    const celda = ({item}) => {
        return(
            <TouchableOpacity 
                // onPress={() => {
                //     //Alerta para eliminación: PENDIENTE
                //     Alert.alert(
                //         item.name,
                //         "¿Añadir a tu carrito?",
                //         [
                //             {
                //                 text: "Cancelar",
                //                 onPress: () => console.log("Cancelado"),
                //                 style: "cancel"
                //             },
                //             {   
                //                 text: "Eliminar", 
                //                 onPress: () => {
                //                     console.log("Eliminado");
                //                 }
                //             }
                //         ]
                //       );
                // }}
            >
                <View style={styles.celdaContainer}>
                    <View style={styles.productInfo}>
                        <Text style={styles.celda}>ID: {item.productID}</Text>
                        <Text style={styles.celda}>Nombre: {item.name}</Text>
                        <Text style={styles.celda}>Descripcion: {item.description}</Text>
                        <Text style={styles.celda}>Precio: {item.price}</Text>
                        <Text style={styles.celda}>Stock: {item.stock}</Text>
                        <Text style={styles.celda}>Activo: {item.active}</Text>
                    </View>
                    <View style={styles.fotoContainer}>
                        <Image
                            style={{width:100,height:100,borderRadius:8}}
                            source={{uri:item.picture}}
                            // source={require(this.props.route.params.imagen)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    
    // js programming for objects
    const btnClickRegresar = () => {
        this.props.navigation.goBack();
    }

    const btnConfirmar = () => {
        // guarda direccion de entrega en registro de la orden actual en la base de datos
        let _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("Petición enviada a servidor");
            if (this.readyState == 4 && this.status == 200) {
                // se realizó con éxito la insersion?
                if(xhttp.responseText != 0){
                    // guardamos orderID de la insercion
                    console.warn("Direccion de entrega actualizada");
                }else{
                    console.log("No se pudo guardar la direccion de entrega");
                }
            }
        };
        xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/updateDeliveryAddress.php?deliveryAddress=" + this.state.deliveryAddress + "&orderID="+this.props.route.params.orderID , true);
        console.log("http://tiendapp.freevar.com/tiendappScrips/updateDeliveryAddress.php?deliveryAddress=" + this.state.deliveryAddress + "&orderID="+this.props.route.params.orderID);
        xhttp.send();
    }

        
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground
                style={styles.background}
            >
                <View style={styles.espacioTitulo}>
                    <Text style={styles.textoTitulo}> Carrito ${this.props.route.params.total}.00 </Text>
                </View>

                <View>
                    <TextInput 
                        style={styles.input}
                        placeholder="Dirección de Entrega"
                        placeholderTextColor={"black"}
                        // get input and save in var email
                        onChangeText={deliveryAddress => this.setState({deliveryAddress})}
                    />
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
                        onPress={btnClickRegresar}
                    >
                        <Text style={styles.textoFooter}>Regresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={btnConfirmar}
                    >
                        <Text style={styles.textoFooter}>Confirmar</Text>
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
        color: "#F7F9F9",
        textAlign: "center",
        fontFamily:"arial",
    },
    espacioTitulo:{
        flex: 2,
        justifyContent:"center",
        backgroundColor:"#63D2FF"
    },
    espacioProductos:{
        flex: 7,
    },
    espacioFooter:{
        flex:1,
        backgroundColor:"#2081C3",
        flexDirection:"row",
        // borderTopWidth:1,
    }, 
    btnFooter:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // borderRightWidth:1,
        // borderLeftWidth:1,
    },
    celdaContainer:{
        marginHorizontal:20,
        marginVertical:20,
        // borderWidth:2,
        // borderColor:"black",
        padding:10,
        borderRadius:15,
        flex:1,
        backgroundColor: "#78D5D7",
        flexDirection:'row',
    },
    celda:{
        fontSize:15,
        fontFamily:"serif",
        color:"#F7F9F9",
        // fontWeight:"bold",
    },
    textoFooter:{
        fontSize:30,
        fontWeight:"bold",
        color:"#F7F9F9"
    },
    productInfo:{
        flex: 2,
    },
    fotoContainer:{
        flex: 1,
        justifyContent:"center",
        alignContent:"center",
    },
    input:{
        borderWidth: 2,
        fontSize: 25,
        marginTop: 10,
        marginHorizontal: 30,
        borderRadius: 8,
        color:"black",
    },
})