from pytest_factoryboy import register


from tests.store.factories import ProductFactory, CategoryFactory

register(ProductFactory)
register(CategoryFactory)

