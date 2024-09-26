# Generated by Django 5.0.6 on 2024-07-13 10:05

import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Opportunities',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('role', models.CharField(default='default-role', max_length=255)),
                ('subrole', models.CharField(default='default-subrole', max_length=255)),
                ('project', models.CharField(default='default-project', max_length=255)),
                ('meetings_times', models.JSONField(default=list)),
                ('difficulty_level', models.IntegerField(default=0)),
                ('details', models.JSONField(default=dict)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_by', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'opportunities',
            },
        ),
    ]
