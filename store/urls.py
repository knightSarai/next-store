from django.urls import path

from . import views

app_name = "store"

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name="allproducts"),
    path('products/<slug:slug>', views.ProductView.as_view(), name="product"),
    path('categories/', views.CategoriesListView.as_view(), name="allcategories"),
    path('categories/tree', views.CategoryTreeView.as_view(), name="categoriestree"),
    path('categories/<slug:slug>', views.CategoryItemView.as_view(), name="categoryproducts"),
    path('category/<slug:slug>', views.CategoryView.as_view(), name="category"),

]
