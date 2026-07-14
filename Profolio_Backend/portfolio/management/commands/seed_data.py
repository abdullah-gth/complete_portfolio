from django.core.management.base import BaseCommand
from portfolio.models import Project, Service, Skill

class Command(BaseCommand):
    help = 'Seeds the database with initial portfolio data'

    def handle(self, *args, **options):
        projects_data = [
            {
                "title": "Analytics Dashboard",
                "description": "A comprehensive dashboard for visualizing business metrics and KPIs in real-time.",
                "image_url": "https://picsum.photos/seed/analytics/800/600.jpg",
                "tech_stack": ["React", "D3.js", "Python"],
                "github_url": "https://github.com/user/analytics",
                "live_url": "https://analytics-demo.com"
            },
            {
                "title": "E-commerce Website",
                "description": "Full-stack e-commerce platform with payment integration and inventory management.",
                "image_url": "https://picsum.photos/seed/ecommerce/800/600.jpg",
                "tech_stack": ["React", "Django", "Stripe"],
                "github_url": "https://github.com/user/ecommerce",
                "live_url": "https://shop-demo.com"
            },
            {
                "title": "LMS Platform",
                "description": "Learning Management System allowing instructors to upload courses and students to track progress.",
                "image_url": "https://picsum.photos/seed/lms/800/600.jpg",
                "tech_stack": ["Vue.js", "Django REST Framework", "PostgreSQL"],
                "github_url": "https://github.com/user/lms",
                "live_url": "https://lms-demo.com"
            },
            {
                "title": "FinTech App",
                "description": "Secure financial tracking application with budgeting tools and forecasting.",
                "image_url": "https://picsum.photos/seed/fintech/800/600.jpg",
                "tech_stack": ["React Native", "Node.js", "MongoDB"],
                "github_url": "https://github.com/user/fintech",
                "live_url": "https://fintech-demo.com"
            }
        ]

        for p in projects_data:
            Project.objects.get_or_create(title=p['title'], defaults=p)

        services_data = [
            {"title": "Web Development", "description": "Building responsive and performant web applications.", "icon": "fa-code"},
            {"title": "API Development", "description": "Designing scalable RESTful APIs for mobile and web.", "icon": "fa-server"},
            {"title": "UI/UX Integration", "description": "Translating design mockups into pixel-perfect interfaces.", "icon": "fa-paint-brush"}
        ]

        for s in services_data:
            Service.objects.get_or_create(title=s['title'], defaults=s)

        skills_data = [
            {"category": "Frontend", "name": "React"},
            {"category": "Backend", "name": "Django"},
            {"category": "Backend", "name": "Python"},
            {"category": "Frontend", "name": "JavaScript"},
            {"category": "Backend", "name": "REST APIs"}
        ]

        for s in skills_data:
            Skill.objects.get_or_create(name=s['name'], defaults=s)

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))