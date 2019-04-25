import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      swList: [],
      page: 1,
      // limit: 0,
      // count: 0,
      loading: true,
      nextApiCall: 'https://swapi.co/api/people/',
    }
  } 
  async componentDidMount(){
    try {
      this.makeRemoteRequest();
    } catch(err) {
      console.log(err)
    }
  }
  async makeRemoteRequest(){
    const page = this.state.page;
    const starWarsApiCall = await fetch('https://swapi.co/api/people/?page=' + page);
    const starWarsJSON = await starWarsApiCall.json();
    if (this.state.nextApiCall != null){
      this.setState({
        swList: this.state.swList.concat(starWarsJSON.results),
        loading: false,
        nextApiCall: starWarsJSON.next,
        // limit: starWarsJSON.count,
      })
    }
    this.setState
  }
  handleLoadMore = () => {
    if(this.state.nextApiCall != null){
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.makeRemoteRequest()
      }
    )}
  }
  renderItem(data) {
    return <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listItemTextMain]}>{data.item.name}</Text>
            <Text style={styles.listItemText}>Birthplace: {data.item.birth_year}</Text>
            <Text style={styles.listItemText}>Height: {data.item.height} cm</Text>
            <Text style={styles.listItemText}>Mass: {data.item.mass} kg</Text>
          </View>
  }
  render() {
    const { swList, loading } = this.state;
    if(loading){
      return <Text>Now loading...</Text>    
    }
    return (
      <View style={styles.container}>
        <Text style={styles.displayText}>Star Wars Characters</Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={swList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1000}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 40,
  },
  listItem: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    alignSelf: 'stretch',
  },
  listItemText: {
    flex: 0,
    color: 'white',
  },
  listItemTextMain: {
    fontWeight: 'bold',
  },
  list:{
    flexGrow: 1,
    justifyContent: 'center',
  },
  displayText: {
    padding: 8,
    color: 'white',
    textAlign: 'center',
  }
});
