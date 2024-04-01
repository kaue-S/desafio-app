import { SafeAreaView, StyleSheet } from "react-native";
import Home from "../Screens/Home";
import Camera from "./Camera";

export default function Container(){
    return(
        <SafeAreaView style={styles.container}>
            <Home />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      padding: 16,
      gap: 25,
    },
  });