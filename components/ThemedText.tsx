import { View, Text, TextProps } from 'react-native'
import React from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Colors } from '@/constants/Colors'
import { Typo } from '@/constants/Typo'

type Props = TextProps & {
  typo?: keyof typeof Typo,
  color?: keyof typeof Colors["light"],
}
const ThemedText = ({typo, color, style, ...rest }: Props) => {
  const colors = useThemeColors()
  return (
    <Text style= {[Typo[typo ?? 'body3'] ,{color: colors[color ?? 'grayDark']}, style]} {...rest} />
  )
}

export default ThemedText