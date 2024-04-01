import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Camera from "./Camera";
import GeoLocalizacao from "./GeoLocalizacao";
import { ScrollView, View, StyleSheet } from "react-native";


export default function Container({localizacao}){
    
  
    return(
        <>
        <StatusBar />
            <View style={styles.container}>
                <ScrollView>
                    <Camera localizacao={localizacao}/>
                    <GeoLocalizacao />
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
  });