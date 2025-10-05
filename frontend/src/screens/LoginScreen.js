import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);
    const navigation = useNavigation();

    const handleLogin = async () => {
        setError('');
        if (username && password) {
            try {
                //Para poder probar con un telefono real (desde expo go) se hace la peticion a la IP local de la computadora
                //y no a localhost
                //Si se prueba en un emulador, usar localhost
                //const response = await fetch('http://localhost:5000/api-real-state/auth/login', {
                const response = await fetch('http://192.168.0.15:5000/api-real-state/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: username, contraseña: password })
                });
                const data = await response.json();
                if (response.ok && data.token) {
                    login({ username }, data.token);
                    navigation.navigate('Home');
                } else {
                    setError(data.mensaje || 'Error al iniciar sesión');
                }
            } catch (err) {
                setError('No se pudo conectar al servidor');
            }
        } else {
            setError('Ingrese usuario y contraseña');
        }
    };

    return (
        <View style={styles.padre}>
            <MaterialIcons name="real-estate-agent" size={100} color="#2E7D32" />
            <Text style={styles.title}>FerRealState</Text>
            {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
            <View style={styles.tarjeta}>
                <TextInput
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    style={[
                        styles.cajaTexto,
                        focusedInput === 'username' && styles.inputFocused
                    ]}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                />
                <TextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[
                        styles.cajaTexto,
                        focusedInput === 'password' && styles.inputFocused
                    ]}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                />
                <View style={styles.padreBoton}>
                    <TouchableOpacity 
                        style={styles.cajaBoton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginVertical: 20
    },
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 15,
        backgroundColor: '#E8F5E9',
        borderRadius: 30,
        marginVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: '#2E7D32',
        borderWidth: 2,
    },
    padreBoton: {
        alignItems: 'center'
    },
    cajaBoton: {
        backgroundColor: '#2E7D32',
        borderRadius: 30,
        paddingVertical: 15,
        width: 200,
        marginTop: 20
    },
    textoBoton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});