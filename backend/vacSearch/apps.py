from django.apps import AppConfig


class VacSearchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vacSearch'

    def ready(self):
        import vacSearch.signals
