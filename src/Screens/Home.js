import { SafeAreaView, View, Text, StatusBar, Pressable, StyleSheet, ScrollView } from "react-native";
import SafeContainer from "../Components/Container";
import Camera from "../Components/Camera";
import GeoLocalizacao from "../Components/GeoLocalizacao";
import { useEffect, useState } from "react";


export default function Home({minhaLocalizacao}) {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          <Camera minhaLocalizacao={minhaLocalizacao}/>
          <GeoLocalizacao />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({

  });