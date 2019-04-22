import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      swList: [],
      loading: true,
    }
  }
  async componentDidMount(){
    try {
      const starWarsApiCall = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const starWarsPeople = await starWarsApiCall.json();
      this.setState({
        swList: starWarsPeople.results,
        loading: false,
      })
    } catch(err) {
      console.log(err)
    }
  }

  renderItem(data) {
    return <View style={styles.listItem}>
            <Text style={styles.listItemText}>{data.item.name}</Text>
          </View>
  }
  render() {
    const { swList, loading } = this.state;
    if(loading){
      return <ActivityIndicator/>    
    }
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={swList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 30,
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
    alignSelf: 'stretch',
  },
  listItemText: {
    flex: 0,
  },
  list:{
    flexGrow: 1,
    justifyContent: 'center',
  }
});
