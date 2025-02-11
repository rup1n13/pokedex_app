import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { getPkemonId } from "@/functions/pokemon";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typo } from "@/constants/Typo";
import { SearchBar } from "@/components/SearchBar";
import SortButton from "@/components/sortButton";
import { RootView } from "@/components/RootView";

export default function Index() {
	const [ search, setSearch ] = React.useState<string>('')
	const [ sortKey, setSortKey ] = React.useState<'id' | 'name'>('id')
	
	const colors = useThemeColors()
	const typo = Typo 

	const { data , isFetching, fetchNextPage} = useInfiniteFetchQuery("/pokemon?Limit=21")
	const pokemons = data?.pages.flatMap(page => page.results.map(r=> ({name: r.name, id : getPkemonId(r.url)}))) ?? []

	const filteredPokemons =  [...search ? pokemons.filter(p => p.name.includes(search.toLowerCase())|| p.id.toString() === search) : pokemons].sort((a, b) => a[ sortKey ] > b[ sortKey ] ? 1 : -1)


	return (

		<RootView>
			<StatusBar style='light' />

			<View style={styles.header}>
				<Row gap={16}>
					<Image source={require('@/assets/images/Pokeball.png')} width={24} height={24} />
					<ThemedText typo='headline' color='grayWhite'>
						Pokedex
					</ThemedText>
				</Row>

				<Row gap={16}>
					<SearchBar value={search} onchange={setSearch} />
					<SortButton value={sortKey} onChange={setSortKey} />
				</Row>
			</View>

			<Card style={styles.body}>
				<FlatList
					data={filteredPokemons}
					numColumns={3}
					columnWrapperStyle={{ gap: 8 }}
					contentContainerStyle={{ gap: 8 }}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={isFetching ? <ActivityIndicator color={colors.primary} /> : null}
					onEndReached={ () => fetchNextPage()}
					renderItem={({ item }) => (
						<PokemonCard style={{ flex: 1 / 3 }} id={item.id} name={item.name} />
					)}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Card>
		</RootView>
	);
}

const styles = StyleSheet.create({
	header: {
		padding: 12,
		paddingBottom: 24,
		gap: 8
	},
	body: {
		flex: 1,
		paddingHorizontal: 12,
		paddingTop: 24,
		paddingBottom: 4
	},
	
	
});
