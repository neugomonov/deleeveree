import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import DeliveryCard from "../components/DeliveryCard";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#bebebe" /*😛*/,
      headerTitleStyle: { color: "#fff" },
      headerBackTitle: "Deliveries",
      headerStyle: { backgroundColor: "#1f2032" },
    });
    return () => {};
  }, [order]);
  return (
    <View style={{ backgroundColor: "#1f2032" }}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
