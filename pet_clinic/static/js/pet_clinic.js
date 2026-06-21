class ApiClient {
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = this.baseUrl + endpoint;
        const defaults = {
            url: url,
            method: "GET",
            dataType: "json",
            contentType: "application/json",
        };
        const settings = $.extend({}, defaults, options);
        if (settings.method !== "GET" && settings.data && typeof settings.data !== "string") {
            settings.data = JSON.stringify(settings.data);
        }

        console.log(`%c[API Request] ${settings.method} -> ${url}`, "color: #7f8c8d; font-weight: bold;");

        try {
            const response = await $.ajax(settings);
            console.log(`%c[API Response] Success -> ${url}`, "color: #2ecc71; font-weight: bold;", response);
            return response;
        } catch (error) {
            console.error(`[API Error] Failed -> ${url}`, {
                status: error.status,
                statusText: error.statusText,
                response: error.responseJSON || error.responseText
            });
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, $.extend({ method: "GET" }, options));
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, $.extend({ method: "POST", data: data }, options));
    }

    put(endpoint, data, options = {}) {
        return this.request(endpoint, $.extend({ method: "PUT", data: data }, options));
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, $.extend({ method: "DELETE" }, options));
    }
}

class PetClinicApp extends ApiClient {
    constructor() {
        super();
        this.init();
    }

    getCookie(name) {
        let val = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    val = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return val;
    }

    setupCsrf() {
        const token = this.getCookie("csrftoken");
        $.ajaxSetup({
            beforeSend: (xhr, settings) => {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    if (token) {
                        xhr.setRequestHeader("X-CSRFToken", token);
                    }
                }
            }
        });
    }

    showNotification(message, type = "info") {
        const id = `toast-${Date.now()}`;
        const icon = type === "success" ? "fa-check-circle" : type === "warning" ? "fa-exclamation-triangle" : "fa-info-circle";
        const html = `
            <div id="${id}" class="alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3 shadow" style="z-index: 9999; min-width: 300px;" role="alert">
                <div class="d-flex align-items-center">
                    <i class="fas ${icon} fa-lg me-3"></i>
                    <div>${message}</div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $("body").append(html);
        setTimeout(() => {
            $(`#${id}`).alert("close");
        }, 5000);
    }

    async verifyConnection() {
        try {
            await this.get("https://jsonplaceholder.typicode.com/posts/1");
            this.showNotification("Application connected to network services.", "success");
        } catch (e) {
            this.showNotification("Network diagnostics detected connectivity warnings.", "warning");
        }
    }

    init() {
        this.setupCsrf();
        console.log("%c[System] PetClinic OOP Architecture Loaded.", "color: #9b59b6; font-weight: bold; font-size: 12px;");
        this.verifyConnection();
    }
}

const PetClinic = new PetClinicApp();
