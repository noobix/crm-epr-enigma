import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NewsFeed = (props) => {
  const [rssfeed, setrssfeed] = useState(null);
  const [feedname, setfeedname] = useState(null);
  useEffect(() => {
    getnewsfeed();
  }, []);
  useEffect(() => {
    console.log(rssfeed);
  }, [rssfeed]);

  async function getnewsfeed() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.responseText);
        setfeedname(response.feed.title);
        console.log(response);
        Object.entries(response).map(({ items: { title, thumbnail } }) =>
          console.log(title)
        );
        //   setrssfeed((rssfeed) => [
        //       ...rssfeed,
        //     {
        //       title: items.title,
        //       image: items.thumbnail,
        //     },
        //   ]);
      }
    };
    request.open(
      "GET",
      "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2FLatestGeneralNews",
      true
    );
    request.send();
  }
  const renderfeed = (title, image) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: "rgb(109, 123, 175)",
        flexDirection: "row",
      }}
    >
      <Image source={{ uri: image }} style={{ height: 120, width: 120 }} />
      <Text>{title}</Text>
    </View>
  );
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.newsfeed}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              style={{ marginLeft: 16 }}
              size={30}
              color="rgb(255,255,255)"
            />
          </TouchableOpacity>
        </View>
        <Text style={{ marginLeft: 16, fontSize: 22, fontWeight: "500" }}>
          {feedname}
        </Text>
        <FlatList
          data={rssfeed}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item: { title, image } }) => renderfeed(title, image)}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
export { NewsFeed };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
  },
  newsfeed: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(109, 123, 175)",
    justifyContent: "flex-end",
  },
});
