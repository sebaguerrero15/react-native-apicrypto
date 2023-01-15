import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import CoinItem from "./components/CoinItem";

const App = () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  //Creando constante para consumir api mediante fetch
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data); //llenamos los datos del arreglo en esta constante
  };
  
  //Carga la api
  useEffect(() => {
    loadData()
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#141414'/>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Market</Text>
        <TextInput 
        style={styles.searchInput}
        placeholder="Buscar una Cripto"
        placeholderTextColor="#858585"
        onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList 
      style={styles.list}
      data={coins.filter((coin) => coin.name.includes(search) || coin.symbol.includes(search) )}   // recibe los datos de coins donde estan los datos (useState)
      renderItem={({item}) => {         //item es el elemento que recorre de la data
        return <CoinItem coin ={item}/>
      }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing} //valor del usestate
      onRefresh={async () => {
          setRefreshing(true)
          await loadData();
          setRefreshing(false)
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    marginTop: 20,
  },
  searchInput: {
    color: '#ffffff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
    
  }
})

export default App;
