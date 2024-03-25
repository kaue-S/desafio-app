import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [foto, setFoto] = useState(null);

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  //permissao para acessara câmera
  useEffect(() => {
    async function verificarPermissao() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificarPermissao();
  }, []);
  /* =============== */

  const abrirCamera = async () => {};

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Button title="Tirar uma nova foto" />
        <View style={styles.campoBusca}>
          <Text>Digite o título da foto</Text>
          <TextInput style={styles.input} placeholder="Título da foto" />
        </View>
        <Button title="localização" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  campoBusca: {
    width: "100%",
  },

  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
