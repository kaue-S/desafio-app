import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

//captura de imagens
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

//geolocalização
import GeoLocalizacao from "./src/Components/GeoLocalizacao";

export default function App() {
  /* Captura de foto */
  const [foto, setFoto] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [titulo, setTitulo] = useState("");

  //permissao para acessara câmera

  useEffect(() => {
    async function verificarPermissao() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    verificarPermissao();
  }, []);
  /* =============== */

  /* abrir a câmera  */
  const abrirCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });
    /* =========== */

    /* salvando imagem na memória física */
    if (!imagem.canceled) {
      //Usando API do MediaLibrary para salvar no armazenamento físico do dispositivo
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };
  /* ============= */

  //Ao pressionar o botão, executa esta função
  const escolherFoto = async () => {
    //Acessando via ImagePicker a biblioteca para a seleção de apenas imagens, com recursos de edição habilitado, proporção de 16,9 e qualidade total.
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };
  console.log(foto);

  // ===========//

  /* Fim captura de foto */

  /* Salvar foto com titulo e localização */
  const salvarFoto = () => {
    // salvar a foto junto com o título e a localização
    const fotoSalva = {
      uri: foto,
      titulo: titulo,
      localizacao: localizacao,
    };
    setBotaoSalvar(true);
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <ScrollView>
          <Pressable
            onPress={abrirCamera}
            style={styles.BotaoFoto}
            title="Tirar foto"
          >
            <Text style={styles.textoBotao}>Tirar foto</Text>
          </Pressable>

          <Pressable
            onPress={escolherFoto}
            style={styles.BotaoFoto}
            title="Escolher foto"
          >
            <Text style={styles.textoBotao}>Escolher foto</Text>
          </Pressable>

          {foto && (
            <View style={styles.campoBusca}>
              <Image
                source={{ uri: foto }}
                style={{ width: "100%", height: 300 }}
              />
              <View style={styles.tituloFoto}>
                <Text>Digite o título da foto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Título da foto"
                  onChangeText={(text) => setTitulo(text)}
                />
                <View style={styles.botoes}>
                  <Pressable style={styles.botaoExcluir} title="excluir">
                    <Text style={styles.textoBotao}>🗑 Excluir</Text>
                  </Pressable>

                  <Pressable
                    style={styles.botaoSalvar}
                    title="salvar"
                    onPress={salvarFoto}
                  >
                    <Text style={styles.textoBotao}>💾 Salvar</Text>
                  </Pressable>
                </View>
              </View>

              {/* {botaoLocalizacao && (
                <View style={styles.campoMapa}>
                  <MapView
                    style={styles.mapa}
                    mapType="standard"
                    region={localizacao ?? regiaoInicialMapa}
                  >
                    {localizacao && <Marker coordinate={localizacao} />}
                  </MapView>
                </View>
              )}

              <Button title="localização" onPress={marcarLocal} /> */}
              <GeoLocalizacao />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    gap: 25,
  },

  campoBusca: {
    width: "100%",
    flex: 0.8,
  },

  tituloFoto: {
    marginVertical: 15,
    flex: 1,
    textAlign: "center",
  },

  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },

  botoes: {
    marginVertical: 15,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },

  BotaoFoto: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    marginVertical: 20,
  },

  botaoExcluir: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  botaoSalvar: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
