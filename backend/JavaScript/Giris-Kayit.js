// --- Ortak Değişkenler ---
const USER_STORAGE_KEY = 'currentUserData'; 
const PROFILE_PAGE_URL = 'Profil.html'; 

// --- DOM Elementlerini Seçme ---
const mainOptions = document.getElementById('mainOptions');
const loginFormCard = document.getElementById('loginForm');
const registerFormCard = document.getElementById('registerForm');

const showLoginBtn = document.getElementById('showLoginBtn');
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');
const guestBtn = document.getElementById('guestBtn');

const backToMainFromLogin = document.getElementById('backToMainFromLogin');
const backToMainFromRegister = document.getElementById('backToMainFromRegister');

const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

// Özel Bildirim Elementlerini Seçme
const ekososyalMessage = document.getElementById('ekososyalMessage');
const notificationText = document.getElementById('notificationText');
const closeNotification = document.getElementById('closeNotification');


// --- Fonksiyonlar: Form Geçişleri ---

const showMainOptions = () => {
    mainOptions.classList.remove('hidden');
    loginFormCard.classList.add('hidden');
    registerFormCard.classList.add('hidden');
};

const showLoginForm = () => {
    mainOptions.classList.add('hidden');
    registerFormCard.classList.add('hidden');
    loginFormCard.classList.remove('hidden');
};

const showRegisterForm = () => {
    mainOptions.classList.add('hidden');
    loginFormCard.classList.add('hidden');
    registerFormCard.classList.remove('hidden');
};

// --- Fonksiyonlar: Özel Mesaj Sistemi ---

const showEkososyalMessage = (message, isError = false) => {
    notificationText.textContent = message;
    ekososyalMessage.classList.remove('hidden');
    
    // Hata mesajıysa rengi kırmızımsı yapabiliriz (CSS'te ayar yoksa varsayılan kalır)
    if(isError) {
        ekososyalMessage.style.borderColor = 'red';
    } else {
        ekososyalMessage.style.borderColor = '#4CAF50';
    }

    setTimeout(() => {
        ekososyalMessage.classList.add('show');
    }, 10); 

    setTimeout(hideEkososyalMessage, 5000);
};

const hideEkososyalMessage = () => {
    ekososyalMessage.classList.remove('show');
    setTimeout(() => {
        ekososyalMessage.classList.add('hidden');
    }, 400); 
};

// --- Olay Dinleyicileri (Event Listeners) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // Bildirim kapatma
    if(closeNotification) {
        closeNotification.addEventListener('click', hideEkososyalMessage);
    }

    // Form Geçişleri
    if(showLoginBtn) showLoginBtn.addEventListener('click', showLoginForm);
    
    if(showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if(showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    if(backToMainFromLogin) {
        backToMainFromLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showMainOptions();
        });
    }

    if(backToMainFromRegister) {
        backToMainFromRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showMainOptions();
        });
    }

    // Misafir Girişi
    if(guestBtn) {
        guestBtn.addEventListener('click', () => {
           
            showEkososyalMessage('Misafir kullanıcı olarak devam ediliyor...');
            setTimeout(() => {
                window.location.href = 'Anasayfa.html'; 
            }, 1000);
        });
    }

    // --- KAYIT İŞLEMİ (BACKEND BAĞLANTILI) ---
    if(registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const username = document.getElementById('username').value;
            const dob = document.getElementById('dob').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const gender = document.getElementById('gender').value;
            const role = document.getElementById('role').value;

            // Veriyi hazırla
            const registerData = { username, dob, email, password, gender, role };

            try {
                showEkososyalMessage('Kayıt yapılıyor, lütfen bekleyin...');
                
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registerData)
                });

                const result = await response.json();

                if (result.success) {
                    showEkososyalMessage('✅ Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
                    registerForm.reset();
                    // Giriş ekranına yönlendir
                    setTimeout(() => {
                        showLoginForm();
                    }, 1500);
                } else {
                    showEkososyalMessage('❌ ' + result.message, true);
                }
            } catch (error) {
                console.error('Kayıt Hatası:', error);
                showEkososyalMessage('❌ Sunucuya bağlanılamadı.', true);
            }
        });
    }

    // --- GİRİŞ İŞLEMİ (BACKEND BAĞLANTILI) ---
    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                showEkososyalMessage('Giriş yapılıyor...');

                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (result.success) {
                    // Backend'den gelen kullanıcı verisini düzenle
                    const loggedInUser = {
                        isLoggedIn: true,
                        id: result.user.id,
                        username: result.user.username,
                        email: result.user.email,
                        role: result.user.role,
                        totalScore: result.user.totalScore || 0
                    };

                    // Tarayıcı hafızasına kaydet (Diğer sayfalarda kullanmak için)
                    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));

                    showEkososyalMessage(`✅ Hoş geldiniz, ${result.user.username}! Yönlendiriliyorsunuz...`);
                    
                    setTimeout(() => {
                        window.location.href = PROFILE_PAGE_URL; 
                    }, 1000);
                } else {
                    showEkososyalMessage('❌ ' + result.message, true);
                }

            } catch (error) {
                console.error('Giriş Hatası:', error);
                showEkososyalMessage('❌ Sunucu hatası.', true);
            }
        });
    }
});