import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card
        containerStyle={[
          tailwind("px-5 rounded-lg border-0"),
          { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        ]}
      >
        <View style={tailwind("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              color="#fff"
              type="material-community"
            />
            <Text style={[tailwind("font-bold text-white"), { fontSize: 10 }]}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={[tailwind(" text-gray-300"), { fontSize: 10 }]}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text style={tailwind("text-xl text-white")}>
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View style={tailwind("flex-row items-center")}>
            <Text style={tailwind("text-2xl text-white")}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon
              style={tailwind("ml-2")}
              name="box"
              type="feather"
              color="#fff"
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
