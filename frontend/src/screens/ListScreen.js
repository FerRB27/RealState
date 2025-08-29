import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function ListScreen() {
    const { properties, setProperties } = useContext(UserContext);

    const handleDelete = (id) => {
        Alert.alert(
            "Eliminar Propiedad",
            "¿Está seguro que desea eliminar esta propiedad?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        const updatedProperties = properties.filter(prop => prop.id !== id);
                        setProperties(updatedProperties);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.propertyCard}>
            <View style={styles.propertyHeader}>
                <MaterialIcons name="house" size={24} color="#2E7D32" />
                <Text style={styles.propertyTitle}>{item.titulo}</Text>
            </View>

            <Text style={styles.propertyPrice}>$ {item.precio}</Text>
            <Text style={styles.propertyAddress}>{item.direccion}</Text>

            <View style={styles.propertyDetails}>
                <View style={styles.detailItem}>
                    <MaterialIcons name="king-bed" size={20} color="#666" />
                    <Text style={styles.detailText}>{item.dormitorios} hab.</Text>
                </View>
                <View style={styles.detailItem}>
                    <MaterialIcons name="bathtub" size={20} color="#666" />
                    <Text style={styles.detailText}>{item.baños} baños</Text>
                </View>
                <View style={styles.detailItem}>
                    <MaterialIcons name="square-foot" size={20} color="#666" />
                    <Text style={styles.detailText}>{item.metros} m²</Text>
                </View>
            </View>

            <Text style={styles.propertyDescription} numberOfLines={2}>
                {item.descripcion}
            </Text>

            <View style={styles.buttonGroups}>
                <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {}}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Propiedades Disponibles</Text>
            {properties.length === 0 ? (
                <View style={styles.emptyState}>
                    <MaterialIcons name="house" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No hay propiedades registradas</Text>
                </View>
            ) : (
                <FlatList
                    data={properties}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 20,
        textAlign: 'center'
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    propertyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    propertyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginLeft: 10,
        flex: 1
    },
    propertyPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B5E20',
        marginBottom: 5
    },
    propertyAddress: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    propertyDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 10
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailText: {
        marginLeft: 5,
        color: '#666'
    },
    propertyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    buttonGroups: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    editButton: {
        backgroundColor: '#FFA000',
        borderRadius: 5,
        padding: 10,
        width: '48%',
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: '#d32f2f',
        borderRadius: 5,
        padding: 10,
        width: '48%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10
    }
});