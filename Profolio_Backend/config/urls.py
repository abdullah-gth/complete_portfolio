from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def backend_home(request):
    html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio API Backend</title>
        <style>
            body { font-family: 'Segoe UI', system-ui, sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .container { background-color: #ffffff; padding: 48px 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); text-align: center; max-width: 450px; border-top: 6px solid #6366f1; }
            h1 { color: #1e293b; margin: 0 0 12px 0; font-size: 24px; }
            p { color: #64748b; line-height: 1.6; margin-bottom: 24px; font-size: 15px; }
            .status { background-color: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600; display: inline-flex; items-center; margin-bottom: 20px; }
            .status::before { content: ''; display: inline-block; width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%; margin-right: 8px; margin-top: 5px;}
            .btn { display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: all 0.2s; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2); }
            .btn:hover { background-color: #4f46e5; transform: translateY(-1px); box-shadow: 0 6px 8px rgba(99, 102, 241, 0.3); }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="status">Server is Running</div>
            <h1>Abdullah's Portfolio Backend</h1>
            <p>Welcome! The Django API Server is fully operational and securely accepting connections from your React frontend.</p>
            <a href="/api/" class="btn">View API Interface</a>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),
    path('', backend_home),
]

from django.urls import re_path
from django.views.static import serve

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]