import { View, Text, Image, StyleSheet, Pressable, Modal, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import ThemedText from './ThemedText'
import Card from './Card'
import Row from './Row'
import { Radio } from './Radio'
import { Shadow } from '@/constants/Shadow'

type Props = {
  value: 'id' | 'name'
  onChange: (value: 'id' | 'name') => void
}
const sortButton = ({ value, onChange }: Props) => {

  const colors = useThemeColors()
  const buttonRef = useRef<View>(null)
  const [position, setPosition] = useState<null | {top: number, right: number}>(null);

  const [isModalVisible, setIsModalVisibility] = React.useState(false)
  const toogleModal = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get('window').width - x - width,
      })
      setIsModalVisibility(true)
     })
  }
  const onClose = () => {
    setIsModalVisibility(false)
  }

  const option = [
		{ label: 'Number', value: 'id' },
		{ label: 'Name', value: 'name' }
	]as const;


  return (
		<>
			<Pressable onPress={toogleModal}>
				<View ref={buttonRef} style={[styles.sortValue, { backgroundColor: colors.grayWhite }]}>
					<Image
						source={
							value === 'id'
								? require('@/assets/images/tag.png')
								: require('@/assets/images/alpha.png')
						}
						width={16}
						height={16}
					/>
				</View>
			</Pressable>

      <Modal
        animationType='fade'
        transparent visible={isModalVisible}
        onRequestClose={onClose}
      >
				<Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
					<View style={[styles.popup, { backgroundColor: colors.primary, ...position }]}>
						<ThemedText
							typo='subtitile2'
							color='grayWhite'
							style={{ paddingHorizontal: 20, paddingVertical: 16 }}
						>
							Sort by :
						</ThemedText>

						<Card style={{ paddingHorizontal: 20, paddingVertical: 16, gap: 16 }}>
							{option.map((o) => (
								<Pressable key={o.value} onPress={() => onChange(o.value)}>
									<Row gap={8}>
										<Radio checked={value === o.value} />
										<ThemedText typo='body3' color='grayDark'>
											{o.label}
										</ThemedText>
									</Row>
								</Pressable>
							))}
						</Card>
					</View>
				</Pressable>
			</Modal>
		</>
	);
}

export default sortButton

const styles = StyleSheet.create({
	sortValue: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
  popup: {
    padding: 4,
    position: 'absolute',
    width: 130,
    ...Shadow.dp2,
    borderRadius: 12,
  },
  
});