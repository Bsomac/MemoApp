import { View, StyleSheet } from "react-native";
import { router, useNavigation } from "expo-router";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { useEffect } from "react";
import LogoutButton from "../../components/LogOutButton";

const handlePress = (): void => {
  router.push("memo/create");
};

const List = (): JSX.Element => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogoutButton />;
      },
    });
  });
  return (
    <View style={styles.container}>
      <View>
        <MemoListItem />
        <MemoListItem />
        <MemoListItem />
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={24} color="#ffffff" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default List;
