import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const { user, token, properties } = useContext(UserContext);
    const navigation = useNavigation();
    const [darkTheme, setDarkTheme] = useState(false);
    const [language, setLanguage] = useState('es');

    // Guardamos la información del usuario para mostrarla en el perfil
    const [userInfo] = useState({
        nombre: 'Fernando Agente',
        email: 'fernando@ferreal.com',
        telefono: '+503 7777-7777',
        cargo: 'Agente Inmobiliario Senior',
        experiencia: '5 años'
    });

    // Cargar preferencias de AsyncStorage
    useEffect(() => {
        const loadPrefs = async () => {
            const theme = await AsyncStorage.getItem('theme');
            const lang = await AsyncStorage.getItem('language');
            if (theme) setDarkTheme(theme === 'dark');
            if (lang) setLanguage(lang);
        };
        loadPrefs();
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

    // Guardar preferencias en AsyncStorage
    const handleThemeChange = async (value) => {
        setDarkTheme(value);
        await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
    };
    const handleLanguageChange = async (value) => {
        setLanguage(value);
        await AsyncStorage.setItem('language', value);
    };

    // Esta función se llama cuando el usuario quiere salir del perfil
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('theme');
        await AsyncStorage.removeItem('language');
        navigation.navigate('Login');
    };

    // Estilos dinámicos para modo oscuro
    const dynamicStyles = {
        container: {
            ...styles.container,
            backgroundColor: darkTheme ? '#222' : '#F5F5F5',
        },
        name: {
            ...styles.name,
            color: darkTheme ? '#fff' : '#2E7D32',
        },
        email: {
            ...styles.email,
            color: darkTheme ? '#ccc' : '#666',
        },
        infoCard: {
            ...styles.infoCard,
            backgroundColor: darkTheme ? '#333' : '#fff',
            shadowColor: darkTheme ? '#fff' : '#000',
        },
        statsCard: {
            ...styles.statsCard,
            backgroundColor: darkTheme ? '#333' : '#fff',
            shadowColor: darkTheme ? '#fff' : '#000',
        },
        infoTitle: {
            ...styles.infoTitle,
            color: darkTheme ? '#fff' : '#2E7D32',
        },
        infoItem: {
            ...styles.infoItem,
            color: darkTheme ? '#eee' : '#444',
        },
        editButton: {
            ...styles.editButton,
            backgroundColor: darkTheme ? '#4CAF50' : '#2E7D32',
        },
        logoutButton: {
            ...styles.logoutButton,
            backgroundColor: darkTheme ? '#f44336' : '#d32f2f',
        },
        buttonText: {
            ...styles.buttonText,
            color: '#fff',
        },
        languageButton: {
            ...styles.languageButton,
            backgroundColor: darkTheme ? '#555' : '#E8F5E9',
        },
        languageSelected: {
            backgroundColor: darkTheme ? '#4CAF50' : '#2E7D32',
        }
    };

    // Aquí está el contenido principal de la pantalla de perfil
    return (
        <ScrollView contentContainerStyle={dynamicStyles.container}>
            {/* Mostramos el avatar y nombre del usuario */}
            <View style={styles.avatarContainer}>
                <MaterialIcons name="person" size={80} color="#2E7D32" />
            </View>

            <Text style={dynamicStyles.name}>{userInfo.nombre}</Text>
            <Text style={dynamicStyles.email}>{userInfo.email}</Text>

            {/* Mostramos información personal */}
            <View style={dynamicStyles.infoCard}>
                <Text style={dynamicStyles.infoTitle}>Información Personal</Text>
                <Text style={dynamicStyles.infoItem}>Teléfono: {userInfo.telefono}</Text>
                <Text style={dynamicStyles.infoItem}>Cargo: {userInfo.cargo}</Text>
                <Text style={dynamicStyles.infoItem}>Experiencia: {userInfo.experiencia}</Text>
            </View>

            {/* Preferencias de usuario */}
            <View style={dynamicStyles.statsCard}>
                <Text style={dynamicStyles.infoTitle}>Preferencias</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={dynamicStyles.infoItem}>Tema Oscuro</Text>
                    <Switch value={darkTheme} onValueChange={handleThemeChange} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={dynamicStyles.infoItem}>Idioma</Text>
                    <TouchableOpacity style={[dynamicStyles.languageButton, language === 'es' && dynamicStyles.languageSelected]} onPress={() => handleLanguageChange('es')}>
                        <Text style={dynamicStyles.buttonText}>ES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[dynamicStyles.languageButton, language === 'en' && dynamicStyles.languageSelected]} onPress={() => handleLanguageChange('en')}>
                        <Text style={dynamicStyles.buttonText}>EN</Text>
                    </TouchableOpacity>
                </View>
                <Text style={dynamicStyles.infoTitle}>Estadísticas</Text>
                <Text style={dynamicStyles.infoItem}>Propiedades Registradas: {properties?.length || 0}</Text>
                <Text style={dynamicStyles.infoItem}>Propiedades Vendidas: 0</Text>
                <Text style={dynamicStyles.infoItem}>Propiedades en Alquiler: 0</Text>
            </View>

            {/* Botón para editar el perfil */}
            <TouchableOpacity style={dynamicStyles.editButton} onPress={() => {}}>
                <Text style={dynamicStyles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>

            {/* Botón para cerrar sesión */}
            <TouchableOpacity style={dynamicStyles.logoutButton} onPress={handleLogout}>
                <Text style={dynamicStyles.buttonText}>Cerrar Sesión</Text>
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
    },
    languageButton: {
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 5,
    },
    languageSelected: {
        backgroundColor: '#2E7D32',
    }
});