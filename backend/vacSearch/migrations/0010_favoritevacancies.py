# Generated by Django 4.2.13 on 2024-06-12 15:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vacSearch', '0009_news'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavoriteVacancies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('vacancy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vacSearch.vacancy')),
            ],
            options={
                'unique_together': {('user', 'vacancy')},
            },
        ),
    ]
