# Generated by Django 4.2.13 on 2024-06-12 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vacSearch', '0002_customuser_dialogue_news_response_resume_vacancy_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dialogue',
            name='applicant',
        ),
        migrations.RemoveField(
            model_name='dialogue',
            name='recruiter',
        ),
        migrations.RemoveField(
            model_name='dialogue',
            name='vacancy',
        ),
        migrations.DeleteModel(
            name='News',
        ),
        migrations.RemoveField(
            model_name='response',
            name='user',
        ),
        migrations.RemoveField(
            model_name='response',
            name='vacancy',
        ),
        migrations.RemoveField(
            model_name='vacancy',
            name='recruiter',
        ),
        migrations.DeleteModel(
            name='Dialogue',
        ),
        migrations.DeleteModel(
            name='Response',
        ),
        migrations.DeleteModel(
            name='Vacancy',
        ),
    ]