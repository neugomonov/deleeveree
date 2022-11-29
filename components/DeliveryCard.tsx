import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
};

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

const DeliveryCard = ({ order }: Props) => {
  const tailwind = useTailwind();
  return (
    <Card
      containerStyle={[
        tailwind("my-2 rounded-lg border-0"),
        {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: 0,
          paddingTop: 16,
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" size={50} color="#fff" />
        <View>
          <Text style={tailwind("text-xs text-center uppercase text-white")}>
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tailwind("text-lg text-center text-white font-bold")}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={[
            tailwind("mx-auto my-5"),
            {
              borderStyle: "dotted",
              borderColor: "white",
              borderBottomWidth: 2,
              borderTopWidth: 2,
            },
          ]}
        >
          <Text style={tailwind("text-sm text-center text-white")}>
            Address
          </Text>
          <Text style={tailwind("text-sm italic text-center text-white")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tailwind("text-sm text-center text-white")}>
            💸 Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>
      <View style={tailwind("p-5")}>
        {order.trackingItems.items.map((item) => (
          <View
            style={[
              tailwind("flex-row justify-between items-center"),
              {
                borderStyle: "dotted",
                borderBottomColor: "white",
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text style={tailwind("text-sm italic text-white")}>
              {item.name}
            </Text>
            <Text style={tailwind("text-sm italic text-white")}>
              x{item.quantity}
            </Text>
          </View>
        ))}
      </View>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tailwind("w-full"), { height: 200 }]}
        customMapStyle={mapStyle}
      >
        {order.Lat && order.Lng ? (
          <Marker
            coordinate={{ latitude: order.Lat, longitude: order.Lng }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        ) : null}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
