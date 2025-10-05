import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation();
    const { user, token, logout } = useContext(UserContext);

    // Cuando el usuario no ha iniciado sesión, mostramos una alerta y lo mandamos a la pantalla de Login
    React.useEffect(() => {
        if (!token) {
            Alert.alert(
                'Acceso denegado',
                'Debes iniciar sesión para acceder a esta pantalla.',
                [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ],
                { cancelable: false }
            );
        }
    }, [token]);

    // Si no hay token, no mostramos nada (evita que se vea la pantalla si no está logueado)
    if (!token) {
        return null;
    }

    // Aquí está el contenido principal de la pantalla de inicio
    return (
        <View style={styles.container}>
            {/* Mostramos el nombre del usuario */}
            <Text style={styles.title}>Bienvenido, {user?.username}</Text>
            <Text style={styles.subtitle}>Panel de Control</Text>

            {/* Botón para ver propiedades */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('List')}
            >
                <MaterialIcons name="house" size={24} color="white" />
                <Text style={styles.buttonText}>Ver Propiedades</Text>
            </TouchableOpacity>

            {/* Botón para agregar nueva propiedad */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('DataEntry')}
            >
                <MaterialIcons name="add-home" size={24} color="white" />
                <Text style={styles.buttonText}>Nueva Propiedad</Text>
            </TouchableOpacity>

            {/* Botón para ir al perfil */}
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
            >
                <MaterialIcons name="person" size={24} color="white" />
                <Text style={styles.buttonText}>Mi Perfil</Text>
            </TouchableOpacity>

            {/* Botón para cerrar sesión */}
            <TouchableOpacity 
                style={styles.buttonDanger}
                onPress={() => { logout(); navigation.navigate('Login'); }}
            >
                <MaterialIcons name="logout" size={24} color="white" />
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#F5F5F5'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2E7D32'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        color: '#666'
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#2E7D32',
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonDanger: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#d32f2f',
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});