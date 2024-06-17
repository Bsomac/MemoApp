import { View, StyleSheet, FlatList } from "react-native";
import { router, useNavigation } from "expo-router";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import LogoutButton from "../../components/LogOutButton";
import { db, auth } from "../../config";
import { type Memo } from "../../../types/memo";

const handlePress = (): void => {
  router.push("memo/create");
};

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogoutButton />;
      },
    });
  }, []);
  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscibe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });
    return unsubscibe;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
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
