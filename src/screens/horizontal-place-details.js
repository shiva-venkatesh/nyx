
export default class HorizontalPlaceDetails extends Component {
  render() {
    return this.renderListOfPlaces();
  }
  renderListOfPlaces() {
    const cards = this.props.places.map((place) => {
      return(
        <TouchableOpacity
          onPress={() => this.setPlace(place)}
          key={place.restaurant.id}
          activeOpacity={1}
        >
          <FeedCard cardTitle={place.restaurant.name} cardPicture={place.restaurant.thumb} key={place.restaurant.id}/>
        </TouchableOpacity>
      )
    });
    return(
      <ScrollView contentContainerStyle={styles.bgContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.showCollections()}>
            <View style={styles.collectionHeadingContainer}>
              <Text style={styles.collectionText}>
                Explore curated collections of places in your city!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View contentContainerStyle={styles.bgInnerContainer}>
          <Text style={styles.feedCardsHeadingContainer}>
            <Text style={styles.feedCardsHeading}>
              Closest
            </Text>
            <Text style={styles.feedCardsText}>
              {' to you.'}
            </Text>
          </Text>
        </View>
        <ScrollView>
          {cards}
        </ScrollView>
      </ScrollView>
    );
  }
}
