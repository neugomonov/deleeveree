import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

const CustomersScreen = () => {
  const tailwind = useTailwind();
  return (
    <View>
      <Text style={tailwind("text-blue-500")}>CustomersScreen</Text>
    </View>
  );
};

export default CustomersScreen;
