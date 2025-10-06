import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [otrosEnabled, setOtrosEnabled] = useState(false); // Nuevo estado para "Otros"

    const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleOtros = () => setOtrosEnabled(!otrosEnabled);

    const handleChangePassword = () => {
        console.log("Cambiar contraseña");
    };

    const handleDeleteAccount = () => {
        console.log("Eliminar cuenta");
    };

    // Estilos dinámicos para modo oscuro
    const dynamicStyles = {
        container: {
            ...styles.container,
            backgroundColor: darkMode ? '#222' : '#eaeeffff',
        },
        title: {
            ...styles.title,
            color: darkMode ? '#fff' : '#005187',
        },
        card: {
            ...styles.card,
            backgroundColor: darkMode ? '#333' : '#fff',
            shadowColor: darkMode ? '#fff' : '#000',
        },
        cardTitle: {
            ...styles.cardTitle,
            color: darkMode ? '#fff' : '#005187',
        },
        settingText: {
            ...styles.settingText,
            color: darkMode ? '#eee' : '#333',
        },
        optionButton: {
            ...styles.optionButton,
            backgroundColor: darkMode ? '#005187' : '#005187',
        },
        deleteButton: {
            ...styles.deleteButton,
            backgroundColor: darkMode ? '#dc3545' : '#dc3545',
        },
        optionText: {
            ...styles.optionText,
            color: darkMode ? '#fff' : '#fff',
        }
    };

    return (
        <ScrollView contentContainerStyle={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Configuraciones</Text>

            <View style={dynamicStyles.card}>
                <Text style={dynamicStyles.cardTitle}>Preferencias</Text>

                <View style={styles.settingRow}>
                    <Text style={dynamicStyles.settingText}>Notificaciones</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: darkMode ? "#555" : "#ccc", true: "#005187" }}
                        thumbColor={darkMode ? "#fff" : "#fff"}
                    />
                </View>

                <View style={styles.settingRow}>
                    <Text style={dynamicStyles.settingText}>Otros</Text>
                    <Switch
                        value={otrosEnabled}
                        onValueChange={toggleOtros}
                        trackColor={{ false: darkMode ? "#555" : "#ccc", true: "#005187" }}
                        thumbColor={darkMode ? "#fff" : "#fff"}
                    />
                </View>

                <View style={styles.settingRow}>
                    <Text style={dynamicStyles.settingText}>Modo oscuro</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: darkMode ? "#555" : "#ccc", true: "#005187" }}
                        thumbColor={darkMode ? "#fff" : "#fff"}
                    />
                </View>
            </View>

            <View style={dynamicStyles.card}>
                <Text style={dynamicStyles.cardTitle}>Seguridad</Text>

                <TouchableOpacity style={dynamicStyles.optionButton} onPress={handleChangePassword}>
                    <Text style={dynamicStyles.optionText}>Cambiar contraseña</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={dynamicStyles.optionText}>Eliminar cuenta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#eaeeffff",
        padding: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#005187",
        marginBottom: 20
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#005187",
        marginBottom: 15
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    settingText: {
        fontSize: 16,
        color: "#333"
    },
    optionButton: {
        backgroundColor: "#005187",
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: "center",
        marginVertical: 5
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: "center",
        marginVertical: 5
    },
    optionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});