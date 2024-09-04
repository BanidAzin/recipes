import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

type ChatListHeaderProps = {
  isLoading: boolean;
};

export const ChatListHeader: React.FC<ChatListHeaderProps> = ({
  isLoading = false,
}) => {
  if (!isLoading) return;

  return (
    <View style={{ paddingVertical: 4, gap: 8 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <ShimmerPlaceholder
          key={index}
          shimmerStyle={{
            height: 15,
            borderRadius: 4,
            width: `${10 - 2 * index}0%`,
          }}
          LinearGradient={LinearGradient}
        />
      ))}
    </View>
  );
};
