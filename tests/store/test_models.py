import pytest
from mixer.backend.django import mixer


@pytest.mark.django_db
class TestModel:
    def test_product_is_in_stock(self):
        product = mixer.blend(
            'store.Product',
            # product_type__name="knightType",
            # category__name="knightCategory",
            quantity=1
        )
        assert product.is_in_stock is True
