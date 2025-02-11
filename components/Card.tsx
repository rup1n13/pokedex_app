import { StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { Shadow } from '@/constants/Shadow'
import { useThemeColors } from '@/hooks/useThemeColors'

type Props = ViewProps
const Card = ({ style, ...rest }: Props) => {
  const colors = useThemeColors()
  return (
    <View style={[ style, styles, {backgroundColor: colors.grayWhite}]} {...rest}/>
  )
}

export default Card

const styles = {
  overflow: 'hidden',
  borderRadius: 8,
  ...Shadow.dp2 
} satisfies ViewStyle