class HeroManager {
    constructor() {
        this.heroSection = $(".hero-section");
        this.heroBg = $(".hero-bg");
        this.init();
    }

    init() {
        if (this.heroSection.length) {
            setTimeout(() => {
                this.heroSection.addClass("hero-fade-in");
                this.heroBg.addClass("zoom-effect");
            }, 100);
        }
    }
}
window.HeroManager = HeroManager;
