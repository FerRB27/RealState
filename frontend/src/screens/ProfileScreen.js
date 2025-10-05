import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const { user, token, properties } = useContext(UserContext);
    const navigation = useNavigation();

    // Guardamos la información del usuario para mostrarla en el perfil
    const [userInfo] = useState({
        nombre: 'Fernando Agente',
        email: 'fernando@ferreal.com',
        telefono: '+503 7777-7777',
        cargo: 'Agente Inmobiliario Senior',
        experiencia: '5 años'
    });

    // Si el usuario no ha iniciado sesión, mostramos una alerta y lo mandamos a Login
    useEffect(() => {
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

    // Esta función se llama cuando el usuario quiere salir del perfil
    const handleLogout = () => {
        navigation.navigate('Login');
    };

    // Aquí está el contenido principal de la pantalla de perfil
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Mostramos el avatar y nombre del usuario */}
            <View style={styles.avatarContainer}>
                <MaterialIcons name="person" size={80} color="#2E7D32" />
            </View>

            <Text style={styles.name}>{userInfo.nombre}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>

            {/* Mostramos información personal */}
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Información Personal</Text>
                <Text style={styles.infoItem}>Teléfono: {userInfo.telefono}</Text>
                <Text style={styles.infoItem}>Cargo: {userInfo.cargo}</Text>
                <Text style={styles.infoItem}>Experiencia: {userInfo.experiencia}</Text>
            </View>

            {/* Mostramos estadísticas de propiedades */}
            <View style={styles.statsCard}>
                <Text style={styles.infoTitle}>Estadísticas</Text>
                <Text style={styles.infoItem}>Propiedades Registradas: {properties?.length || 0}</Text>
                <Text style={styles.infoItem}>Propiedades Vendidas: 0</Text>
                <Text style={styles.infoItem}>Propiedades en Alquiler: 0</Text>
            </View>

            {/* Botón para editar el perfil */}
            <TouchableOpacity style={styles.editButton} onPress={() => {}}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>

            {/* Botón para cerrar sesión */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#2E7D32'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 5
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    infoCard: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    statsCard: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 10
    },
    infoItem: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8
    },
    editButton: {
        backgroundColor: '#2E7D32',
        borderRadius: 30,
        paddingVertical: 15,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15
    },
    logoutButton: {
        backgroundColor: '#d32f2f',
        borderRadius: 30,
        paddingVertical: 15,
        width: '80%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});