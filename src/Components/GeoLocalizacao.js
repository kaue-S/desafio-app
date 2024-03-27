import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

//geolocalização
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function GeoLocalizacao() {
  /* Geolocalização */

  /* State para monitorar dados da atulização atual do usuário inicialmente, nulo */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  //state para condicional caso o botão ver localização for pressionado

  const [botaoLocalizacao, setBotaoLocalizacao] = useState(false);

  

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

  return (
    <>
      {botaoLocalizacao && (
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

      <Button title="localização" onPress={marcarLocal} />
    </>
  );
}

const styles = StyleSheet.create({
  campoMapa: {
    marginVertical: 15,
    width: "100%",
    height: 200,
    flex: 1,
    borderWidth: 1,
  },

  mapa: {
    width: "100%",
    height: "100%",
  },
});
