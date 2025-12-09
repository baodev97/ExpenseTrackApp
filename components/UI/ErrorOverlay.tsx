import { GlobalStyles } from "@/constants/styles";
import { Button, StyleSheet, Text, View } from "react-native";

type ErrorOverlayProps = {
  message: string;
  onConfirm: () => void;
};

function ErrorOverlay({ message, onConfirm }: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title,styles.text]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Okey" onPress={onConfirm} />
    </View>
  );
}
export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
