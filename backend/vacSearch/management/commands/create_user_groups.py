from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Создание групп пользователей'

    def handle(self, *args, **kwargs):
        # Создание групп
        applicant_group, _ = Group.objects.get_or_create(name='Applicant')
        recruiter_group, _ = Group.objects.get_or_create(name='Recruiter')
        admin_group, _ = Group.objects.get_or_create(name='Administrator')

        # назначение разрешений группам (разрешения могут быть изменены под ваши нужды)
        applicant_permissions = Permission.objects.filter(
            codename__in=['add_applicant', 'change_applicant', 'view_applicant']
        )
        recruiter_permissions = Permission.objects.filter(
            codename__in=['add_recruiter', 'change_recruiter', 'view_recruiter']
        )
        admin_permissions = Permission.objects.filter(
            codename__in=['add_administrator', 'change_administrator', 'view_administrator']
        )

        applicant_group.permissions.set(applicant_permissions)
        recruiter_group.permissions.set(recruiter_permissions)
        admin_group.permissions.set(admin_permissions)

        self.stdout.write(self.style.SUCCESS('Группы пользователей успешно созданы и настроены!'))
