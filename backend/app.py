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
