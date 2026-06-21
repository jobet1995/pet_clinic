class StaffManager {
    constructor(app) {
        this.app = app;
        this.bioButtons = $(".btn-view-bio");
        this.drawerElement = $("#staffBioDrawer");
        this.init();
    }

    init() {
        this.bioButtons.on("click", (e) => {
            const btn = $(e.currentTarget);
            const name = btn.data("name");
            const role = btn.data("role");
            const bio = btn.data("bio");
            this.openBio(name, role, bio);
        });
    }

    openBio(name, role, bio) {
        this.drawerElement.find(".drawer-staff-name").text(name);
        this.drawerElement.find(".drawer-staff-role").text(role);
        this.drawerElement.find(".drawer-staff-bio").text(bio);
        const placeholder = this.drawerElement.find(".drawer-avatar-placeholder");
        placeholder.text(name ? name.charAt(0) : "");
        const offcanvas = new bootstrap.Offcanvas(this.drawerElement[0]);
        offcanvas.show();
    }
}
window.StaffManager = StaffManager;
