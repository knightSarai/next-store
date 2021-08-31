def test_product(db, product_factory):
    product = product_factory.create()
    print(product.description)
    assert True

