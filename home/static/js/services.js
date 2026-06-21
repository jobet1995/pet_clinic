class ServicesManager {
    constructor(app) {
        this.app = app;
        this.detailButtons = $(".btn-service-details");
        this.modal = $("#serviceDetailsModal");
        this.modalTitle = $("#serviceDetailsModalLabel");
        this.modalContent = $("#serviceDetailsContent");
        this.modalIcon = $(".modal-service-icon i");
        this.init();
    }

    init() {
        this.detailButtons.on("click", (e) => {
            e.preventDefault();
            const btn = $(e.currentTarget);
            const title = btn.data("service-title");
            this.fetchDetails(title);
        });
    }

    async fetchDetails(title) {
        try {
            const data = await this.app.get("/static/data/services_details.json");
            const details = data[title] || {
                description: "Our dedicated team of professionals is committed to providing outstanding veterinary services for your beloved pets.",
                icon: "fa-stethoscope"
            };
            this.showModal(title, details);
        } catch (error) {
            this.showModal(title, {
                description: "We are currently unable to retrieve the service details. Please contact our pet clinic directly.",
                icon: "fa-stethoscope"
            });
        }
    }

    showModal(title, details) {
        this.modalTitle.text(title);
        this.modalContent.html(`<p class="lead mb-3">${details.description}</p><p>Our treatments leverage cutting-edge veterinary medicine, state-of-the-art tools, and a compassionate team to ensure your pet is relaxed, comfortable, and receiving optimal care.</p>`);
        this.modalIcon.attr("class", `fa-solid ${details.icon} fa-2x`);
        const bootstrapModal = new bootstrap.Modal(this.modal[0]);
        bootstrapModal.show();
    }
}
window.ServicesManager = ServicesManager;
