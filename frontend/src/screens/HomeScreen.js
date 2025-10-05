import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation();
    const { user, token, logout } = useContext(UserContext);

    // Si no está autenticado, redirigir a Login
    React.useEffect(() => {
        if (!token) {
            navigation.navigate('Login');
        }
    }, [token]);

    if (!token) {
        return null; // O un loader
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {user?.username}</Text>
            <Text style={styles.subtitle}>Panel de Control</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('List')}
            >
                <MaterialIcons name="house" size={24} color="white" />
                <Text style={styles.buttonText}>Ver Propiedades</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('DataEntry')}
            >
                <MaterialIcons name="add-home" size={24} color="white" />
                <Text style={styles.buttonText}>Nueva Propiedad</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
            >
                <MaterialIcons name="person" size={24} color="white" />
                <Text style={styles.buttonText}>Mi Perfil</Text>
            </TouchableOpacity>

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