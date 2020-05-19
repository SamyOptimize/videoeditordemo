import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Clipboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  VESDK,
  Configuration,
  SerializationExportType,
  VideoFormat,
} from "react-native-videoeditorsdk";
import * as ImageManipulator from "expo-image-manipulator";
import { Video } from "expo-av";
import { RNFFprobe } from "react-native-ffmpeg";

export default class App extends Component {
  state = { imageUri: "null", width: 0, height: 0 };
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
    console.log(result);
    let exportOption = {
      serialization: {
        enabled: true,
        exportType: SerializationExportType.OBJECT,
      },
      filename: "export",
    };
    let configuration: Configuration = {
      forceCrop: true,
      export: exportOption,
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
    // if (Platform.OS === "ios") {
    //   exportOption["filename"] = "export";
    //   configuration["export"] = exportOption;
    // } else {
    //   configuration["export"] = exportOption;
    // }

    if (result && !result.cancelled) {
      VESDK.openEditor({ uri: result.uri }, configuration)
        .then(async (editedImage) => {
          console.log(editedImage);
          let newResult = await RNFFprobe.getMediaInformation(
            editedImage.hasChanges
              ? editedImage.video
                ? editedImage.video
                : editedImage.image
              : result.uri
          );
          newResult = {
            width: newResult.streams[Platform.OS === "android" ? 1 : 0].width,
            height: newResult.streams[Platform.OS === "android" ? 1 : 0].height,
          };
          this.setState({
            imageUri: editedImage.video,
            width: newResult.width,
            height: newResult.height,
          });
        })
        .catch((err) => {
          console.log(err);

          // Alert.alert("Error", JSON.stringify(err));
          Clipboard.setString(JSON.stringify(err));
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Video source={{ uri: this.state.imageUri }} style={styles.image} />
        <Button title="Choose Video" onPress={this.editImage} />
        <Text>{`width:${this.state.width}-height:${this.state.height}`}</Text>
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
