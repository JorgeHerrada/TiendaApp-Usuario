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
        carrito:[],
        total:0,
        orderID:"",
        ordenAplicada:0,
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
        console.log("JSON recibido: " + datos);
        // console.log(_this.state.datosServer);
      }
    };
    xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/mostrarProductos.php", true);
    xhttp.send();
  }

  render() {
    
    const celda = ({item}) => {
        return(
            <TouchableOpacity 
                onPress={() => {
                    Alert.alert(
                        item.name,
                        "¿Añadir a tu carrito?",
                        [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancelado"),
                                style: "cancel"
                            },
                            {   
                                text: "Agregar", 
                                onPress: () => {
                                    console.log("Agregado");
                                    this.setState({contadorArticulos:this.state.contadorArticulos+1});
                                    this.state.carrito.push(item.id);
                                    this.setState({total:this.state.total+parseInt(item.price)})
                                    console.log(this.state.carrito);
                                }
                            }
                        ]
                      );
                }}
            >
                <View style={styles.celdaContainer}>
                    <View style={styles.productInfo}>
                        <Text style={styles.celda}>ID: {item.id}</Text>
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
        this.props.navigation.navigate("Login");
    }

    const insertarProductInOrder = () => {
        if(this.state.orderID != ""){
            console.log("Enviando datos para guardar productsInOrder: " + this.state.carrito);

            for (const prodID of this.state.carrito){
                //mandando orden a servidor
                let _this = this;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    console.log("Petición enviada a servidor");
                    if (this.readyState == 4 && this.status == 200) {
                        // se realizó con éxito la insersion?
                        if(xhttp.responseText != 0){
                            console.log("ID producto insertado: "+prodID+"en orden: "+_this.state.orderID);
                        }else{
                            console.log("No se pudo insertar, respuesta: " + xhttp.responseText);
                        }
                    }
                };
                xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/altasProductInOrder.php?orderID="+this.state.orderID+"&productID="+prodID , true);
                xhttp.send();
            }

            this.props.navigation.navigate("Confirmacion",{orderID:this.state.orderID,total:this.state.total});
        }else{
            console.warn("Error, no hay orderID: " + this.setState.orderID);
        }
    }

    const btnOrdenar = () => {
        if(this.state.ordenAplicada == 1){
            this.props.navigation.navigate("Confirmacion",{orderID:this.state.orderID,total:this.state.total});
            console.warn("La orden ya ha sido aplicada.");
        } else {
            Alert.alert(
                "¿Ordenar?",
                "Confirma tu compra y acepta cuando estes listo.",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelado"),
                        style: "cancel"
                    },
                    {   
                        text: "Confirmar", 
                        onPress: () => {
                            if(this.state.contadorArticulos>0){
                                
                                console.log("Orden confirmada");
                                console.log(this.state.carrito);
                                
                                //mandando orden a servidor
                                let _this = this;
                                var xhttp = new XMLHttpRequest();
                                xhttp.onreadystatechange = function() {
                                    console.log("Petición enviada a servidor");
                                    if (this.readyState == 4 && this.status == 200) {
                                        // se realizó con éxito la insersion?
                                        if(xhttp.responseText != 0){
                                            // guardamos orderID de la insercion
                                            _this.setState({orderID:xhttp.responseText}); 
                                            console.log("ID orden insertado: " + _this.state.orderID);
                                            insertarProductInOrder();
                                            _this.setState({ordenAplicada:1});
                                        }else{
                                            console.log("No se pudo insertar, respuesta: " + xhttp.responseText);
                                        }
                                    }
                                };
                                xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/altasOrden.php?deliveryAddress="+""+"&nProducts="+this.state.contadorArticulos+"&total="+this.state.total+"&userID="+this.props.route.params.id , true);
                                console.log("http://tiendapp.freevar.com/tiendappScrips/altasOrden.php?deliveryAddress="+""+"&nProducts="+this.state.contadorArticulos+"&total="+this.state.total+"&userID="+this.props.route.params.id);
                                xhttp.send();
                            }else{
                                // desplegar alerta
                                Alert.alert(
                                    "Carrito Vacío",
                                    "Ingresa algún producto a tu carrito.",
                                    [{ text: "OK"}]
                                );
                                console.log("Carrito vacio");
                            }
                                
                        }
                    }
                ]
            );
                    // this.props.navigation.navigate("Confirmacion",{carrito:this.state.carrito,count:this.state.contadorArticulos,id:this.props.route.params.id,name:this.props.route.params.name});
        }
    }
        
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground
                style={styles.background}
            >
                <View style={styles.espacioTitulo}>
                    <Text style={styles.textoTitulo}> Carrito ({this.state.contadorArticulos}) </Text>
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
                        onPress={btnOrdenar}
                    >
                        <Text style={styles.textoFooter}>Ordenar (${this.state.total}.00) </Text>
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
    }
})