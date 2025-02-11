import { View, Text, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import ThemedText from '../ThemedText'
import { Colors } from '@/constants/Colors'

type Props = ViewProps &{
  type: keyof typeof Colors.type
}
const PokemonType = ({ type, ...rest }: Props) => {
  const typeColor = Colors.type[type]
  return (
    <View style = {[{backgroundColor: typeColor}, typeContainer]} {...rest}>
      <ThemedText typo='subtitile3' color='grayWhite' style={{textTransform: 'capitalize'}}>{type}</ThemedText>
    </View>
  )
}

export default PokemonType

const typeContainer = {
	borderRadius: 10,
	paddingHorizontal: 7,
	paddingVertical: 2,
  alignSelf: 'center',
  height: 20
} satisfies ViewStyle;