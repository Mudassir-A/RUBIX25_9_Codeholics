import json
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity


def load_products(file_path):
    """Load product data from JSON file."""
    with open(file_path, "r") as f:
        return json.load(f)


def extract_features(products):
    """Extract and normalize numerical features from products."""
    features = []
    for product in products:
        # Select numerical features for similarity calculation
        product_features = [
            float(product["price"]),
            float(product["carbonFootprint"]),
            float(product["recyclability"]),
            float(product["biodegradability"]),
            float(product["ecoScore"]),
        ]
        features.append(product_features)

    # Normalize features using Min-Max scaling
    scaler = MinMaxScaler()
    normalized_features = scaler.fit_transform(features)

    return normalized_features


def get_product_recommendations(product_id, products, n_recommendations=10):
    """Get product recommendations based on cosine similarity."""
    # Extract and normalize features
    features = extract_features(products)

    # Calculate cosine similarity matrix
    similarity_matrix = cosine_similarity(features)

    # Find the index of the target product
    product_index = None
    for i, product in enumerate(products):
        if product["_id"]["$oid"] == product_id:
            product_index = i
            break

    if product_index is None:
        raise ValueError("Product ID not found")

    # Get similarity scores for the target product
    product_similarities = similarity_matrix[product_index]

    # Get indices of most similar products (excluding the product itself)
    similar_indices = np.argsort(product_similarities)[::-1][1 : n_recommendations + 1]

    # Create list of recommended products
    recommendations = []
    for idx in similar_indices:
        recommendations.append(
            {
                "id": products[idx]["_id"]["$oid"],
                "name": products[idx]["name"],
                "category": products[idx]["category"],
                "similarity_score": float(product_similarities[idx]),
                "price": products[idx]["price"],
                "ecoScore": products[idx]["ecoScore"],
            }
        )

    return recommendations


def main():
    # Example usage
    try:
        # Load products from JSON file
        products = load_products("data/ecommerce.product_updated.json")

        # Example: Get recommendations for the first product
        product_id = products[0]["_id"]["$oid"]
        recommendations = get_product_recommendations(product_id, products)

        # Print recommendations
        print(f"Recommendations for product: {products[0]['name']}\n")
        for i, rec in enumerate(recommendations, 1):
            print(f"Recommendation {i}:")
            print(f"Name: {rec['name']}")
            print(f"Category: {rec['category']}")
            print(f"Similarity Score: {rec['similarity_score']:.2f}")
            print(f"Price: ${rec['price']}")
            print(f"Eco Score: {rec['ecoScore']}")
            print()

    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    main()
