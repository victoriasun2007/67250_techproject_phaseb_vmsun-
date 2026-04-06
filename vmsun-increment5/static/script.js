var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var greetingText = document.getElementById("greeting");

    if (greetingText) {
        if (x < 5 || x >= 20) {
            greetingText.innerHTML = "Good night, welcome to MonoMuse!";
        } else if (x < 12) {
            greetingText.innerHTML = "Good morning, welcome to MonoMuse!";
        } else if (x < 18) {
            greetingText.innerHTML = "Good afternoon, welcome to MonoMuse!";
        } else {
            greetingText.innerHTML = "Good evening, welcome to MonoMuse!";
        }
    }
}

greeting(hour);
console.log("script loaded");
console.log(hour);

function addYear() {
    var year = new Date().getFullYear();
    var yearText = document.getElementById("copyYear");

    if (yearText) {
        yearText.innerHTML = "© " + year + " MonoMuse. All rights reserved.";
    }
}

function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

ActiveNav();

function toggleNav() {
    var nav = document.querySelector(".nav_bar");
    if (nav.className === "nav_bar") {
        nav.className += " responsive";
    } else {
        nav.className = "nav_bar";
    }
}

if (window.jQuery) {
    $("#readMore").click(function () {
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });

    $("#readLess").click(function () {
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });
}

function updateSelectedTicketsList() {
    const ticketData = getTicketData();
    const selectedTicketsList = document.getElementById("selectedTicketsList");

    if (!selectedTicketsList) return;

    let ticketLines = [];

    if (ticketData.childQty > 0) {
        ticketLines.push(`<div class="summaryLine"><span>Child x${ticketData.childQty}</span><span>$${(ticketData.childQty * 5).toFixed(2)}</span></div>`);
    }

    if (ticketData.seniorQty > 0) {
        ticketLines.push(`<div class="summaryLine"><span>Senior x${ticketData.seniorQty}</span><span>$${(ticketData.seniorQty * 10).toFixed(2)}</span></div>`);
    }

    if (ticketData.studentQty > 0) {
        ticketLines.push(`<div class="summaryLine"><span>Student x${ticketData.studentQty}</span><span>$${(ticketData.studentQty * 15).toFixed(2)}</span></div>`);
    }

    if (ticketData.generalQty > 0) {
        ticketLines.push(`<div class="summaryLine"><span>General x${ticketData.generalQty}</span><span>$${(ticketData.generalQty * 25).toFixed(2)}</span></div>`);
    }

    if (ticketData.memberQty > 0) {
        ticketLines.push(`<div class="summaryLine"><span>Member x${ticketData.memberQty}</span><span>$0.00</span></div>`);
    }

    if (ticketLines.length === 0) {
        selectedTicketsList.innerHTML = `<p class="summaryMeta">No tickets selected yet.</p>`;
    } else {
        selectedTicketsList.innerHTML = ticketLines.join("");
    }
}

function showForm() {
    document.getElementById("ticketCheckout").style.display = "block";
}

function submitForm() {
    alert("Redirecting to payment system.");
}

function loadMap() {
    var mapElement = document.getElementById("map");

    // ONLY run this if the 'map' div actually exists on the page
    if (mapElement && typeof L !== "undefined") {
        var map = L.map("map").setView([40.4433, -79.9436], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }).addTo(map);
        L.marker([40.4433, -79.9436]).addTo(map).bindPopup("MonoMuse").openPopup();
    }
}

loadMap();


const form = document.getElementById("ticketForm");

function getTicketData() {
    const childQty = parseInt(document.getElementById("childQty")?.value) || 0;
    const seniorQty = parseInt(document.getElementById("seniorQty")?.value) || 0;
    const studentQty = parseInt(document.getElementById("studentQty")?.value) || 0;
    const generalQty = parseInt(document.getElementById("generalQty")?.value) || 0;
    const memberQty = parseInt(document.getElementById("memberQty")?.value) || 0;

    const total =
        (childQty * 5) +
        (seniorQty * 10) +
        (studentQty * 15) +
        (generalQty * 25) +
        (memberQty * 0);

    const totalTickets =
        childQty + seniorQty + studentQty + generalQty + memberQty;

    return {
        childQty,
        seniorQty,
        studentQty,
        generalQty,
        memberQty,
        total,
        totalTickets
    };
}

function updateTotalPrice() {
    const ticketData = getTicketData();

    const totalPriceText = document.getElementById("totalPrice");
    const finalTotalText = document.getElementById("finalTotal");

    if (totalPriceText) {
        totalPriceText.textContent = "$" + ticketData.total.toFixed(2);
    }

    if (finalTotalText) {
        finalTotalText.textContent = "$" + ticketData.total.toFixed(2);
    }

    updateSelectedTicketsList();
}

