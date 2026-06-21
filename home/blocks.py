from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock

class ButtonBlock(blocks.StructBlock):
    text = blocks.CharBlock(max_length=50)
    link_url = blocks.URLBlock(required=False)
    link_page = blocks.PageChooserBlock(required=False)

    class Meta:
        icon = "link"

class HeroBlock(blocks.StructBlock):
    title = blocks.CharBlock(max_length=100)
    subtitle = blocks.TextBlock(required=False)
    image = ImageChooserBlock(required=False)
    primary_button = ButtonBlock(required=False)
    secondary_button = ButtonBlock(required=False)

    class Meta:
        icon = "home"
        template = "home/blocks/hero_block.html"

class ServiceItemBlock(blocks.StructBlock):
    icon_name = blocks.ChoiceBlock(
        choices=[
            ("fa-stethoscope", "Stethoscope / Checkup"),
            ("fa-syringe", "Syringe / Vaccination"),
            ("fa-scissors", "Scissors / Grooming"),
            ("fa-shield-dog", "Dog Shield / Prevention"),
            ("fa-bone", "Bone / Nutrition"),
            ("fa-house-medical", "Medical House / Emergency"),
            ("fa-pills", "Pills / Pharmacy"),
            ("fa-heartpulse", "Heart / Surgery"),
        ],
        default="fa-stethoscope",
    )
    title = blocks.CharBlock(max_length=100)
    description = blocks.TextBlock()
    details_link = ButtonBlock(required=False)

    class Meta:
        icon = "pick"

class ServicesGridBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=100)
    subheading = blocks.TextBlock(required=False)
    services = blocks.ListBlock(ServiceItemBlock)

    class Meta:
        icon = "grid"
        template = "home/blocks/services_grid_block.html"

class TestimonialItemBlock(blocks.StructBlock):
    quote = blocks.TextBlock()
    client_name = blocks.CharBlock(max_length=100)
    pet_name = blocks.CharBlock(max_length=100)
    pet_type = blocks.ChoiceBlock(
        choices=[
            ("dog", "Dog"),
            ("cat", "Cat"),
            ("bird", "Bird"),
            ("other", "Other"),
        ],
        default="dog",
    )
    avatar = ImageChooserBlock(required=False)

    class Meta:
        icon = "user"

class TestimonialsBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=100)
    subheading = blocks.TextBlock(required=False)
    testimonials = blocks.ListBlock(TestimonialItemBlock)

    class Meta:
        icon = "openquote"
        template = "home/blocks/testimonials_block.html"

class StaffMemberBlock(blocks.StructBlock):
    name = blocks.CharBlock(max_length=100)
    role = blocks.CharBlock(max_length=100)
    photo = ImageChooserBlock()
    bio = blocks.TextBlock(required=False)

    class Meta:
        icon = "user"

class StaffListBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=100)
    subheading = blocks.TextBlock(required=False)
    members = blocks.ListBlock(StaffMemberBlock)

    class Meta:
        icon = "group"
        template = "home/blocks/staff_list_block.html"

class FaqItemBlock(blocks.StructBlock):
    question = blocks.CharBlock(max_length=200)
    answer = blocks.RichTextBlock()

    class Meta:
        icon = "help"

class FaqBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=100)
    subheading = blocks.TextBlock(required=False)
    items = blocks.ListBlock(FaqItemBlock)

    class Meta:
        icon = "help"
        template = "home/blocks/faq_block.html"

class FeatureSectionBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=100)
    text = blocks.RichTextBlock()
    image = ImageChooserBlock()
    image_alignment = blocks.ChoiceBlock(
        choices=[
            ("left", "Image on Left"),
            ("right", "Image on Right"),
        ],
        default="left",
    )
    button = ButtonBlock(required=False)

    class Meta:
        icon = "doc-full-inverse"
        template = "home/blocks/feature_section_block.html"

class PetClinicStreamBlock(blocks.StreamBlock):
    hero = HeroBlock()
    services_grid = ServicesGridBlock()
    testimonials = TestimonialsBlock()
    staff_list = StaffListBlock()
    faq = FaqBlock()
    feature_section = FeatureSectionBlock()

    class Meta:
        icon = "placeholder"
