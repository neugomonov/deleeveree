import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import DeliveryCard from "../components/DeliveryCard";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();
  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <View style={{ backgroundColor: "#1f2032" }}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tailwind("absolute right-5 top-5 z-10")}
      >
        <Icon name="closecircle" type="antdesign" color="#fff" />
      </TouchableOpacity>
      <View style={{ marginTop: 10, backgroundColor: "#1f2032" }}>
        <View style={[tailwind("py-5 border-b"), { borderColor: "#fff" }]}>
          <Text
            style={[
              tailwind("text-center text-xl font-bold"),
              { color: "#fff" },
            ]}
          >
            {name}
          </Text>
          <Text style={[tailwind("text-center"), { color: "#fff" }]}>
            deliveries
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
