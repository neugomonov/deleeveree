import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { CustomerScreenNavigationProp } from "../screens/CustomersScreen";

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", { name: name, userId: userId })
      }
    >
      <Card
        containerStyle={[
          tailwind("p-5 rounded-lg border-0"),
          { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        ]}
      >
        <View>
          <View style={tailwind("flex-row justify-between overflow-hidden")}>
            <View>
              <Text style={tailwind("text-2xl text-white font-bold")}>
                {name}
              </Text>
              <Text style={[tailwind("text-sm text-white"), { color: "#fff" }]}>
                ID: {userId}
              </Text>
            </View>
            <View style={tailwind("flex-row items-center justify-end")}>
              <Text style={tailwind("text-4xl font-bold text-white")}>
                {loading ? "loading..." : `${orders.length}x`}
              </Text>
              <Icon
                style={tailwind("mb-5 ml-auto")}
                name="box"
                type="entypo"
                color="#fff"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider color="#fff" />
        <Text style={tailwind("text-white")}>📧 {email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
