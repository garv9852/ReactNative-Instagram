import { View,StyleSheet,StatusBar } from "react-native";
import AuthNavigation from "./AuthNavigation";
export default function App() {
  return (
    <View style={styles.AndroidSafeArea}>
      <AuthNavigation/>
    </View>
  );
}

const styles=StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor:"black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
