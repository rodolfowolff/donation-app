import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  variant?: "card" | "circle";
  borderRadius?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 40,
  color = "gray",
  variant = "card",
  borderRadius = 0,
  marginLeft = 16,
  marginRight = 16,
  marginTop = 0,
  marginBottom = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  if (variant === "circle") {
    borderRadius =
      typeof height === "number" ? height / 2 : parseInt(height, 10) / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: 400,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: borderRadius,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    />
  );
};
