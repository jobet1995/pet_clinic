from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from .blocks import PetClinicStreamBlock

class HomePage(Page):
    body = StreamField(PetClinicStreamBlock(), use_json_field=True, blank=True, null=True)

    content_panels = Page.content_panels + [
        FieldPanel("body"),
    ]
