import pytest


@pytest.mark.django_db
class TestModel:
    def test_product_instance(self, product_factory):
        product = product_factory.create()
        print(product.description)
        assert True
