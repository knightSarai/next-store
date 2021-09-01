import pytest
from pytest_factoryboy import register

from tests.store.factories import ProductFactory, CategoryFactory, UserFactory

register(ProductFactory)
register(CategoryFactory)
register(UserFactory)


@pytest.fixture
def new_user(db, user_factory):
    user = user_factory.create()
    return user
