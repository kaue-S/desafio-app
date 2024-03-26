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
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
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

  /* Geolocalização */

  /* State para monitorar dados da atulização atual do usuário inicialmente, nulo */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  //state para condicional caso o botão ver localização for pressionado
  const [botaoLocalizacao, setBotaoLocalizacao] = useState(false);

  //state para quando o botao salvar for acionado
  const [botaoSalvar, setBotaoSalvar] = useState(false);

  useEffect(() => {
    async function obterLocalizacao() {
      /* ACessando o status da requisição de permissão de uso dos recursos de geolocalização */
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Se o status não for liberado/permitido, então será dado um alerta notificando o usuário. */
      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o use do geolocalização");
        return;
      }

      /* Se o status estiver ok, obtemos os dados de localização */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  console.log(minhaLocalizacao);

  //este state tem a finalidade de determinar a posição no mapview junto com o Marker. Inicialmente é nulo pois o usuário ainda não acionou o botão da sua localização
  const [localizacao, setLocalizacao] = useState(null);

  //Coordenadaspara o MapView
  const regiaoInicialMapa = {
    //São Paulo
    latitude: -23.533773,
    longitude: -46.65529,

    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  //nessa função estamos pegando os dados da latitude e longitude dentro do usestate e alterando para a latitude/longitude de onde a pessoa clicar/selecionar no mapa
  const marcarLocal = (event) => {
    setLocalizacao({
      //obtendo novos valores a partir da geolocalização da posição do usuário
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
    });

    setBotaoLocalizacao(true);
  };

  /* Fim Geolocalização */

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
