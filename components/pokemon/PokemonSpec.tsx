import { View, Text, ImageProps, ViewProps, StyleSheet , Image, ImageSourcePropType} from 'react-native'
import React from 'react'
import Row from '../Row'
import ThemedText from '../ThemedText'
type Props =  ViewProps & {
  title?: string,
  description?: string,
  image?: ImageSourcePropType,
 }
const PokemonSpec = ({style, title, image, description, ...rest }: Props) => {
  return (
    <View style={[style ,styles.root]} {...rest}>
      <Row gap={8} style={styles.row}>
        {image && <Image source={image} width={16} height={16} />}
        <ThemedText>{title}</ThemedText>
      </Row>
      <ThemedText typo='caption' color='grayMedium' >{description}</ThemedText>
    </View>
  )
}

export default PokemonSpec

const styles = StyleSheet.create({
  root: {
    gap: 4,
    flex: 1,
    alignItems: 'center',
  },
  row: {
    paddingVertical: 8,
    height: 45,
  }
})