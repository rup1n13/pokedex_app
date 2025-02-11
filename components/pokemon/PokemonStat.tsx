import { View, Text, ViewProps , StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import Row from '../Row'
import ThemedText from '../ThemedText'
import { useThemeColors } from '@/hooks/useThemeColors'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const statName: Record<string, string> = {
	hp: 'HP',
	attack: 'ATK',
	defense: 'DEF',
	'special-attack': 'SATK',
	'special-defense': 'SDEF',
	speed: 'SPD'
};
type Props =ViewProps & {
  name: string,
  value: number,
  color: string,
}
const PokemonStat = ({ style, name, value, color, ...rest }: Props) => {
  const colors = useThemeColors()
	const shortname = statName[ name ]
	
	const sharedvalue = useSharedValue(value);
	const barInnerAnimated = useAnimatedStyle(() => {
		return {
			flex: sharedvalue.value
		}
	});
	const barBackgroundAnimated = useAnimatedStyle(() => {
		return {
			flex : 255 - sharedvalue.value 
		}
	})

	useEffect(() => {
		sharedvalue.value = withSpring(value);
	}, [value])
	return (
		<Row style={[styles.root, style]} {...rest} gap={8}>
			<View style={[styles.name, { borderRightColor: colors.grayLight }]}>
				<ThemedText typo='subtitile3' style={{ color: color, alignSelf: 'flex-end' }}>
					{shortname}
				</ThemedText>
			</View>

			<ThemedText typo='body3' color='grayDark' style={{ paddingLeft: 8 }}>
				{value.toString().padStart(3, '0')}
			</ThemedText>

			<Row style={styles.bar}>
				<Animated.View style={[styles.inner, { backgroundColor: color }, barInnerAnimated]}/>
				<Animated.View style={[styles.background, {backgroundColor: color }, barBackgroundAnimated]}/>
			</Row>
		</Row>
	);
};

export default PokemonStat

const styles = StyleSheet.create({
  root: {
    
  },
	name: {
    width: 40,
		paddingRight: 8,
		borderRightWidth: 1
	},
	bar: {
		flex: 1,
    height: 4,
		borderRadius: 4,
		overflow: 'hidden'
	},
	inner: {
		height: 4,
		borderRadius: 4
	},
	background: {
		height: 4,
		borderRadius: 4,
		opacity: 0.2
	}
});