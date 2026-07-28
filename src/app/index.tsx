import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface Class {
  id: string;
  name: string;
  secondary: string;
  number: string;
}

export default function Index() {
  const [classes, setClasses] = useState<Class[]>([]);

  const retrieveAndGetData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Classes');
      setClasses(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log("error getting information", e);
      setClasses([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      retrieveAndGetData();
    }, [retrieveAndGetData])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Index',
        headerRight: () => (
          <Pressable style={{ shadowColor: 'white' }} onPress={() => router.push('/itemAdd')}>
            <Text style={{ fontSize: 30 }}>+</Text>
          </Pressable>),
      }} />

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No classes yet. Add one below.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardBody}>{item.secondary}</Text>
            <Text style={styles.cardBody}>{item.number}</Text>
          </View>
        )}
      />

      <Link href="/itemAdd" style={{ marginTop: 20, color: 'blue' }}>
        <Text>Add One</Text>
      </Link>

      <Pressable onPress={() => { console.log(classes) }}>
        <Text>DEV</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: 16, flexGrow: 1 },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
  },
  cardTitle: { fontSize: 22, fontWeight: '600' },
  cardBody: { fontSize: 16, marginTop: 2 },
  separator: { height: 12 },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 40 },
  button: {
    alignSelf: 'center',
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 24,
    width: '80%',
  },
  buttonText: { fontSize: 25, color: 'white', alignSelf: 'center' },
});