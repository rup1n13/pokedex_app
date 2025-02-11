import { useThemeColors } from "@/hooks/useThemeColors";
import { View, StyleSheet } from "react-native";

type Props = {
  checked: boolean;
}
export function Radio({ checked }: Props) {
  const colors = useThemeColors()
  return <View style={[ styles.circle, { borderColor: colors.primary } ]} >
    {checked && <View style={[ styles.innerCircle, { backgroundColor: colors.primary } ]} />}
  </View>
}

const styles = StyleSheet.create({
  circle: {
    width: 14,
    height: 14,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    width: 6,
    height: 6,
    borderRadius: 6,
  }
})