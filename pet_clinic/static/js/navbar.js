class NavbarController {
    constructor() {
        this.nav = $(".navbar-custom");
    }

    init() {
        if (!this.nav.length) return;

        this.setActiveLink();
        this.bindEvents();
    }

    bindEvents() {
        $(window).on("scroll", () => this.handleScroll());

        if (window.innerWidth < 992) {
            $(".navbar-custom .dropdown-toggle").on("click", function(e) {
                e.preventDefault();
                const parent = $(this).parent(".dropdown");
                parent.toggleClass("show");
            });
        }
    }

    setActiveLink() {
        const path = window.location.pathname;
        $(".navbar-custom .nav-link").removeClass("active");
        $(".navbar-custom .dropdown-item").removeClass("active");

        $(".navbar-custom .nav-link, .navbar-custom .dropdown-item").each(function() {
            const href = $(this).attr("href");
            if (href === path) {
                $(this).addClass("active");
                if ($(this).hasClass("dropdown-item")) {
                    $(this).closest(".dropdown").find(".dropdown-toggle").addClass("active");
                }
            }
        });
    }

    handleScroll() {
        const scrollTop = $(window).scrollTop();

        if (scrollTop > 50) {
            this.nav.addClass("navbar-scrolled");
        } else {
            this.nav.removeClass("navbar-scrolled");
        }
    }
}
