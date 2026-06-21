class FaqManager {
    constructor(app) {
        this.app = app;
        this.searchInput = $("#faqSearchInput");
        this.clearBtn = $(".btn-search-clear");
        this.faqItems = $(".faq-item");
        this.noResults = $("#faqNoResults");
        this.init();
    }

    init() {
        this.searchInput.on("input", () => {
            this.filterFaqs();
        });

        this.clearBtn.on("click", () => {
            this.searchInput.val("");
            this.filterFaqs();
        });
    }

    filterFaqs() {
        const query = this.searchInput.val().trim().toLowerCase();
        let visibleCount = 0;

        if (query) {
            this.clearBtn.removeClass("d-none");
        } else {
            this.clearBtn.addClass("d-none");
        }

        this.faqItems.each((_, el) => {
            const item = $(el);
            const question = item.data("question");
            if (question.includes(query)) {
                item.removeClass("hide-faq");
                visibleCount++;
            } else {
                item.addClass("hide-faq");
            }
        });

        if (visibleCount === 0 && this.faqItems.length > 0) {
            this.noResults.removeClass("d-none");
        } else {
            this.noResults.addClass("d-none");
        }
    }
}
window.FaqManager = FaqManager;
