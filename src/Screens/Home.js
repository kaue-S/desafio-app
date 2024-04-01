import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import Camera from "../Components/Camera";
import GeoLocalizacao from "../Components/GeoLocalizacao";

export default function Home() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.home}>
        <ScrollView>
          <Camera />
          <GeoLocalizacao />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  home: {
    padding: 16,
  },
});
