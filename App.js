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
import Camera from "./src/Components/Camera";
import Container from "./src/Components/Container";

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
      <Container />
    </>
  );
}
