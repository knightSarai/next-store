# Generated by Django 3.2.6 on 2021-09-01 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=0, null=0, verbose_name='Product Quantity'),
        ),
    ]
