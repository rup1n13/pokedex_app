import { useThemeColors } from "@/hooks/useThemeColors";
import { ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, interpolateColor, useAnimatedStyle, withTiming, ReduceMotion, Easing } from 'react-native-reanimated';
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { useEffect } from "react";

type Props = ViewProps & {
  backgroundColorStyle?: string;
}
export function RootView({ backgroundColorStyle, style, ...rest }: Props) {
  const colors = useThemeColors();
  
	const progress = useSharedValue(0);
	const animatedBackground = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				[colors.primary, backgroundColorStyle || colors.primary]
			)
		};
  }, [ backgroundColorStyle ]);
  
  useEffect(() => {
    if (backgroundColorStyle) {
      progress.value = 0
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System
      });
   }
  
  }, [backgroundColorStyle])

  if (! backgroundColorStyle) {
    return <SafeAreaView style={[container, { backgroundColor: colors.primary }, style]} {...rest} />;
  }

  return (
		<Animated.View style={[{ flex: 1 }, animatedBackground, style]}>
			<SafeAreaView style={container} {...rest} />
		</Animated.View>
	);
}

const container = {
  flex: 1,
  padding : 4
} satisfies ViewStyle