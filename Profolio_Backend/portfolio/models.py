from django.db import models
import uuid
from django.core.validators import FileExtensionValidator


class PortfolioSettings(models.Model):
    whatsapp_number = models.CharField(max_length=20)

    cv_file = models.FileField(
        upload_to='documents/',
        validators=[FileExtensionValidator(['pdf'])],
        blank=True,
        null=True
    )

    notification_email = models.EmailField()

    def __str__(self):
        return "Portfolio Settings"





class SkillSection(models.Model):
    badge_text = models.CharField(max_length=50, default="My Skills")
    title = models.CharField(max_length=100, default="Tools I use to")
    title_highlight = models.CharField(max_length=100, default="build the web")
    description = models.TextField(default="A modern stack tuned for performance, scale, and beautiful user experiences.")

    def __str__(self):
        return "Skill Section Config"


class SkillCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50, help_text="e.g., Frontend, Backend")
    icon_name = models.CharField(max_length=30, help_text="e.g., Code, Server, Database, Wrench")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Skill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=50)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.category.title} - {self.name}"

class ProjectSection(models.Model):
    badge_text = models.CharField(max_length=50, default="Recent Work")
    title = models.CharField(max_length=100, default="Featured")
    title_highlight = models.CharField(max_length=100, default="projects")
    description = models.TextField(default="A selection of products I've designed and built for clients across the globe.")

    def __str__(self):
        return "Project Section Config"

class Project(models.Model):
    project_section = models.ForeignKey(ProjectSection, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/', blank=True, null=True, help_text="Upload project screenshot")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or provide an image URL if you don't want to upload")
    tech_stack = models.CharField(max_length=500, help_text="Comma-separated technologies (e.g., React, Node.js, MongoDB)")
    live_url = models.URLField(blank=True, help_text="URL to live demo")
    github_url = models.URLField(blank=True, help_text="URL to github repo")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class NavbarConfig(models.Model):
    logo_text = models.CharField(max_length=50, default="Abdullah")
    button_text = models.CharField(max_length=50, default="Hire Me")
    button_link = models.CharField(max_length=100, default="#contact")

    def __str__(self):
        return "Navbar Configuration"


class NavbarLink(models.Model):
    navbar = models.ForeignKey(NavbarConfig, on_delete=models.CASCADE, related_name='links', null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    label = models.CharField(max_length=50)
    href = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class HeroSection(models.Model):
    badge_text = models.CharField(max_length=50, default="Available for work")
    greeting = models.CharField(max_length=50, default="Hi, I'm")
    name = models.CharField(max_length=50, default="Abdullah")
    typing_phrases = models.TextField(default="Full Stack Developer, React Specialist, API Architect, Problem Solver", help_text="Comma-separated phrases for the typing animation")
    description = models.TextField(default="I craft fast, beautiful, and scalable web applications with 1+ year of hands-on experience building modern digital products that help businesses grow.")
    primary_btn_text = models.CharField(max_length=30, default="Hire Me")
    secondary_btn_text = models.CharField(max_length=30, default="View Portfolio")
    status_badge = models.CharField(max_length=30, default="Open to work")
    stats_number = models.CharField(max_length=10, default="15+")
    stats_text = models.CharField(max_length=30, default="Projects")
    profile_image = models.ImageField(upload_to='hero_images/', blank=True, null=True, help_text="Upload a profile picture to replace the default one")

    def __str__(self):
        return "Hero Section Config"

class HeroSocialLink(models.Model):
    hero_section = models.ForeignKey(HeroSection, on_delete=models.CASCADE, related_name='social_links')
    name = models.CharField(max_length=30, help_text="e.g., Github, Linkedin, Twitter, Instagram")
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class FooterSection(models.Model):
    name = models.CharField(max_length=50, default="Abdullah")
    description = models.TextField(default="Full Stack Developer crafting modern, scalable web experiences for clients worldwide.")
    copyright_text = models.CharField(max_length=100, default="© 2026 Abdullah. All rights reserved.")

    def __str__(self):
        return "Footer Section Config"

class FooterSocialLink(models.Model):
    footer_section = models.ForeignKey(FooterSection, on_delete=models.CASCADE, related_name='social_links')
    name = models.CharField(max_length=30, help_text="e.g., Github, Linkedin, Twitter, Instagram")
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class AboutSection(models.Model):
    badge_text = models.CharField(max_length=50, default="About Me")
    title = models.CharField(max_length=100, default="Building digital experiences that")
    title_highlight = models.CharField(max_length=100, default="drive results")
    description_1 = models.TextField(default="I'm Abdullah, a passionate Full Stack Developer with over a year of hands-on experience crafting modern web applications. I specialize in turning complex problems into clean, scalable code and intuitive user experiences.")
    description_2 = models.TextField(default="From sleek landing pages to full-scale web apps with secure authentication and APIs, I help businesses around the world ship products that look great and perform even better.")
    profile_image = models.ImageField(upload_to='about_images/', blank=True, null=True, help_text="Upload a profile picture for the About section")

    def __str__(self):
        return "About Section Config"

class AboutStat(models.Model):
    about_section = models.ForeignKey(AboutSection, on_delete=models.CASCADE, related_name='stats')
    icon_name = models.CharField(max_length=30, help_text="e.g., Code2, Rocket, Lightbulb")
    label = models.CharField(max_length=30, help_text="e.g., Clean Code")
    value = models.CharField(max_length=30, help_text="e.g., 100%")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class ContactSection(models.Model):
    badge_text = models.CharField(max_length=50, default="Get In Touch")
    title = models.CharField(max_length=100, default="Let's")
    title_highlight = models.CharField(max_length=100, default="work together")
    description = models.TextField(default="Have a project in mind? Send a message and I'll respond within 24 hours.")

    def __str__(self):
        return "Contact Section Config"
