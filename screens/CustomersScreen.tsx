import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

const CustomersScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <Text style={tailwind("text-red-500")}>CustomersScreen</Text>
    </SafeAreaView>
  );
};

export default CustomersScreen;
