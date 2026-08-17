from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    SkillViewSet,
    get_site_config,
    download_cv,
    submit_contact,
    get_navbar_links,
    get_hero_section,
    get_footer_section,
    get_about_section,
    get_skills_section,
    get_projects_section,
    get_contact_section,
    get_services_section
)

router = DefaultRouter()
router.register(r'skills', SkillViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('config/', get_site_config),
    path('navbar/', get_navbar_links),
    path('hero/', get_hero_section),
    path('about/', get_about_section),
    path('skills-config/', get_skills_section),
    path('projects-config/', get_projects_section),
    path('services-config/', get_services_section),
    path('contact-config/', get_contact_section),
    path('footer/', get_footer_section),
    path('download-cv/', download_cv),
    path('contact/', submit_contact),
]