from django.urls import reverse, resolve
import pytest


@pytest.mark.django_db
class TestUrls:
    def test_product_url(self):
        path = reverse('store:product', kwargs={'slug': "product"})
        assert resolve(path).view_name == 'store:product'
