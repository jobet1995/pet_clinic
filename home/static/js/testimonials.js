class TestimonialsManager {
    constructor(app) {
        this.app = app;
        this.filterButtons = $(".testimonial-filters button");
        this.testimonials = $(".testimonial-item");
        this.form = $("#clinicReviewForm");
        this.starBtns = $(".star-btn");
        this.currentRating = 5;
        this.grid = $(".testimonial-grid");
        this.init();
    }

    init() {
        this.filterButtons.on("click", (e) => {
            const btn = $(e.currentTarget);
            this.filterButtons.removeClass("active");
            btn.addClass("active");
            const filter = btn.data("filter");
            this.applyFilter(filter);
        });

        this.starBtns.on("click", (e) => {
            const star = $(e.currentTarget);
            const val = parseInt(star.data("val"));
            this.currentRating = val;
            this.updateStars(val);
        });

        this.form.on("submit", (e) => {
            e.preventDefault();
            this.submitReview();
        });
    }

    applyFilter(filter) {
        this.testimonials.each((_, el) => {
            const item = $(el);
            const type = item.data("pet-type");
            if (filter === "all" || type === filter) {
                item.removeClass("hide-item");
            } else {
                item.addClass("hide-item");
            }
        });
    }

    updateStars(val) {
        this.starBtns.each((_, el) => {
            const star = $(el);
            const starVal = parseInt(star.data("val"));
            if (starVal <= val) {
                star.removeClass("fa-regular").addClass("fa-solid");
            } else {
                star.removeClass("fa-solid").addClass("fa-regular");
            }
        });
    }

    async submitReview() {
        const name = $("#reviewName").val();
        const petName = $("#reviewPetName").val();
        const petType = $("#reviewPetType").val();
        const quote = $("#reviewQuote").val();

        const postData = {
            title: `Review by ${name}`,
            body: quote,
            userId: 1,
            meta: {
                clientName: name,
                petName: petName,
                petType: petType,
                rating: this.currentRating
            }
        };

        try {
            const response = await this.app.post("https://jsonplaceholder.typicode.com/posts", postData);
            this.app.showNotification("Thank you! Your review was submitted and will appear shortly.", "success");
            this.appendTestimonialToUi(name, petName, petType, quote);
            this.form[0].reset();
            this.updateStars(5);
            this.currentRating = 5;
        } catch (error) {
            this.app.showNotification("Could not submit review at this time. Please try again later.", "warning");
        }
    }

    appendTestimonialToUi(name, petName, petType, quote) {
        const displayType = petType.charAt(0).toUpperCase() + petType.slice(1);
        const cardHtml = `
            <div class="col-md-6 col-lg-4 testimonial-item new-review-item" data-pet-type="${petType}">
                <div class="card h-100 border-0 shadow-sm testimonial-card p-4 transition-all" style="border: 1px dashed #0d9488 !important;">
                    <div class="quote-icon text-teal-light mb-3">
                        <i class="fa-solid fa-quote-left fa-3x"></i>
                    </div>
                    <p class="text-muted fst-italic mb-4 flex-grow-1">"${quote}"</p>
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle avatar-placeholder bg-teal-light text-teal d-flex align-items-center justify-content-center fw-bold shadow-sm" style="width: 50px; height: 50px;">
                            ${name.charAt(0)}
                        </div>
                        <div>
                            <h4 class="h6 fw-bold mb-0 text-dark">${name}</h4>
                            <span class="text-muted small">Owner of ${petName} (${displayType})</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const newCard = $(cardHtml);
        this.grid.prepend(newCard);
        newCard.hide().fadeIn(800);
        this.testimonials = $(".testimonial-item");
        const activeFilter = this.filterButtons.filter(".active").data("filter");
        this.applyFilter(activeFilter);
    }
}
window.TestimonialsManager = TestimonialsManager;
