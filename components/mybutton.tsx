import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

interface MyButtonProps {
  title: string;       
  onPress: () => void; 
}

export default function Mybutton({title, onPress}:MyButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onPress}>

            <ThemedText style={styles.text}>{title}</ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1A237E',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});