import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import CustomersScreen from "./screens/CustomersScreen";
import utilities from "./tailwind.json";

export default function App() {
  return (
    // @ts-ignore - Type '{ children: Element; utilities: {}; }' is not assignable to type 'IntrinsicAttributes & Props'.  Property 'children' does not exist on type 'IntrinsicAttributes & Props'.ts(2322) [TailwindProvider is missing a type definition]
    <TailwindProvider utilities={utilities}>
      <CustomersScreen />
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
