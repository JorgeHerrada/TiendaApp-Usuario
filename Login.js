// import objects
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Dimensions,
} from 'react-native';

// importar para navegar entre pantallas
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // variables definition
        username:"",
        password:"",
    };
  }

  render() {
    // js programming for objects
    const btnClickEntrar = () => {
        this.props.navigation.navigate("Tienda");
    }
    const btnClickRegistro = () => {
        this.props.navigation.navigate("SignIn");
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
                <View style={styles.espacioLogo}>
                    <Text style={styles.textoTitulo}> Tienda App </Text>
                </View>
                
                <View style={styles.espacioLogin}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Correo"
                        placeholderTextColor={"black"}
                        // get input and save in var username
                        onChangeText={username => this.setState({username})}
                        />
                    <TextInput 
                        placeholderTextColor={"black"}
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        />
                    
                    <TouchableOpacity
                            style={styles.btnEntrar}
                            activeOpacity={0.7}
                            onPress={btnClickEntrar}
                    > 
                        <Text style={styles.textoBoton}> Entrar </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={btnClickRegistro}
                    >
                        <Text style={styles.textoFooter1}>¿Aún no tienes una cuenta?</Text>
                        <Text style={styles.textoFooter2}>¡Regístrate aquí!</Text>
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
    btnEntrar:{
        width:"50%",
        height: "12%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor:"#78D5D7",
        // borderWidth:2,
        borderRadius: 8,
        justifyContent:"center",
        alignItems:"center",        
    },
    input:{
        borderWidth: 2,
        fontSize: 25,
        marginTop: 10,
        marginHorizontal: 30,
        borderRadius: 8,
        color:"black",
    },
    textoTitulo:{
        fontWeight:"bold",
        fontSize: 40,
        color: "black",
        textAlign: "center",
        fontFamily:"arial",
    },
    textoBoton:{
        fontSize: 30,
        color:"#F7F9F9",
        fontWeight:"bold",
        
    },
    espacioLogo:{
        flex: 1,
        justifyContent:"center",
    },
    espacioLogin:{
        flex: 1.7,
    },
    footer:{
        flex:0.3,
        justifyContent:"center",
        backgroundColor:"#2081C3"
    }, 
    btnFooter:{
        alignItems:"center",
    },
    textoFooter1:{
        fontSize:20,
        color:"#F7F9F9",
        // fontWeight:"bold",
    },
    textoFooter2:{
        fontSize:20,
        color:"#F7F9F9",
        fontWeight:"bold",
    }
})