from django.urls import path

from . import views

app_name = "store"

urlpatterns = [
    path('api/products/', views.ProductListView.as_view(), name="allproducts"),
    path('api/products/<slug:slug>', views.ProductView.as_view(), name="product"),
    path('api/categories/', views.CategoriesListView.as_view(), name="allcategories"),
    path('api/categories/tree', views.CategoryTreeView.as_view(), name="categoriestree"),
    path('api/categories/<slug:slug>', views.CategoryItemView.as_view(), name="categoryproducts"),
    path('api/category/<slug:slug>', views.CategoryView.as_view(), name="category"),

]
