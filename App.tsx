import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import RootNavigator from "./navigator/RootNavigator";
import utilities from "./tailwind.json";

const client = new ApolloClient({
  uri: "http://127.0.0.1:5001/api/plucking-scorpion",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - Type '{ children: Element; utilities: {}; }' is not assignable to type 'IntrinsicAttributes & Props'.  Property 'children' does not exist on type 'IntrinsicAttributes & Props'.ts(2322) [TailwindProvider is missing a type definition]
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
