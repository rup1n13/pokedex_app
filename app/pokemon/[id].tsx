import Card from '@/components/Card';
import PokemonSpec from '@/components/pokemon/PokemonSpec';
import PokemonStat from '@/components/pokemon/PokemonStat';
import PokemonType from '@/components/pokemon/PokemonType';
import { RootView } from '@/components/RootView';
import Row from '@/components/Row';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import {
	basePokemonStat,
	formatheight,
	formatWeight,
	getPokemonArtWork
} from '@/functions/pokemon';
import { useFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import PagerView from 'react-native-pager-view';

{/*export default function Pokemon() {
	const { id } = useLocalSearchParams() as { id: string };
	const [idInt, setIdInt] = useState(parseInt(id));
	const offset = useRef(1);
	const pager = useRef<PagerView>(null);

	const onPageSelected = (e: { nativeEvent: { position: number } }) => {
		offset.current = e.nativeEvent.position - 1;
	};

	const onPageScrollStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {
		if (e.nativeEvent.pageScrollState !== 'idle') {
			return;
		}
		if (offset.current === -1 && idInt === 2) {
			return;
		}
		if (e.nativeEvent.pageScrollState === 'idle' && offset.current !== 0) {
			setIdInt((prev) => prev + offset.current);
			offset.current = 0;
			setTimeout(() => {
				pager.current?.setPageWithoutAnimation(1);
			}, 50);
		}
	};

	return (
		<View style={styles.container}>
			<PagerView
				ref={pager}
				initialPage={1}
				style={styles.pagerView}
				onPageSelected={onPageSelected}
				onPageScrollStateChanged={onPageScrollStateChanged}
			>
				<PokemonView key={`${idInt}-prev`} id={(idInt - 1).toString()} />
				<PokemonView key={`${idInt}-current`} id={idInt.toString()} />
				<PokemonView key={`${idInt}-next`} id={(idInt + 1).toString()} />
			</PagerView>
		</View>
	);
}

type Props = {
	id: string,
	onPrevious: () => void,
	onNext: () => void,
};
*/}

export default function Pokemon() {
	const { id } = useLocalSearchParams() as { id: string };

	const colors = useThemeColors();
	const { data: pokemon } = useFetchQuery('/pokemon/[id]', { id });
	const { data: pokemonSpecies } = useFetchQuery('/pokemon-species/[id]', { id });

	const bio = pokemonSpecies?.flavor_text_entries
		.find((entry) => entry.language.name === 'en')
		?.flavor_text.replaceAll('\n', ' ');

	const mainType = pokemon?.types?.[0]?.type.name;
	const colorType = mainType ? Colors.type[mainType] : colors.primary;
	const stats = pokemon?.stats ?? basePokemonStat;

	const playPokemonSound = async () => {
		const cry = pokemon?.cries?.latest;
		if (!cry) return;
		const { sound } = await Audio.Sound.createAsync({ uri: cry }, { shouldPlay: true });
	};

	const nextPage = () => {
		const nextId = parseInt(id) + 1;
		router.push(`/pokemon/${nextId}`);
	};
	const previousPage = () => {
		const prevId = parseInt(id) - 1;
		router.push(`/pokemon/${prevId}`);
	};

	return (
		<RootView backgroundColorStyle={colorType}>
			<StatusBar style='light' />
			<View style={styles.content}>
				<Image
					style={styles.pokeball}
					source={require('@/assets/images/Pokeball_big.png')}
					width={206}
					height={208}
				/>

				<View style={styles.header}>
					<View>
						<Row gap={8} style={styles.headerRow}>
							<Row gap={8}>
								<Pressable onPress={() => router.push('/')}>
									<Image source={require('@/assets/images/back.png')} width={32} height={32} />
								</Pressable>
								<ThemedText typo='headline' color='grayWhite' style={styles.pokemonName}>
									{pokemon?.name}
								</ThemedText>
							</Row>
							<ThemedText typo='subtitile2' color='grayWhite'>
								#{id.padStart(3, '0')}
							</ThemedText>
						</Row>
					</View>
				</View>

				<Pressable onPress={playPokemonSound} style={styles.imageWrapper}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{ uri: getPokemonArtWork(id) }}
							width={200}
							height={200}
						/>
						<Row style={styles.navigationButtons}>
							{parseInt(id) > 1 ? (
								<Pressable onPress={previousPage}>
									<Image source={require('@/assets/images/prev.png')} width={24} height={24} />
								</Pressable>
							) : (
								<View style={styles.placeholder} />
							)}
							<Pressable onPress={nextPage}>
								<Image source={require('@/assets/images/next.png')} width={24} height={24} />
							</Pressable>
						</Row>
					</View>
				</Pressable>

				<Card style={styles.bodyCard}>
					<Row gap={16} style={styles.typeRow}>
						{pokemon?.types?.map((item) => (
							<PokemonType key={item.type.name} type={item.type.name} />
						))}
					</Row>

					<ThemedText typo='subtitile1' style={{ color: colorType }}>
						About
					</ThemedText>

					<Row>
						<PokemonSpec
							image={require('@/assets/images/weight.png')}
							title={formatWeight(pokemon?.weight ?? 0)}
							description='Weight'
							style={styles.specBorder}
						/>
						<PokemonSpec
							image={require('@/assets/images/height.png')}
							title={formatheight(pokemon?.height ?? 0)}
							description='Height'
							style={styles.specBorder}
						/>
						<PokemonSpec
							title={pokemon?.moves
								?.slice(0, 2)
								.map((m) => m.move.name)
								.join('\n')}
							description='Moves'
						/>
					</Row>

					<ThemedText typo='body3' color='grayDark'>
						{bio}
					</ThemedText>

					<ThemedText typo='subtitile1' style={{ color: colorType }}>
						Base Stats
					</ThemedText>

					<View style={styles.statsContainer}>
						{stats.map((items) => (
							<PokemonStat
								key={items.stat.name}
								name={items.stat.name}
								value={items.base_stat}
								color={colorType}
							/>
						))}
					</View>
				</Card>
			</View>
		</RootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	pagerView: {
		flex: 1
	},
	content: {
		flex: 1,
		position: 'relative'
	},
	header: {
		padding: 20,
		paddingBottom: 24,
		position: 'relative',
		zIndex: 2
	},
	headerRow: {
		justifyContent: 'space-between'
	},
	pokemonName: {
		textTransform: 'capitalize'
	},
	pokeball: {
		position: 'absolute',
		opacity: 0.1,
		top: 8,
		right: 8,
		zIndex: 1
	},
	imageWrapper: {
		zIndex: 1
	},
	imageContainer: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		height: 144,
		position: 'relative'
	},
	image: {
		alignSelf: 'center',
		position: 'absolute',
		top: 0
	},
	navigationButtons: {
		position: 'absolute',
		width: 'auto',
		justifyContent: 'space-between',
		bottom: 16,
		left: 20,
		right: 20
	},
	placeholder: {
		width: 24,
		height: 24
	},
	bodyCard: {
		padding: 20,
		paddingTop: 56,
		gap: 20,
		alignItems: 'center'
	},
	typeRow: {
		height: 20
	},
	specBorder: {
		borderStyle: 'solid',
		borderRightWidth: 1,
		borderRightColor: '#E0E0E0'
	},
	statsContainer: {
		alignSelf: 'stretch'
	}
});
