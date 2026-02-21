document.addEventListener('DOMContentLoaded', () => {
    const USER_STORAGE_KEY = 'currentUserData';
    let currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null');
    
    const reportsContainer = document.getElementById('reports-container');
    const reportModal = document.getElementById('report-modal');
    const createReportToggle = document.querySelector('.create-report-toggle'); 
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const reportForm = document.getElementById('report-form');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Yeni Bildirim DOM Elementleri
    const customNotification = document.getElementById('custom-notification');
    const notificationText = document.getElementById('notification-text');
    const closeNotificationBtn = document.getElementById('close-notification');
    let notificationTimeout;

    // --- BİLDİRİM FONKSİYONU ---
function showToast(message, type = 'success') {
    const notification = document.getElementById('custom-notification');
    const msgSpan = document.getElementById('notification-text');
    const closeBtn = document.getElementById('close-notification');

    // Metni ayarla
    msgSpan.innerText = message;

    // Tipe göre stil ayarla (success / error)
    if (type === 'error') {
        notification.classList.add('error');
        notification.style.borderLeftColor = '#dc3545'; // Kırmızı
    } else {
        notification.classList.remove('error');
        notification.style.borderLeftColor = '#1a5319'; // Yeşil
    }

    // Göster
    notification.classList.remove('hidden'); // HTML'deki hidden class'ı varsa kaldır
    notification.classList.add('active');

    // Otomatik gizleme (4 saniye sonra)
    setTimeout(() => {
        notification.classList.remove('active');
    }, 4000);

    // Çarpıya basınca gizle
    closeBtn.onclick = () => {
        notification.classList.remove('active');
    };
}

    // --- Fonksiyon: Özel Bildirim Gösterme (showCustomNotification yerine) ---
    function showCustomNotification(message, duration = 4000) {
        if (!customNotification || !notificationText) return;
        if (notificationTimeout) clearTimeout(notificationTimeout);

        customNotification.classList.remove('hidden', 'warning', 'show');
        notificationText.innerHTML = message;

        setTimeout(() => {
            customNotification.classList.add('show');
        }, 10);

        notificationTimeout = setTimeout(hideCustomNotification, duration);
    }

    // --- Fonksiyon: Özel Bildirim Gizleme ---
    function hideCustomNotification() {
        if (!customNotification) return;
        customNotification.classList.remove('show');

        setTimeout(() => {
            customNotification.classList.add('hidden');
        }, 400);
    }

    // Bildirim kapatma butonunu dinleme
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', hideCustomNotification);
    }

    if(createReportToggle) {
        createReportToggle.style.display = 'inline-block'; 
        createReportToggle.onclick = () => {
            if(!currentUser || !currentUser.isLoggedIn) {
                showCustomNotification('⚠️ Bildiri paylaşmak için lütfen önce giriş yapın.');
                return;
            }
            reportModal.style.display = 'flex'; 
        };
    }

    if(modalCloseBtn) modalCloseBtn.onclick = () => reportModal.style.display = 'none';
    window.onclick = (e) => { if (e.target == reportModal) reportModal.style.display = 'none'; };

    loadReports();

    async function loadReports() {
        if(loadingOverlay) loadingOverlay.classList.add('active'); 
        try {
            let url = '/api/reports';
            if (currentUser && currentUser.id) {
            url += `?user_id=${currentUser.id}`;
        }

        const res = await fetch(url); // Yeni URL ile istek at
        const reports = await res.json();
            
            if(reports.length === 0) {
                reportsContainer.innerHTML = '<p class="no-reports-message" style="text-align:center; padding:20px; color:#666;">Henüz hiç gözlem yok. İlk gözlemi sen paylaş!</p>';
            } else {
                reportsContainer.innerHTML = '';
                reports.forEach(report => {
                    const card = createReportCard(report);
                    reportsContainer.appendChild(card);
                });
            }
        } catch(e) { 
            console.error(e);
            reportsContainer.innerHTML = '<p style="text-align:center; color:red;">Veriler yüklenirken hata oluştu.</p>';
        } finally {
            if(loadingOverlay) loadingOverlay.classList.remove('active'); 
        }
    }

    function createReportCard(report) {
        const div = document.createElement('div');
        div.className = 'report-card-item neumo-card'; 
        
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(report.reported_at).toLocaleDateString('tr-TR', dateOptions);
        const initial = report.user ? report.user.charAt(0).toUpperCase() : '?';

        div.innerHTML = `
        <div class="report-header" style="display: flex; align-items: center; padding: 15px;">
            <div class="user-avatar" style="width: 40px; height: 40px; background-color: #1a5319; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px;">${initial}</div>
            <div class="user-info"><strong style="display: block; color: #333;">${report.user}</strong><span style="font-size: 0.85em; color: #666;">${formattedDate}</span></div>
        </div>
        <div class="report-media" style="width: 100%; height: auto; max-height: 400px; overflow: hidden;">
            <img src="${report.photoUrl}" alt="${report.title}" style="width: 100%; display: block; object-fit: cover;" onerror="this.src='gorseller/placeholder.png'">
        </div>
        <div class="report-content" style="padding: 15px;">
            <h3 style="margin-top: 0; color: #33180e; font-size: 1.2em;">${report.title}</h3>
            <div style="border-left: 3px solid #33180e; padding-left: 10px; margin: 10px 0; color: #555;">${report.description}</div>
        </div>
        <div class="report-footer" style="padding: 10px 15px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
            <div class="action-buttons-group" style="display: flex; gap: 10px;">
                <button class="action-button like-btn" data-id="${report.id}" style="background: #e0e5ec; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; box-shadow: 2px 2px 5px #a7aaaf, -2px -2px 5px #ffffff;">
                    <i class="fas fa-heart" style="${report.isLiked ? 'color: #dc3545;' : 'color: #333;'}"></i>
                </button>
                <button class="action-button comment-toggle-btn" style="background: #e0e5ec; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; box-shadow: 2px 2px 5px #a7aaaf, -2px -2px 5px #ffffff;">
                    <i class="fas fa-comment-dots" style="color: #333;"></i>
                </button>
                 ${currentUser && (currentUser.id === report.user_id || currentUser.role === 'ADMIN') ? `
                    <button class="delete-report-btn" data-id="${report.id}" 
                        style="background: #e0e5ec; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; box-shadow: 2px 2px 5px #a7aaaf, -2px -2px 5px #ffffff; color: #333333; font-weight: bold;">
                        Sil
                    </button>
                ` : ""}
            </div>
            <div class="report-status" style="font-size: 0.9em; color: #666; font-weight: bold;"><i class="fas fa-heart" style="color: #dc3545;"></i> <span class="like-count">${report.likes}</span> Beğeni</div>
        </div>

        <div class="comments-section" style="display:none; padding: 15px; background-color: #f9f9f9; border-top: 1px solid #ddd;">
            <ul class="comments-list" style="list-style: none; padding: 0; margin-bottom: 10px;">
                ${report.comments.map(c => `
                    <li class="comment-item" data-id="${c.id}">
                        <span class="comment-text"><strong>${c.user}:</strong> ${c.text}</span>
                        ${currentUser && (currentUser.id === c.user_id || currentUser.role === 'ADMIN') ? `
                            <button class="delete-comment-btn" style="border:none; background:none; cursor:pointer; color:#dc3545;">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        ` : ''}
                    </li>
                `).join('')}
            </ul>
            <form class="comment-form" style="display: flex; gap: 5px;">
                <input type="text" placeholder="Yorumunuzu yazın..." style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                <button type="submit" style="background: #1a5319; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Gönder</button>
            </form>
        </div>
        `;
        const commentList = div.querySelector('.comments-list');
    if(commentList) {
        commentList.onclick = async (e) => {
            // Tıklanan element çöp kutusu veya onun içindeki ikon mu?
            const btn = e.target.closest('.delete-comment-btn');
            if(!btn) return;

            showConfirm("Bu yorumu kalıcı olarak silmek istiyor musun?", async () => {
    // --- YORUM SİLME İŞLEMİ ---
    const li = btn.closest('li');
    const commentId = li.getAttribute('data-id');

    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUser.id })
        });
        
        const data = await res.json();
        if(data.success) {
            li.remove();
            showToast("Yorum silindi.", "success");
        } else {
            showToast(data.message, "error");
        }
    } catch(err) {
        showToast("Bir hata oluştu.", "error");
    }
});
        };
    }
    div.querySelector('.comment-form').onsubmit = async (e) => {
            e.preventDefault();
            if(!currentUser || !currentUser.isLoggedIn) return showCustomNotification('Yorum yapmak için lütfen giriş yapın.');
            const input = e.target.querySelector('input');
            const text = input.value.trim();
            if(!text) return;

            await fetch('/api/reports/comment', {
                method: 'POST', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ user_id: currentUser.id, report_id: report.id, text })
            });
            input.value = ''; 
            loadReports(); 
        };
            div.querySelector('.comment-toggle-btn').onclick = () => {
            const sec = div.querySelector('.comments-section');
            sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
            };

            div.querySelector('.like-btn').onclick = async (e) => {
    if(!currentUser || !currentUser.isLoggedIn) return showCustomNotification('Beğeni yapmak için lütfen giriş yapın.');

    const btn = e.currentTarget;
    const icon = btn.querySelector('i');
    const countSpan = div.querySelector('.like-count');

    try {
        const res = await fetch('/api/reports/like', {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ user_id: currentUser.id, report_id: report.id })
        });

        const data = await res.json();

        if (data.success) {
            let currentCount = parseInt(countSpan.textContent);

            if (data.action === 'liked') {
                // Beğendi: Kalbi kırmızı yap, sayıyı artır
                icon.style.color = '#dc3545'; 
                countSpan.textContent = currentCount + 1;
            } else {
                // Geri çekti: Kalbi siyah yap, sayıyı azalt
                icon.style.color = '#333'; 
                countSpan.textContent = currentCount - 1;
            }
        }
    } catch(err) {
        console.error("Beğeni hatası:", err);
    }
};

        
        const deleteBtn = div.querySelector('.delete-report-btn');
