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
        this.props.navigation.navigate("Tienda")
    }
    const btnClickRegistro = () => {
        this.props.navigation.navigate("SignIn")
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
                        keyboardType='numeric'
                        // get input and save in var username
                        onChangeText={username => this.setState({username})}
                    />
                    <TextInput 
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
                        <Text>¿Aún no tienes una cuenta?</Text>
                        <Text style={{fontWeight:"bold"}}>¡Regístrate aquí!</Text>
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
        width:"45%",
        height: "12%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor:"#2081C3",
        borderWidth:2,
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
    },
    textoTitulo:{
        fontWeight:"bold",
        fontSize: 40,
        color: "#000",
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
        flex: 1.8,
    },
    footer:{
        flex:0.2,
        justifyContent:"center",
        backgroundColor:"#78D5D7"
    }, 
    btnFooter:{
        alignItems:"center",
    }
})