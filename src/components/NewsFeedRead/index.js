import React from "react";
import { WebView } from "react-native-webview";

const ReadFeed = (props) => {
  return (
    <React.Fragment>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: props.route.params.read }}
        style={{ flex: 1, marginTop: 20 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </React.Fragment>
  );
};
export { ReadFeed };
