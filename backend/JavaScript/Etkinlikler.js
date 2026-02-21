
const USER_STORAGE_KEY = 'currentUserData'; 
let currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
const isLoggedIn = currentUser && currentUser.isLoggedIn;

// STATİK ETKİNLİKLER (Bunlar silinemez, çünkü veritabanında yoklar)
const initialEvents = [
    { id: 1, title: "ZEHİRSİZ SOFRALAR", description: "Zehirsiz Gıda İçin Haydi Harekete...", imageUrl: "img/Gıda.png", pageUrl: "https://zehirsizsofralar.org/" },
    { id: 2, title: "TARIMSAL ÜRETİMDE ONARICI DÖNÜŞÜM", description: "Hatay'ın bereketi solmasın diye, tohumdan toprağa umut ekiyor, depremden etkilenen çiftçilerimizle birlikte ayağa kalkıyoruz.", imageUrl: "img/Tarım.png", pageUrl: "https://hatayicinbirlikte.org/" },
    { id: 3, title: "DOĞA ÖNCÜLERİ", description: "Z Kuşağı Doğaya El Koyuyor: Geleceğin Liderleri, Doğa Sorunlarına Teknolojiyi ve Yaratıcılığı Kullanarak Sadece Konuşmuyor, Çözüm Üretiyor! 💡🌍", imageUrl: "img/Öğrenci.png", pageUrl: "https://www.wwf.org.tr/kesfet/gonulluluk_ve_egitim/doga_onculeri/" },
    { id: 4, title: "DÜNYA İÇİN LAZIM", description:"Dijitalin Çöpü, Dünyanın Geleceği: E-Atıkları Dönüştürerek Sadece Doğayı Değil, Çocukların Zihnini de Formatlıyor!♻️💡", imageUrl: "img/E-atık.png", pageUrl: "https://www.wwf.org.tr/kesfet/gonulluluk_ve_egitim/dunya_icin_lazim/" },
    { id: 5, title: "PLAJINA SAHİP ÇIK", description: "Denizlerin Nefesi Kesilmesin: Plajlarımızı Sadece Kumlardan Değil, Her Saniye Okyanuslara Karışan Plastik Kâbusundan Temizliyor!🏖️🌊", imageUrl: "img/Plaj.png", pageUrl: "https://www.turcev.org.tr/V2/icerikDetay.aspx?icerik_id=160" },
    { id: 6, title: "YEŞİL VATANI ANLAT", description: "Türkiye’nin doğa sevgisini ve çevre bilincini beyaz perdeye taşımayı amaçlayan Yeşil Vatan Kısa Film Yarışması başlıyor.", imageUrl: "img/Ağaç.png", pageUrl: "https://www.gelecegenefes.gov.tr/haberler/yesil-vatan-kisa-film-yarismasi-basvurulari-basladi-3" },
    { id: 7, title: "ÇOCUKLARLA İKLİM DEĞİŞİKLİĞİ", description: "Yetişkinlerin Yok Ettiği Geleceği Çocuklar Kurtaracak! Çocuklarla İklim Değişikliğinin Etkilerini Azaltma projesi.", imageUrl: "img/İklim.png", pageUrl: "https://suyader.org.tr/portfolio/cidea-cocuklarla-iklim-degisikliginin-etkilerini-azaltma-ve-kusaklararasi-aktarim/" },
    { id: 8, title: "GELECEĞE NEFES OL", description:"Nefes Almak İçin Bağışla: Tek bir fidanla yanan ormanların yarasını sarıyoruz.", imageUrl: "img/Fidanbağış.png", pageUrl: "https://www.gelecegenefes.gov.tr/" },
    { id: 9, title: "TÜRKİYE'NİN CANI YANMASIN", description: "Orman yangınları kaderimiz olmasın! WWF Türkiye ile ormanlarımızı korumak için harekete geçin.", imageUrl: "img/Yangın.png", pageUrl: "https://www.wwf.org.tr/kesfet/ormanlar/turkiyenin_cani/" },
    { id: 10, title: "FİDAN BAĞIŞI KAMPANYASI", description: "Bir Fidan, Bin Nefes...", imageUrl: "img/fidan.png", pageUrl: "https://suyader.org.tr/agac-bagis-kampanyasi/" }
];
// ==========================================
// YENİ: ÖZEL TOAST BİLDİRİM FONKSİYONU
// ==========================================
function showToast(message, type = 'success') {
    // 1. Bildirim Kutusunu Oluştur
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type === 'error' ? 'error' : ''}`;

    // 2. İçeriği Doldur (CSS'e uygun yapı)
    const headerText = type === 'error' ? '⚠️ Hata' : '🌿 Ekososyal';
    
    notification.innerHTML = `
        <div class="notification-header">
            ${headerText}
        </div>
        <div class="notification-body">
            ${message}
        </div>
    `;

    // 3. Sayfaya Ekle
    document.body.appendChild(notification);

    // 4. Animasyonu Tetikle (Biraz bekleyip class ekliyoruz)
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // 5. 3 Saniye Sonra Kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        // Animasyon bitince DOM'dan tamamen sil
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}
function showCustomConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('custom-confirm-modal');
        const msgEl = document.getElementById('confirm-msg');
        const yesBtn = document.getElementById('confirm-yes-btn');
        const noBtn = document.getElementById('confirm-no-btn');

        // Mesajı ayarla ve göster
        msgEl.textContent = message;
        modal.style.display = 'flex'; // CSS'te flex tanımladık

        // Evet'e basılırsa
        yesBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(true); // true döndür
        };

        // Hayır'a basılırsa veya dışarı tıklanırsa
        noBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(false); // false döndür
        };
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const eventListContainer = document.getElementById('event-list');
    const addEventBtn = document.getElementById('add-event-btn');
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close-btn');
    const newEventForm = document.getElementById('new-event-form');

    // Admin veya Kulüp ise Duyuru Yap butonu
    if(addEventBtn) {
        addEventBtn.style.display = (isLoggedIn && (currentUser.role === 'CLUB' || currentUser.role === 'ADMIN')) ? 'inline-block' : 'none';
        addEventBtn.onclick = () => modal.style.display = 'block';
    }

    if(closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };

    await renderEventList();

    async function renderEventList() {
        eventListContainer.innerHTML = ''; 
        
        let dynamicEvents = [];
        try {
            const res = await fetch('/api/events');
            dynamicEvents = await res.json();
        } catch(e) { console.error('Hata', e); }

        // Dinamik ve Statik etkinlikleri birleştir
        const allEvents = [...dynamicEvents, ...initialEvents];

        for (const event of allEvents) {
            const item = document.createElement('div');
            item.className = 'list-item'; 
            
            const imgUrl = event.imageUrl || 'https://via.placeholder.com/80';
            const showLinkBtn = (event.pageUrl && event.pageUrl.length > 5) ? 'inline-block' : 'none';

            // --- ETKİNLİK SİLME BUTONU KONTROLÜ ---
            // Eğer giriş yapılmışsa VE (Admin ise VEYA (Kulüp ise VE bu etkinliği o paylaştıysa))
            let deleteEventBtn = '';
            if (isLoggedIn && event.id > 1000) { // Sadece veritabanındaki (ID > 1000) etkinlikler silinebilir
                if (currentUser.role === 'ADMIN' || (currentUser.role === 'CLUB' && currentUser.id === event.owner_id)) {
                    deleteEventBtn = `<button class="action-btn delete-event-btn" data-id="${event.id}" style="position: absolute; top: 10px; right: 10px; background: #e0e5ec; border: none; padding: 5px 8px; border-radius: 15px; cursor: pointer; box-shadow: 2px 2px 5px #a7aaaf, -2px -2px 5px #ffffff; color: #333333; font-weight: bold;">
                        Sil</button>`;
                }
            }

            item.innerHTML = `
                <img src="${imgUrl}" class="list-item-image" onerror="this.src='https://via.placeholder.com/80'">
                <div class="list-item-content" style="position: relative; padding-right: 60px;">
                    <h3>${event.title}</h3> 
                    ${deleteEventBtn}
                    <p>${event.description}</p>
                    <small style="color:#777;">${event.date || ''}</small>
                    
                    
                    <div class="list-item-actions">
                        <button class="action-btn" style="display: ${showLinkBtn};" onclick="window.open('${event.pageUrl}', '_blank')">Etkinliği Gör</button>
                    </div>

                    <div class="comments-display-area" id="comments-for-${event.id}" style="margin-top:15px; padding:10px; background:#f9f9f9; border-radius:5px; display:none;">
                    </div>

                    <div class="list-item-comment-area" style="margin-top: 10px;">
                        ${getCommentAreaHTML(event.id)}
                    </div>
                </div>
            `;
            eventListContainer.appendChild(item);
            await loadCommentsForEvent(event.id);
        }

        attachCommentListeners();
        attachDeleteEventListeners(); // Etkinlik silme listener'ı
    }

    function getCommentAreaHTML(eventId) {
        if (isLoggedIn) {
            return `
                <textarea data-id="${eventId}" placeholder="Yorumunuzu buraya yazın..." 
                          style="width: 100%; min-height: 50px; padding: 8px; border: 1px solid #ccc; border-radius: 5px; margin-bottom:5px;"></textarea>
                <button class="action-btn comment-btn-inline" data-id="${eventId}" style="font-size: 0.9em;">Yorum Yap</button>
            `;
        } else {
            return `<button class="action-btn comment-btn-inline guest-comment-btn" style="background-color: #f44336 !important;" onclick="showToast('Yorum yapmak için giriş yapmalısınız.')">Giriş Yaparak Yorum Yap</button>`;
        }
    }

    // --- YORUMLARI YÜKLEME VE SİLME BUTONU EKLEME ---
    async function loadCommentsForEvent(eventId) {
        try {
            const res = await fetch(`/api/events/comments/${eventId}`);
            const comments = await res.json();
            const container = document.getElementById(`comments-for-${eventId}`);
            
            if (comments.length > 0) {
                container.style.display = 'block';
                // Yorum HTML'ini oluşturuyoruz
                const commentsHTML = comments.map(c => {
                    // Yorumu silme butonu (Eğer yorum bana aitse)
                    let deleteBtn = '';
                    if (isLoggedIn && (currentUser.id === c.user_id || currentUser.role === 'ADMIN')) {
                        deleteBtn = `<i class="fas fa-trash delete-comment-icon" data-id="${c.comment_id}" data-event-id="${eventId}" style="color:red; cursor:pointer; margin-left:10px; font-size:0.9em;" title="Yorumu Sil"></i>`;
                    }
                    
                    return `
                        <div style="font-size:0.9em; border-bottom:1px solid #eee; padding:5px 0; display:flex; justify-content:space-between; align-items:center;">
                            <span><strong>${c.user}:</strong> ${c.text}</span>
                            ${deleteBtn}
                        </div>
                    `;
                }).join('');

                container.innerHTML = `<h5 style="margin:0 0 5px 0; color:#333;">Yorumlar:</h5>` + commentsHTML;

                // Yorum silme ikonlarına tıklama özelliği ekle
                container.querySelectorAll('.delete-comment-icon').forEach(icon => {
                    icon.addEventListener('click', deleteComment);
                });

            } else {
                container.style.display = 'none';
            }
        } catch(e) { console.error(e); }
    }
    

   // 2. YORUM SİLME FONKSİYONUNU ŞU ŞEKİLDE GÜNCELLEYİN:
async function deleteComment(e) {
    // ESKİSİ: if(!confirm(...)) return;
    // YENİSİ (Await kullanıyoruz çünkü kullanıcının basmasını beklemeli):
    const isConfirmed = await showCustomConfirm('Bu yorumu silmek istediğinize emin misiniz?');
    if (!isConfirmed) return; // Hayır dediyse dur.
    
    const commentId = e.target.dataset.id;
    const eventId = e.target.dataset.eventId;

    try {
        const res = await fetch(`/api/events/comments/${commentId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ user_id: currentUser.id })
        });
        const result = await res.json();
        if(result.success) {
            showToast('Yorumunuz silindi.', 'success');
            await loadCommentsForEvent(eventId); 
        } else {
            showToast(result.message || 'Silinemedi.', 'error');
        }
    } catch(err) { console.error(err); }
}

