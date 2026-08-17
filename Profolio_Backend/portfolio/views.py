from django.conf import settings
from django.http import FileResponse, Http404
import os
from django.core.mail import EmailMultiAlternatives

from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import Skill, ContactMessage, PortfolioSettings, NavbarConfig, NavbarLink, HeroSection, FooterSection, AboutSection, SkillSection, ProjectSection, Project, ContactSection, ServiceSection
from .serializers import SkillSerializer, ContactSerializer, NavbarConfigSerializer, NavbarLinkSerializer, HeroSectionSerializer, FooterSectionSerializer, AboutSectionSerializer, SkillSectionSerializer, ProjectSectionSerializer, ContactSectionSerializer, ServiceSectionSerializer


def custom_response(success=True, data=None, error=None, status_code=status.HTTP_200_OK):
    return Response(
        {"success": success, "data": data} if success else {"success": False, "error": error},
        status=status_code
    )






class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_site_config(request):
    config = PortfolioSettings.objects.first()

    if not config:
        return custom_response(data={
            "whatsapp": "",
            "email": "",
            "cv_available": False
        })

    return custom_response(data={
        "whatsapp": config.whatsapp_number,
        "email": config.notification_email,
        "cv_available": bool(config.cv_file),
        "cv_download_url": "/api/download-cv/" if config.cv_file else None
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def download_cv(request):
    config = PortfolioSettings.objects.first()

    if not config or not config.cv_file:
        return custom_response(success=False, error="CV not found", status_code=404)

    try:
        file_path = config.cv_file.path
        if not os.path.exists(file_path):
            file_path = os.path.join(settings.BASE_DIR, 'media', config.cv_file.name)
            
        return FileResponse(
            open(file_path, 'rb'),
            as_attachment=True,
            filename="CV.pdf"
        )
    except Exception as e:
        print("CV Download Error:", e)
        return custom_response(success=False, error=f"Error opening CV: {str(e)} | Path: {file_path}", status_code=500)


import threading

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        msg = serializer.save()

        try:
            config = PortfolioSettings.objects.first()
            recipient = config.notification_email if config else settings.DEFAULT_FROM_EMAIL

            email_body = f"New message from your portfolio!\n\nName: {msg.name}\nEmail: {msg.email}\n\nMessage:\n{msg.message}"

            html_content = f"""
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white; padding: 24px; text-align: center;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Portfolio Inquiry 🚀</h2>
                </div>
                
                <div style="padding: 32px; background-color: #ffffff;">
                    <p style="font-size: 16px; color: #4b5563; margin-top: 0; margin-bottom: 24px;">Hi Abdullah, you have received a new message from your portfolio website.</p>
                    
                    <div style="background-color: #f8fafc; border-left: 4px solid #8b5cf6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                        <p style="margin: 0 0 12px 0; font-size: 15px;">
                            <span style="color: #6b7280; font-weight: 600; width: 60px; display: inline-block;">👤 Name:</span> 
                            <span style="color: #1f2937; font-weight: 500;">{msg.name}</span>
                        </p>
                        <p style="margin: 0; font-size: 15px;">
                            <span style="color: #6b7280; font-weight: 600; width: 60px; display: inline-block;">📧 Email:</span> 
                            <a href="mailto:{msg.email}" style="color: #6366f1; text-decoration: none; font-weight: 500;">{msg.email}</a>
                        </p>
                    </div>
                    
                    <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 12px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Message Details</h3>
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border: 1px solid #e5e7eb;">{msg.message}</div>
                </div>
                
                <div style="background-color: #f9fafb; text-align: center; padding: 16px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 13px; color: #9ca3af;">This email was sent automatically from your portfolio.</p>
                </div>
            </div>
            """

            import resend
            resend.api_key = os.environ.get("RESEND_API_KEY", "")
            if resend.api_key:
                params = {
                    "from": "Portfolio <onboarding@resend.dev>",
                    "to": [recipient],
                    "subject": f"Portfolio Message from {msg.name}",
                    "html": html_content,
                    "reply_to": msg.email
                }
                resend_res = resend.Emails.send(params)
                print("Resend Response:", resend_res)
            else:
                return custom_response(success=False, error="RESEND_API_KEY is missing", status_code=500)

        except Exception as e:
            return custom_response(success=False, error=f"Email failed: {str(e)}", status_code=500)

        return custom_response(data={"message": "Message sent"}, status_code=201)

    return custom_response(success=False, error=serializer.errors, status_code=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_navbar_links(request):
    config = NavbarConfig.objects.first()
    if not config:
        return custom_response(data=None)
    
    # Ensure Services link exists dynamically
    if not config.links.filter(label__iexact='Services').exists():
        from .models import NavbarLink
        NavbarLink.objects.create(navbar=config, label='Services', href='#services', order=3)
        
    serializer = NavbarConfigSerializer(config)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_hero_section(request):
    hero = HeroSection.objects.first()
    if not hero:
        return custom_response(data=None)
    serializer = HeroSectionSerializer(hero)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_footer_section(request):
    footer = FooterSection.objects.first()
    if not footer:
        return custom_response(data=None)
    serializer = FooterSectionSerializer(footer)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_about_section(request):
    about = AboutSection.objects.first()
    if not about:
        return custom_response(data=None)
    serializer = AboutSectionSerializer(about)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_skills_section(request):
    skills_sec = SkillSection.objects.first()
    if not skills_sec:
        return custom_response(data=None)
    serializer = SkillSectionSerializer(skills_sec)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_projects_section(request):
    projects_sec = ProjectSection.objects.first()
    if not projects_sec:
        return custom_response(data=None)
    serializer = ProjectSectionSerializer(projects_sec)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_contact_section(request):
    contact_sec = ContactSection.objects.first()
    if not contact_sec:
        return custom_response(data=None)
    serializer = ContactSectionSerializer(contact_sec)
    return custom_response(data=serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_services_section(request):
    services_sec = ServiceSection.objects.first()
    if not services_sec:
        # Lazy seed the database if it's empty (e.g. on Railway)
        services_sec = ServiceSection.objects.create(
            badge_text="My Services",
            title="What I",
            title_highlight="Offer",
            description="I offer a full range of web development services to help you build and grow your digital presence."
        )
        from .models import Service
        Service.objects.create(service_section=services_sec, title='Frontend Development', description='Building responsive and beautiful user interfaces with React and Tailwind CSS.', icon_name='Code', order=1)
        Service.objects.create(service_section=services_sec, title='Backend Development', description='Building scalable APIs and databases with Django and PostgreSQL.', icon_name='Database', order=2)
        Service.objects.create(service_section=services_sec, title='API Integration', description='Connecting third-party services and payment gateways to your application.', icon_name='Globe', order=3)
        
    serializer = ServiceSectionSerializer(services_sec)
    return custom_response(data=serializer.data)