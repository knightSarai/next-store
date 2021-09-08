from rest_framework import generics, permissions, authentication
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class ProductView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class CategoriesListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class CategoryTreeView(GenericAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)

    def get(self, request, *args, **kwargs):
        root_nodes = self.get_queryset().get_cached_trees()

        data = [self.recursive_node_to_dict(n) for n in root_nodes]

        return Response(data)

    def recursive_node_to_dict(self, node):
        result = self.get_serializer(instance=node).data
        children = [self.recursive_node_to_dict(c) for c in node.get_children()]
        if children:
            result["children"] = children
        return result


class CategoryItemView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(category__slug=self.kwargs["slug"])


class CategoryView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
