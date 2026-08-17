from rest_framework import serializers
from .models import PortfolioSettings, Skill, ContactMessage, NavbarConfig, NavbarLink, HeroSection, HeroSocialLink, FooterSection, FooterSocialLink, AboutSection, AboutStat, SkillSection, SkillCategory, ProjectSection, Project, ContactSection, PricingSection, PricingPackage


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'order']

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = ['id', 'title', 'icon_name', 'order', 'skills']

    def get_skills(self, obj):
        skills = obj.skills.all().order_by('order')
        return [skill.name for skill in skills]

class SkillSectionSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = SkillSection
        fields = "__all__"

    def get_categories(self, obj):
        categories = SkillCategory.objects.all().order_by('order')
        return SkillCategorySerializer(categories, many=True).data

class ProjectSerializer(serializers.ModelSerializer):
    stack = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'image_url', 'tech_stack', 'stack', 'live_url', 'github_url', 'order']

    def get_stack(self, obj):
        if not obj.tech_stack:
            return []
        return [t.strip() for t in obj.tech_stack.split(',')]

class ProjectSectionSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    class Meta:
        model = ProjectSection
        fields = "__all__"

    def get_projects(self, obj):
        projects = obj.projects.all().order_by('order')
        return ProjectSerializer(projects, many=True).data


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"

class ContactSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = "__all__"

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters")
        return value

class NavbarLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarLink
        fields = ['label', 'href', 'order']

class NavbarConfigSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField()
    class Meta:
        model = NavbarConfig
        fields = "__all__"
    def get_links(self, obj):
        links = obj.links.filter(is_active=True).order_by('order')
        return NavbarLinkSerializer(links, many=True).data

class HeroSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSocialLink
        fields = ['name', 'url', 'order']

class HeroSectionSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()
    class Meta:
        model = HeroSection
        fields = "__all__"
    def get_social_links(self, obj):
        links = obj.social_links.filter(is_active=True).order_by('order')
        return HeroSocialLinkSerializer(links, many=True).data

class FooterSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSocialLink
        fields = ['name', 'url', 'order']

class FooterSectionSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()
    class Meta:
        model = FooterSection
        fields = "__all__"
    def get_social_links(self, obj):
        links = obj.social_links.filter(is_active=True).order_by('order')
        return FooterSocialLinkSerializer(links, many=True).data

class AboutStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutStat
        fields = ['icon_name', 'label', 'value', 'order']

class AboutSectionSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()
    class Meta:
        model = AboutSection
        fields = "__all__"
    def get_stats(self, obj):
        stats = obj.stats.all().order_by('order')
        return AboutStatSerializer(stats, many=True).data

class PricingPackageSerializer(serializers.ModelSerializer):
    feature_list = serializers.SerializerMethodField()

    class Meta:
        model = PricingPackage
        fields = ['id', 'title', 'price', 'description', 'features', 'feature_list', 'highlighted', 'cta_text', 'order']

    def get_feature_list(self, obj):
        if not obj.features:
            return []
        return [f.strip() for f in obj.features.strip().split('\n') if f.strip()]

class PricingSectionSerializer(serializers.ModelSerializer):
    packages = serializers.SerializerMethodField()

    class Meta:
        model = PricingSection
        fields = "__all__"

    def get_packages(self, obj):
        packages = obj.packages.all().order_by('order')
        return PricingPackageSerializer(packages, many=True).data