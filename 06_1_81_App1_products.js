import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = "https://mobile-courses-api.onrender.com/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
    .then((response)=>{return response.json()})
    .then((data)=>{
      console.log(data);
      setProducts(data);
    })
    .catch((err)=>{
      console.log("ERR:",err);
      setError(err.message);
    })
    .finally(()=>{
      console.log("All good");
      setLoading(false);
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>

      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#1565c0" />
          <Text style={styles.message}>Loading Products...</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>Could not load Products: {error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          ListEmptyComponent={<Text>No products found.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.productId}>{item.productId}</Text>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  productId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  students: {
    fontSize: 16,
    color: "#444444",
  },
  message: {
    textAlign: "center",
    marginTop: 12,
  },
  error: {
    color: "#b00020",
    fontSize: 16,
  },
});