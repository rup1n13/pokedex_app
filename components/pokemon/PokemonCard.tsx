import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Image, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Card from '../Card';
import ThemedText from '../ThemedText';
import { router } from 'expo-router';
import { getPokemonArtWork } from '@/functions/pokemon';

type Props = {
	id: number;
	name: string;
	style?: ViewStyle;
};
const PokemonCard = ({ id, name, style }: Props) => {
	const colors = useThemeColors();
	return (
		<Pressable onPress={() => router.push(`/pokemon/${id}`)} style={style}>
			<Card style={[styles.card, style]}>
				<ThemedText typo='caption' color='grayMedium' style={styles.id}>
					#{id.toString().padStart(3, '0')}
				</ThemedText>
				<Image
					source={{
						uri: getPokemonArtWork(id),
					}}
					width={72}
					height={72}
				/>
				<ThemedText typo='body3' color='grayDark' style={{}}>
					{' '}
					{name}{' '}
				</ThemedText>
				<View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
			</Card>
		</Pressable>
	);
};

export default PokemonCard;

const styles = StyleSheet.create({
	card: {
    alignItems: 'center',
    position: 'relative',
	},
	id: {
		alignSelf: 'flex-end',
		paddingHorizontal: 8,
		paddingTop: 4
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    zIndex: -1,
    borderRadius: 8
    
  }
});
