from rest_framework import serializers

from .models import Product, Category, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "parent", "slug"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text", "is_feature"]


class ProductSerializer(serializers.ModelSerializer):
    product_image = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "regular_price", "product_image", "slug", "category"]





