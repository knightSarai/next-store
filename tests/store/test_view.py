import json

import pytest

from store.serializers import ProductSerializer, CategorySerializer
from .factories import ProductFactory, ProductTypeFactory, CategoryFactory

pytestmark = pytest.mark.django_db


class TestProductEndPoint:
    endpoint = '/api/products/'

    def test_list(self, api_client):
        product = ProductFactory()
        product_two_type = ProductTypeFactory.create(name="Product Two Type")
        product_two_category = CategoryFactory.create(
            name="Product Two Category",
            slug="product-two-category"
        )
        product_two = ProductFactory.create(
            title="product two",
            product_type=product_two_type,
            category=product_two_category,
            slug="product-two"
        )

        response = api_client().get(
            self.endpoint
        )

        json_product = ProductSerializer(product).data
        json_product_two = ProductSerializer(product_two).data
        json_response = response.json()

        assert response.status_code == 200
        assert len(json_response) == 2
        assert json_response == [json_product_two, json_product]

    def test_retrieve(self, api_client):
        product = ProductFactory()

        response = api_client().get(
            f'{self.endpoint}{product.slug}'
        )

        json_response = response.json()

        assert response.status_code == 200
        assert json_response.get('title') == product.title


class TestCategoriesEndPoint:
    endpoint = '/api/categories/'

    def test_list(self, api_client):
        category = CategoryFactory()
        category_two = CategoryFactory.create(
            name="Product Two Category",
            slug="product-two-category"
        )

        json_category = CategorySerializer(category).data
        json_category_two = CategorySerializer(category_two).data

        response = api_client().get(
            self.endpoint
        )

        json_response = response.json()

        assert response.status_code == 200
        assert len(json_response) == 2
        assert json_response == [json_category_two, json_category]

    # def test_list_tree:
    #     pass

    def test_retrieve(self, api_client):
        category = CategoryFactory()

        response = api_client().get(
            f'/api/category/{category.slug}'
        )

        json_response = response.json()

        assert response.status_code == 200
        assert json_response.get('name') == category.name

    def test_category_product_list(self, api_client):
        product = ProductFactory()
        category = product.category

        response = api_client().get(
            f'{self.endpoint}{category.slug}'
        )

        json_product = ProductSerializer(product).data
        json_response = response.json()

        assert response.status_code == 200
        assert json_response == [json_product]




