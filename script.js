document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Logika untuk Sertifikasi (Eksisting) ---
    const badgesGrid = document.querySelector('.badges-grid');

    if (badgesGrid && typeof certificationData !== 'undefined') {
        let htmlContent = '';

        certificationData.forEach(cert => {
            const imagePath = `images/cert/${cert.gambar}`;
            
            htmlContent += `
                <a href="${cert.link}" target="_blank" class="cert-link">
                    <img src="${imagePath}" alt="Sertifikasi ${cert.judul}" title="${cert.judul}">
                    <span class="cert-title">${cert.judul}</span>
                </a>
            `;
        });

        badgesGrid.innerHTML = htmlContent;
    }

    // --- 2. Logika untuk Google Sheets Contact Form (Baru) ---
	// AKfycbwkEAOnx-2o7Wo5ocq_hIRIA7V8FbAppp2yYLB2nBV4rXfjoDedIgYHYZYj9VUIgh2vDA - Deployment ID
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzHsoxefFxrDmvAUWsPfw4t1OUFek2H3w2nMZQyxhgT3bEgnBGwL_B3DlSATXFvCCIuZA/exec'; // Ganti dengan URL Deployment Anda
    const form = document.getElementById('contact-form');
    const btnKirim = document.getElementById('submit-btn');
    const msgLabel = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Status Loading
            btnKirim.disabled = true;
            btnKirim.innerHTML = "Mengirim...";
            if (msgLabel) msgLabel.style.display = "none";

            fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors'})
                .then(response => {
                    btnKirim.disabled = false;
                    btnKirim.innerHTML = "Kirim Pesan";
                    
                    if (msgLabel) {
                        msgLabel.style.display = "block";
                        msgLabel.style.color = "#D4AF37"; // Warna Emas
                        msgLabel.innerHTML = "Terima kasih! Pesan Anda telah terkirim.";
                    }
                    
                    form.reset();
                    console.log('Success!', response);
                })
                .catch(error => {
                    btnKirim.disabled = false;
                    btnKirim.innerHTML = "Kirim Pesan";
                    
                    if (msgLabel) {
                        msgLabel.style.display = "block";
                        msgLabel.style.color = "red";
                        msgLabel.innerHTML = "Maaf, terjadi kesalahan. Silakan coba lagi.";
                    }
                    
                    console.error('Error!', error.message);
                });
        });
    }
	
	// 1. Fungsi untuk memindahkan class 'active' saat di-scroll
		window.addEventListener('scroll', () => {
			let current = "";
			const sections = document.querySelectorAll("section");
			const navItems = document.querySelectorAll(".nav-item");

			sections.forEach((section) => {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.clientHeight;
				// Deteksi posisi: section dianggap aktif jika sudah melewati 1/3 layar
				if (pageYOffset >= sectionTop - sectionHeight / 3) {
					current = section.getAttribute("id");
				}
			});

			navItems.forEach((item) => {
				item.classList.remove("active");
				// Cek apakah href menu (misal #skills) mengandung id section saat ini
				if (item.getAttribute("href").includes(current)) {
					item.classList.add("active");
				}
			});
		});

		// 2. Fungsi tambahan: Memastikan class active berpindah saat menu di-klik
		document.querySelectorAll('.nav-item').forEach(link => {
			link.addEventListener('click', function() {
				document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
				this.classList.add('active');
			});
		});
	
});