// 3. DUYURU SİLME FONKSİYONUNU ŞU ŞEKİLDE GÜNCELLEYİN:
function attachDeleteEventListeners() {
    document.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            // ESKİSİ: if(!confirm(...)) return;
            // YENİSİ:
            const isConfirmed = await showCustomConfirm('Bu duyuruyu tamamen silmek istediğinize emin misiniz?');
            if (!isConfirmed) return;

            const eventId = e.target.dataset.id;
            try {
                const res = await fetch(`/api/events/${eventId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ user_id: currentUser.id })
                });
                const result = await res.json();
                if(result.success) {
                    showToast('Duyuru başarıyla silindi.', 'success');
                    renderEventList(); 
                } else {
                    showToast(result.message || 'Silinemedi.', 'error');
                }
            } catch(err) { console.error(err); }
        });
    });
}

    function attachCommentListeners() {
        if (!isLoggedIn) return; 

        document.querySelectorAll('.comment-btn-inline:not(.guest-comment-btn)').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const eventId = e.target.dataset.id;
                const textarea = document.querySelector(`textarea[data-id="${eventId}"]`);
                const text = textarea.value.trim();

                if (!text) return showToast('Lütfen bir yorum yazın.');

                try {
                    const res = await fetch('/api/events/comment', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            user_id: currentUser.id,
                            event_id: eventId,
                            text: text
                        })
                    });
                    
                    if(res.ok) {
                        showToast('Yorumunuz yayınlandı! 🌱', 'success');
                        textarea.value = '';
                        await loadCommentsForEvent(eventId);
                    } else {
                        showToast('Yorum kaydedilemedi.', 'error');
                    }
                } catch(e) { console.error(e); }
            });
        });
    }

    if(newEventForm) {
        newEventForm.onsubmit = async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('event-title').value;
            const description = document.getElementById('event-description').value;
            const pageUrl = document.getElementById('event-page-url').value; // Linki de alalım
            const fileInput = document.getElementById('event-image');

            // JSON yerine FormData kullanıyoruz (Resim yüklemek için şart)
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('user_id', currentUser.id);
            formData.append('pageUrl', pageUrl); // Link varsa ekleyelim

            // Eğer dosya seçildiyse ekle
            if (fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            }

            try {
                const res = await fetch('/api/events', {
                    method: 'POST',
                    // DİKKAT: 'Content-Type': 'application/json' BURADA OLMAMALI!
                    // FormData kullanırken tarayıcı başlığı kendi ayarlar.
                    body: formData 
                });
                
                const result = await res.json();
                if(result.success) {
                   showToast('Duyuru ve resim başarıyla yayınlandı!', 'success');
                    modal.style.display = 'none';
                    newEventForm.reset();
                    renderEventList();
                } else {
                    showToast('Hata oluştu: ' + (result.message || 'Bilinmiyor'), 'error');
                }
            } catch(e) { console.error(e); }
        };
    }
});