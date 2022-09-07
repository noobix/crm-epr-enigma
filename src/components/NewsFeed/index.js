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
import axios from "axios";

const NewsFeed = (props) => {
  const [rssfeed, setrssfeed] = useState(null);
  const [feedname, setfeedname] = useState(null);
  useEffect(() => {
    getnewsfeed()
      .then((res) => {
        if (res) {
          setrssfeed(res.data.items);
          // console.log(rssfeed);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  async function getnewsfeed() {
    try {
      return await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2FLatestGeneralNews"
      );
    } catch (error) {
      console.log(error);
    }
  }
  const RenderFeed = ({ title, image, read }) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("readnewsfeed", { read })}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "rgb(109, 123, 175)",
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "center",
        }}
      >
        <Image source={{ uri: image }} style={{ height: 120, width: 120 }} />
        <Text
          style={{
            fontSize: 20,
            flex: 1,
            marginLeft: 10,
            color: "rgb(109, 123, 175)",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
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
          renderItem={({ item: { title, thumbnail, link } }) => (
            <RenderFeed title={title} image={thumbnail} read={link} />
          )}
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