if (deleteBtn) {
    deleteBtn.onclick = () => {
    showConfirm("Bu gönderiyi silmek istediğine emin misin? Bu işlem geri alınamaz.", async () => {
        // --- SİLME İŞLEMİ BAŞLIYOR ---
        const reportId = deleteBtn.getAttribute("data-id");
        try {
            const res = await fetch(`/api/reports/${reportId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: currentUser.id })
            });

            const data = await res.json();
            if (data.success) {
                showCustomNotification("Gönderi başarıyla silindi."); // Toast kullanımı
                div.remove(); 
            } else {
                showCustomNotification(data.message);
            }
        } catch(err) {
            showCustomNotification("Bir hata oluştu.");
        }
    });
};
}

        
        return div;

    }

    if(reportForm) {
        reportForm.onsubmit = async (e) => {
            e.preventDefault();
            const title = document.getElementById('report-title').value;
            const desc = document.getElementById('report-description').value;
            const photo = document.getElementById('report-photo').files[0];

            if(!title || !desc) return showCustomNotification('Lütfen gerekli alanları doldurun.');

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', desc);
            formData.append('user_id', currentUser.id);
            if(photo) formData.append('photo', photo);

            try {
                const res = await fetch('/api/reports', { method:'POST', body: formData });
                const result = await res.json();
                
                if(result.success) {


                    showCustomNotification('🎉 Gözlemin başarıyla paylaşıldı!', 3000);
                    reportModal.style.display = 'none';
                    reportForm.reset();
                    loadReports();
                } 
                else {
                    showCustomNotification('Dosya okuma hatası oluştu.');
                }
            } catch(e) { console.error(e); }
        };
    }
    
    // --- ÖZEL CONFIRM FONKSİYONU ---
function showConfirm(message, onConfirm) {
    const modal = document.getElementById('custom-confirm-modal');
    const textElement = document.getElementById('confirm-text');
    const yesBtn = document.getElementById('confirm-yes-btn');
    const cancelBtn = document.getElementById('confirm-cancel-btn');

    // Mesajı ayarla
    textElement.innerText = message;
    
    // Modalı göster
    modal.style.display = 'flex';

    // Olay Dinleyicilerini Temizle (Önceki tıklamalar karışmasın diye)
    const newYesBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
    
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    // İPTAL BUTONU
    newCancelBtn.onclick = () => {
        modal.style.display = 'none';
    };

    // EVET BUTONU
    newYesBtn.onclick = () => {
        modal.style.display = 'none';
        onConfirm(); // Asıl silme işlemini başlatan fonksiyonu çalıştır
    };
    
    // Dışarı tıklayınca kapatma
    window.onclick = (e) => {
        if (e.target == modal) {
             modal.style.display = 'none';
        }
    };
}
    
});