import { View, Image, TextInput, StyleSheet } from "react-native";
import Row from "./Row";
import { Shadow } from "@/constants/Shadow";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value?: string;
  onchange?: (text: string) => void;
}
export function SearchBar({value, onchange}:Props) {
  const colors = useThemeColors()
  return (  
      <Row style={[{ gap: 8 }, styles.searchBar, { backgroundColor: colors.grayWhite }]}>
        <Image source={require('@/assets/images/search.png')} width={16} height={16} />
        <TextInput
          placeholder={"Search..."}
          style={{ flex: 1, fontSize: 14, paddingVertical:0 , height:16, color: colors.grayMedium }}
          value={value}
          onChangeText={onchange}
        />
      </Row>
    )
}

const styles = StyleSheet.create({
  searchBarContainer: {},
  searchBar: {
    flex: 1,
    alignItems: 'center',
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 8,
    height: 32,
		...Shadow.dp2
	}
});