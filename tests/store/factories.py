import factory
from django.contrib.auth.models import User

from store.models import Category, Product, ProductType

from faker import Faker

fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = fake.name()
    is_staff = True


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = 'Test Product category'
    slug = 'test-product-category'


class ProductTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductType

    name = 'Test Product Type'


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    product_type = factory.SubFactory(ProductTypeFactory)
    title = 'Test Product'
    category = factory.SubFactory(CategoryFactory)
    description = fake.text()
    slug = 'test-product'
    regular_price = '9.99'
    discount_price = '4.99'
