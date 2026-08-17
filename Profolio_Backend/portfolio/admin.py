from django.contrib import admin
from .models import (
    ContactMessage, PortfolioSettings, NavbarConfig, NavbarLink, HeroSection, HeroSocialLink, FooterSection, FooterSocialLink, AboutSection, AboutStat, SkillSection, SkillCategory, Skill, ProjectSection, Project, ContactSection, PricingSection, PricingPackage
)

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order')
    inlines = [SkillInline]

@admin.register(SkillSection)
class SkillSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('badge_text', 'title', 'title_highlight')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    readonly_fields = ('created_at',)    

@admin.register(PortfolioSettings)
class PortfolioSettingsAdmin(admin.ModelAdmin):
    
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    fieldsets = (
        ('📞 Contact Links', {
            'fields': ('whatsapp_number',)
        }),
        ('📧 Email Settings', {
            'fields': ('notification_email',)
        }),
        ('📄 Documents', {
            'fields': ('cv_file',)
        }),
    )
    list_display = ('whatsapp_number', 'notification_email')

class NavbarLinkInline(admin.TabularInline):
    model = NavbarLink
    extra = 1

@admin.register(NavbarConfig)
class NavbarConfigAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('logo_text', 'button_text')
    inlines = [NavbarLinkInline]

class HeroSocialLinkInline(admin.TabularInline):
    model = HeroSocialLink
    extra = 1

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('name', 'badge_text', 'status_badge')
    inlines = [HeroSocialLinkInline]

class FooterSocialLinkInline(admin.TabularInline):
    model = FooterSocialLink
    extra = 1

@admin.register(FooterSection)
class FooterSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('name', 'copyright_text')
    inlines = [FooterSocialLinkInline]

class AboutStatInline(admin.TabularInline):
    model = AboutStat
    extra = 1

@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('badge_text', 'title', 'title_highlight')
    inlines = [AboutStatInline]

class ProjectInline(admin.StackedInline):
    model = Project
    extra = 1

@admin.register(ProjectSection)
class ProjectSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('badge_text', 'title', 'title_highlight')
    inlines = [ProjectInline]

@admin.register(ContactSection)
class ContactSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('badge_text', 'title', 'title_highlight')

class PricingPackageInline(admin.TabularInline):
    model = PricingPackage
    extra = 1

@admin.register(PricingSection)
class PricingSectionAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = ('badge_text', 'title', 'title_highlight')
    inlines = [PricingPackageInline]