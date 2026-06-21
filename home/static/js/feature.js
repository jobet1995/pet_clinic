class FeatureManager {
    constructor(app) {
        this.app = app;
        this.sections = $(".feature-section");
        this.init();
    }

    init() {
        if (!this.sections.length) return;

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass("visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            this.sections.each((_, el) => {
                observer.observe(el);
            });
        } else {
            this.sections.addClass("visible");
        }
    }
}
window.FeatureManager = FeatureManager;
