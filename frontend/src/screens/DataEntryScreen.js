import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useSQLiteContext } from "expo-sqlite";

export default function DataEntryScreen({ route }) {
    const [propertyData, setPropertyData] = useState(
        route.params?.property || {
            titulo: '',
            direccion: '',
            precio: '',
            dormitorios: '',
            banos: '',
            metros: '',
            descripcion: ''
        }
    );
    const db = useSQLiteContext(); // Hook para obtener la instancia de la base de datos
    const navigation = useNavigation();
    const editingProperty = route.params?.property;

    const addProperty = async (property) => {
        try {
            await db.runAsync("INSERT INTO propiedades (titulo, direccion, precio, dormitorios, banos, metros, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                property.titulo,
                property.direccion,
                Number(property.precio),
                Number(property.dormitorios),
                Number(property.banos),
                Number(property.metros),
                property.descripcion
            ]);
            // Limpiar campos después de guardar
            setPropertyData({
                titulo: '',
                direccion: '',
                precio: '',
                dormitorios: '',
                banos: '',
                metros: '',
                descripcion: ''
            });
        } catch (error) {
            console.error('Error al agregar propiedad:', error);
            Alert.alert('Error', `No se pudo agregar la propiedad.\n${error?.message || error}`);
        }
    };

        const updateProperty = async (property) => {
            try {
                await db.runAsync("UPDATE propiedades SET titulo = ?, direccion = ?, precio = ?, dormitorios = ?, banos = ?, metros = ?, descripcion = ? WHERE id = ?", [
                    property.titulo,
                    property.direccion,
                    Number(property.precio),
                    Number(property.dormitorios),
                    Number(property.banos),
                    Number(property.metros),
                    property.descripcion,
                    property.id
                ]);
            } catch (error) {
                console.error('Error al actualizar propiedad:', error);
                Alert.alert('Error', `No se pudo actualizar la propiedad.\n${error?.message || error}`);
            }
        };

    // Función para agregar o editar propiedad
    const addPropertyHandler = async () => {
        try {
            const requiredFields = [
                { key: 'titulo', label: 'Título de la propiedad' },
                { key: 'direccion', label: 'Dirección' },
                { key: 'precio', label: 'Precio' },
                { key: 'dormitorios', label: 'Dormitorios' },
                { key: 'banos', label: 'Baños' },
                { key: 'metros', label: 'Metros cuadrados' },
                { key: 'descripcion', label: 'Descripción' }
            ];
            for (const field of requiredFields) {
                if (!propertyData[field.key] || propertyData[field.key].toString().trim() === '') {
                    Alert.alert('Campo requerido', `Por favor ingresa: ${field.label}`);
                    return;
                }
            }
            if (editingProperty) {
                // Editar propiedad existente
                await updateProperty({ ...propertyData, id: editingProperty.id });
                Alert.alert('Éxito', 'Propiedad actualizada con éxito');
            } else {
                // Agregar nueva propiedad (sin id ni fecha)
                await addProperty({ ...propertyData });
                Alert.alert('Éxito', 'Propiedad agregada con éxito');
                setPropertyData({
                    titulo: '',
                    direccion: '',
                    precio: '',
                    dormitorios: '',
                    banos: '',
                    metros: '',
                    descripcion: ''
                });
            }
            navigation.navigate('List');
        } catch (error) {
            console.error('Error al guardar/editar propiedad:', error);
            Alert.alert('Error', `No se pudo guardar/editar la propiedad.\n${error?.message || error}`);
        }
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
                    value={propertyData.precio != null ? String(propertyData.precio) : ''}
                    onChangeText={(text) => setPropertyData({...propertyData, precio: text})}
                    keyboardType="numeric"
                />

                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Dormitorios"
                        value={propertyData.dormitorios != null ? String(propertyData.dormitorios) : ''}
                        onChangeText={(text) => setPropertyData({...propertyData, dormitorios: text})}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Baños"
                        value={propertyData.banos != null ? String(propertyData.banos) : ''}
                        onChangeText={(text) => setPropertyData({...propertyData, banos: text})}
                        keyboardType="numeric"
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Metros cuadrados"
                    value={propertyData.metros != null ? String(propertyData.metros) : ''}
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

                <TouchableOpacity style={styles.submitButton} onPress={addPropertyHandler}>
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