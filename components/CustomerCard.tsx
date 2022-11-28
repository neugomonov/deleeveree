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
    <TouchableOpacity>
      <Card containerStyle={tailwind("p-5 rounded-lg text-purple-200")}>
        <View>
          <View>
            <Text>{name}</Text>
            <Text>ID: {userId}</Text>
          </View>
          <View>
            <Text>{loading ? "loading..." : `${orders.length} x`}</Text>
            <Icon
              style={tailwind("mb-5 ml-auto")}
              name="box"
              type="entypo"
              color="#1f2032"
              size={50}
            />
          </View>
        </View>
        <Card.Divider />
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
