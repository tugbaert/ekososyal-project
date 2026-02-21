document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENT SEÇİMLERİ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');
    const user = localStorage.getItem('ekososyalUser');
    const isLoggedIn = !!user; 

    const navLinksList = document.querySelector('.nav-links');
    
    // --- 1. OTURUM KONTROLÜ VE MENÜ DÜZENLEMESİ ---
    if (navLinksList) {
        const authLinkItem = navLinksList.querySelector('.cta-button').closest('li');

        if (authLinkItem) {
            const authLink = authLinkItem.querySelector('a');

            if (isLoggedIn) {
                // Giriş yapılmışsa: Çıkış Yap'a çevir ve logout listener'ı ekle
                authLink.textContent = 'Çıkış Yap';
                authLink.href = '#'; 
                
                // Logout işlemi için event listener'ı ekle
                authLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Local Storage'ı temizle (Anahtarı çöpe at)
                    localStorage.removeItem('ekososyalUser'); 
                    alert('Başarıyla çıkış yapıldı.');
                    // Anasayfaya veya giriş sayfasına yönlendir
                    window.location.href = '/'; 
                });
            } else {
                // Giriş yapılmamışsa: Giriş/Kayıt yazısını koru
                authLink.textContent = 'Giriş/Kayıt';
                authLink.href = '/giris';
            }
        }
    }
    
    // --- 2. MOBİL MENÜ MANTIĞI ---
    if (menuToggle && desktopNav) {
        menuToggle.addEventListener('click', function() {
            desktopNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (desktopNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Opsiyonel: Aktif Sayfayı Vurgulama
    const path = window.location.pathname.split('/').pop();
    if (path) {
        const currentLink = document.querySelector(`.nav-links a[href*="${path}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }
});