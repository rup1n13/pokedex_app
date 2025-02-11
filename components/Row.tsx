import { View, Text, ViewProps, ViewStyle } from 'react-native'
import React from 'react'

type Props = ViewProps & {
  gap?: number
};
const Row = ({style, gap, ...rest}:Props) => {
  return (
    <View style={[row, {gap: gap}, style]} {...rest}/>
  )
}

export default Row

const row = {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  } satisfies ViewStyle