["childQty", "seniorQty", "studentQty", "generalQty", "memberQty"].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener("input", updateTotalPrice);
    }
});

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const visitDate = document.getElementById("visitDate").value.trim();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const formMessage = document.getElementById("formMessage");

        const ticketData = getTicketData();

        let errors = [];

        if (ticketData.totalTickets < 1) {
            errors.push("Please select at least one ticket.");
        }

        if (visitDate === "") {
            errors.push("Please select a visit date.");
        }

        if (name === "") {
            errors.push("Please enter your full name.");
        }

        if (email === "") {
            errors.push("Please enter your email address.");
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errors.push("Please enter a valid email address.");
            }
        }

        if (zip !== "") {
            const zipPattern = /^\d{5}$/;
            if (!zipPattern.test(zip)) {
                errors.push("Zip code must be exactly 5 digits.");
            }
        }

        if (errors.length > 0) {
            if (formMessage) {
                formMessage.innerHTML = errors.join("<br>");
            } else {
                alert(errors.join("\n"));
            }
            return;
        }
        

        sessionStorage.setItem("confirmName", name);
        sessionStorage.setItem("confirmEmail", email);
        sessionStorage.setItem("confirmDate", visitDate);

        sessionStorage.setItem("confirmChildQty", ticketData.childQty);
        sessionStorage.setItem("confirmSeniorQty", ticketData.seniorQty);
        sessionStorage.setItem("confirmStudentQty", ticketData.studentQty);
        sessionStorage.setItem("confirmGeneralQty", ticketData.generalQty);
        sessionStorage.setItem("confirmMemberQty", ticketData.memberQty);

        sessionStorage.setItem("confirmQuantity", ticketData.totalTickets);
        sessionStorage.setItem("confirmTotal", "$" + ticketData.total.toFixed(2));

        window.location.href = "confirmation.html";
    });

    updateTotalPrice();
}

function showDonationForm() {
    const donationForm = document.getElementById("donationForm");
    if (donationForm) {
        donationForm.style.display = "flex";
    }
}
const donationForm = document.getElementById("donationForm");

if (donationForm) {
    donationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const thanks = document.getElementById("thanks");

        donationForm.style.display = "none";

        if (thanks) {
            thanks.style.display = "flex";
        }
    });
}
function showMembershipForm() {
    const membershipForm = document.getElementById("membershipForm");
    const thankyou = document.getElementById("thankyou");

    if (membershipForm) {
        membershipForm.style.display = "flex";
    }

    if (thankyou) {
        thankyou.style.display = "none";
    }
}

const joinForm = document.getElementById("joinForm");

if (joinForm) {
    joinForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const membershipForm = document.getElementById("membershipForm");
        const thankyou = document.getElementById("thankyou");

        const memberType = document.getElementById("memberType").value.trim();
        const memberName = document.getElementById("memberName").value.trim();
        const memberEmail = document.getElementById("memberEmail").value.trim();

        if (memberType === "" || memberName === "" || memberEmail === "") {
            alert("Please fill out all membership fields.");
            return;
        }

        if (membershipForm) {
            membershipForm.style.display = "none";
        }

        if (thankyou) {
            thankyou.style.display = "flex";
        }
    });
}

function loadConfirmation() {
    const confirmName = document.getElementById("confirmName");

    if (confirmName) {
        document.getElementById("confirmName").textContent = sessionStorage.getItem("confirmName") || "";
        document.getElementById("confirmEmail").textContent = sessionStorage.getItem("confirmEmail") || "";
        document.getElementById("confirmDate").textContent = sessionStorage.getItem("confirmDate") || "";
        document.getElementById("confirmQuantity").textContent = sessionStorage.getItem("confirmQuantity") || "";
        document.getElementById("confirmTotal").textContent = sessionStorage.getItem("confirmTotal") || "";

        const childQty = parseInt(sessionStorage.getItem("confirmChildQty")) || 0;
        const seniorQty = parseInt(sessionStorage.getItem("confirmSeniorQty")) || 0;
        const studentQty = parseInt(sessionStorage.getItem("confirmStudentQty")) || 0;
        const generalQty = parseInt(sessionStorage.getItem("confirmGeneralQty")) || 0;
        const memberQty = parseInt(sessionStorage.getItem("confirmMemberQty")) || 0;

        const confirmTickets = document.getElementById("confirmTickets");

        let ticketLines = [];

        if (childQty > 0) {
            ticketLines.push("<p>Child x" + childQty + "</p>");
        }
        if (seniorQty > 0) {
            ticketLines.push("<p>Senior x" + seniorQty + "</p>");
        }
        if (studentQty > 0) {
            ticketLines.push("<p>Student x" + studentQty + "</p>");
        }
        if (generalQty > 0) {
            ticketLines.push("<p>General x" + generalQty + "</p>");
        }
        if (memberQty > 0) {
            ticketLines.push("<p>Member x" + memberQty + "</p>");
        }

        if (confirmTickets) {
            if (ticketLines.length > 0) {
                confirmTickets.innerHTML = ticketLines.join("");
            } else {
                confirmTickets.innerHTML = "<p>No tickets selected.</p>";
            }
        }
    }
}



loadConfirmation();

const images = [
    "./static/techMuseum.jpeg",
    "./static/programmingArtMuseum.webp",
    "./static/contempMuseum.jpg",
    "./static/exhibitMuseum.jpg"
];

// 2. Set the starting position
let currentIndex = 0;

function updateGallery() {
    const imgElement = document.getElementById("galleryImage");
    if (imgElement) {
        imgElement.src = images[currentIndex];
    }
}

// 3. Logic for the 'Next' button
function nextSlide() {
    currentIndex++;
    // If we pass the last image, go back to the first (0)
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateGallery();
}

// 4. Logic for the 'Previous' button
function prevSlide() {
    currentIndex--;
    // If we go before the first image, go to the last one
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateGallery();
}