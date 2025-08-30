import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DataEntryScreen({ route }) {
    const { properties, setProperties } = useContext(UserContext);
    const navigation = useNavigation();
    const editingProperty = route.params?.property;
    
    const [propertyData, setPropertyData] = useState(
        editingProperty || {
            titulo: '',
            direccion: '',
            precio: '',
            dormitorios: '',
            baños: '',
            metros: '',
            descripcion: ''
        }
    );

    const handleSubmit = () => {
        if (editingProperty) {
            // Actualizar propiedad existente
            const updatedProperties = properties.map(prop => 
                prop.id === editingProperty.id 
                    ? { ...propertyData, id: prop.id } 
                    : prop
            );
            setProperties(updatedProperties);
        } else {
            // Crear nueva propiedad
            const newProperty = {
                id: Date.now().toString(),
                ...propertyData,
                fecha: new Date().toLocaleDateString()
            };
            setProperties([...properties, newProperty]);
        }
        navigation.navigate('List');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MaterialIcons name="house" size={60} color="#2E7D32" style={styles.icon} />
            <Text style={styles.title}>
                {editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Título de la propiedad"
                    value={propertyData.titulo}
                    onChangeText={(text) => setPropertyData({...propertyData, titulo: text})}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={propertyData.direccion}
                    onChangeText={(text) => setPropertyData({...propertyData, direccion: text})}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    value={propertyData.precio}
                    onChangeText={(text) => setPropertyData({...propertyData, precio: text})}
                    keyboardType="numeric"
                />

                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Dormitorios"
                        value={propertyData.dormitorios}
                        onChangeText={(text) => setPropertyData({...propertyData, dormitorios: text})}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Baños"
                        value={propertyData.baños}
                        onChangeText={(text) => setPropertyData({...propertyData, baños: text})}
                        keyboardType="numeric"
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Metros cuadrados"
                    value={propertyData.metros}
                    onChangeText={(text) => setPropertyData({...propertyData, metros: text})}
                    keyboardType="numeric"
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descripción"
                    value={propertyData.descripcion}
                    onChangeText={(text) => setPropertyData({...propertyData, descripcion: text})}
                    multiline
                    numberOfLines={4}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Guardar Propiedad</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        alignItems: 'center'
    },
    icon: {
        marginTop: 20,
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 20
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    input: {
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    halfInput: {
        width: '48%'
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top'
    },
    submitButton: {
        backgroundColor: '#2E7D32',
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
        marginTop: 10
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});