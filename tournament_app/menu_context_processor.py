from django.conf import settings
from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.text import capfirst
from bisect import bisect_left

site = admin.site



def applist(request):
    app_icons = {
        'login': 'fa fa-edit',
        'match': 'fa fa-gamepad',
        'players': 'fa fa-users',
        'tournament': 'fa fa-trophy',
       
    }

    app_menu_label = {
       
    }
    app_dict = {}
    user = request.user
    # tutor_profile_flag=True
    # if request.user:
    #     if 'UserProfile.view_tutorprofile' in user.get_all_permissions():
    #         tutor_profile_flag=False
    # icon = 'fa fa-circle'

    for model, model_admin in site._registry.items():
        app_label = model._meta.app_label
        if model._meta.app_label == 'dashboard':
            app_label=model._meta.app_config.verbose_name_plural

        has_module_perms = user.has_module_perms(app_label)
        if (app_label in app_icons):
            icon = app_icons[app_label]
        else:
            icon = 'fa fa-circle'

        if (app_label in app_menu_label):
            label = app_menu_label[app_label]
        else:
            label = app_label.title()

        if has_module_perms:
            perms = model_admin.get_model_perms(request)

            if True in perms.values():

                model_dict = {
                    'name': capfirst(model._meta.verbose_name_plural),
                    'admin_url': mark_safe('/admin/%s/%s/' % (app_label, model.__name__.lower())),
                    'perms': perms
                }
                if app_label in app_dict:
                    app_dict[app_label]['models'].append(model_dict)
                else:
                    app_dict[app_label] = {
                        'name': label,
                        'icon': icon,
                        'app_url': app_label + '/',
                        'has_module_perms': has_module_perms,
                        'models': [model_dict],
                    }
   
    # app_list = app_dict.values()
    app_list = sorted(app_dict.values(), key=lambda x: x['name'].lower())
    return {'adm_app_list': app_list}
