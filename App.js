import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { VESDK, Configuration } from "react-native-videoeditorsdk";
import * as ImageManipulator from "expo-image-manipulator";
import { Video } from "expo-av";

export default class App extends Component {
  state = { imageUri: "null" };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      base64: false,
      exif: false,
      quality: 0.8,
    });
    return result;
  };

  editImage = async () => {
    let result = await this.pickImage();
    let configuration: Configuration = {
      forceCrop: true,
      transform: {
        items: [{ width: 1, height: 1 }],
      },
      sticker: {
        personalStickers: true,
        categories: [
          { identifier: "imgly_sticker_category_emoticons" },
          { identifier: "imgly_sticker_category_shapes" },
          {
            identifier: "demo_sticker_category",
            name: "Logos",
            thumbnailURI: require("./assets/logo.png"),
            items: [
              {
                identifier: "demo_sticker_logo",
                name: "Optimize Logo",
                stickerURI: require("./assets/logo.png"),
              },
              {
                identifier: "demo_sticker_icon",
                name: "Optimize Icon",
                stickerURI: require("./assets/icon.png"),
              },
            ],
          },
        ],
      },
    };

    if (result && !result.cancelled) {
      VESDK.openEditor(result.uri, configuration).then(async (editedImage) => {
        console.log(editedImage);

        this.setState({
          imageUri: editedImage.video,
        });
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Video source={{ uri: this.state.imageUri }} style={styles.image} />
        <Button title="Choose image" onPress={this.editImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "50%",
    height: "50%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
