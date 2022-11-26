import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import RootNavigator from "./navigator/RootNavigator";
import utilities from "./tailwind.json";

export default function App() {
  return (
    // @ts-ignore - Type '{ children: Element; utilities: {}; }' is not assignable to type 'IntrinsicAttributes & Props'.  Property 'children' does not exist on type 'IntrinsicAttributes & Props'.ts(2322) [TailwindProvider is missing a type definition]
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
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
