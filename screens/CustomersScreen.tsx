import { useQuery } from "@apollo/client";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Input } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import CustomerCard from "../components/CustomerCard";
import { GET_CUSTOMERS } from "../graphql/queries";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#1f2032" }}>
      <View style={tailwind("mb-16")}>
        <StatusBar animated={true} backgroundColor="#1f2032" />
        <Image
          source={require("../assets/customersScreenIllustration4.webp")}
          style={tailwind("w-full h-96")}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Input
          placeholder="Search by customer"
          value={input}
          onChangeText={setInput}
          containerStyle={tailwind("pt-5 pb-0 px-10")}
          style={tailwind("text-white")}
        />
        {data?.getCustomers
          .filter((customer: CustomerList) =>
            customer.value.name.toLowerCase().includes(input.toLowerCase())
          )
          .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          ))}
      </View>
    </ScrollView>
  );
};

export default CustomersScreen;
