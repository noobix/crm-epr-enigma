import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet } from "react-native";
import underconstraction from "../assets/images/pexels-fernando-arcos-211122.jpg";

const PageNotReady = () => {
  return (
    <SafeAreaView>
      <Image style={styles.preview} source={underconstraction} />
    </SafeAreaView>
  );
};
export default PageNotReady;

const styles = StyleSheet.create({
  preview: {
    width: 300,
    height: 450,
    alignSelf: "center",
  },
});
