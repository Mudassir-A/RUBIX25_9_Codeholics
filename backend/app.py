from fastapi import FastAPI, HTTPException
from src.recommend import load_products, get_product_recommendations

app = FastAPI()

# Load products data when the application starts
try:
    products = load_products("data/ecommerce.product_updated.json")
except Exception as e:
    print(f"Error loading products: {str(e)}")
    products = []


@app.get("/recommendations/{product_id}")
async def get_recommendations(product_id: str, limit: int = 10):
    """
    Get product recommendations based on product ID.

    Parameters:
    - product_id: The ID of the product to get recommendations for
    - limit: Number of recommendations to return (default: 10)
    """
    if not products:
        raise HTTPException(status_code=500, detail="Product data not loaded")

    try:
        recommendations = get_product_recommendations(
            product_id, products, n_recommendations=limit
        )
        return {"recommendations": recommendations}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/product/eco-metrics/{product_id}")
async def get_eco_metrics(product_id: str):
    """
    Get eco-related metrics for a specific product.

    Parameters:
    - product_id: The ID of the product to get eco metrics for
    """
    if not products:
        raise HTTPException(status_code=500, detail="Product data not loaded")

    try:
        # Find the product with the matching ID
        product = next((p for p in products if p["_id"]["$oid"] == product_id), None)

        if not product:
            raise HTTPException(
                status_code=404, detail=f"Product with ID {product_id} not found"
            )

        # Extract eco-related metrics
        eco_metrics = {
            "ecoScore": product["ecoScore"],
            "carbonFootprint": product["carbonFootprint"],
            "recyclability": product["recyclability"],
            "waterUsage": product["waterUsage"],
            "energyEfficiency": product["energyEfficiency"],
            "biodegradability": product["biodegradability"],
        }

        return eco_metrics

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
