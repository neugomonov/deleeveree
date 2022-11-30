import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import OrderCard from "../components/OrderCard";
import useOrders from "../hooks/useOrders";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "#1f2032" }}>
      <View style={tailwind("mb-16")}>
        <StatusBar animated={true} backgroundColor="#1f2032" />
        <Image
          source={require("../assets/customersScreenIllustration3.webp")}
          style={tailwind("w-full h-96")}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View>
          <View style={tailwind("py-2 px-5")}>
            <Button
              color="#e0a779"
              titleStyle={{ color: "#000", fontWeight: "400" }}
              onPress={() => setAscending(!ascending)}
            >
              {ascending
                ? "Showing: Oldest First"
                : "Showing: Most Recent First"}
            </Button>
          </View>
          {orders
            ?.sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
              }
            })
            .map((order) => (
              <OrderCard key={order.trackingId} item={order} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
