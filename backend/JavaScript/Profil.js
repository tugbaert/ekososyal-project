const USER_STORAGE_KEY = 'currentUserData';
const LOGIN_PAGE_URL = 'Giris-Kayit.html';

// --- STATİK VERİLER (Görünüm İçin) ---
const MONTHLY_TASKS_DATA = [
    { id: 'task-1', title: 'Sıfır Atık Günü', points: 100, desc: 'Tüm atıklarınızı bir gün boyunca ayrı kaplarda toplayın ve kanıtlayın.', emoji: '🗑️' },
    { id: 'task-2', title: 'Plastik Yerine Cam Tercihi', points: 100, desc: 'Plastik şişe yerine cam/metal ürünler kullandığınızı kanıtlayın.', emoji: '🫙' },
    { id: 'task-3', title: 'Çevre Temizliği', points: 200, desc: 'Öncesi–sonrası fotoğrafı yükleyerek bir alanı temizlediğinizi kanıtlayın.', emoji: '🍃' },
    { id: 'task-4', title: 'Fidan Ekimi', points: 200, desc: 'Ektiğiniz fidan veya bitkinin fotoğrafını yükleyiniz.', emoji: '🌳' },
    { id: 'task-5', title: 'Enerji Tasarrufu', points: 75, desc: 'Gereksiz yanan cihazları kapatın ve kanıtlayın.', emoji: '💡' },
    { id: 'task-6', title: 'Taşıt Kullanmama', points: 75, desc: 'Araba yerine yürüyün veya bisiklet kullanın.', emoji: '🚲' },
    { id: 'task-7', title: 'Su Tasarrufu', points: 100, desc: 'Suyu tasarruflu kullandığınızı gösterin.', emoji: '💧' },
    { id: 'task-8', title: 'Yerel Ürün', points: 50, desc: 'Yerel/mevsimlik ürün aldığınızın fotoğrafını yükleyin.', emoji: '🍎' },
];

const BADGES_DATA = [
    { name: 'Başlangıç Fidanı', score: 200, icon: 'fas fa-seedling', styleClass: 'starter' }, // 'starter' sınıfı eklendi
    { name: 'Bronz Yaprak', score: 400, icon: 'fas fa-leaf', styleClass: 'bronze' },
    { name: 'Gümüş Göl', score: 650, icon: 'fas fa-water', styleClass: 'silver' },
    { name: 'Altın Güneş', score: 900, icon: 'fas fa-sun', styleClass: 'gold' },
    { name: 'Elmas Gezegen', score: 1800, icon: 'fas fa-globe-americas', styleClass: 'diamond' }
];
// Kullanıcıyı Güvenli Yükle
let currentUser;
try {
    currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
} catch (e) {
    currentUser = null;
}

let completedTasks = []; 
let currentSelectedTask = null;

// DOM Elementleri
const modal = document.getElementById('upload-modal');
const closeButton = document.querySelector('.close-button');
const submitButton = document.getElementById('submit-task-photo');
const submissionMessage = document.getElementById('submission-message');
const submissionForm = document.getElementById('submission-form-content');

document.addEventListener('DOMContentLoaded', async () => {
    
    // --- GİRİŞ KONTROLÜ (GÖRÜNÜM AYARI) ---
    const loginRequiredDiv = document.getElementById('login-required');
    const profileContainerDiv = document.getElementById('profile-container');

    if (!currentUser || !currentUser.isLoggedIn || !currentUser.username) {
        // GİRİŞ YOKSA: "Giriş Yapılmadı" ekranını göster
        if(loginRequiredDiv) loginRequiredDiv.classList.remove('hidden');
        if(profileContainerDiv) profileContainerDiv.classList.add('hidden');
        return; 
    } else {
        // GİRİŞ VARSA: Profil ekranını göster
        if(loginRequiredDiv) loginRequiredDiv.classList.add('hidden');
        if(profileContainerDiv) profileContainerDiv.classList.remove('hidden');
    }
    
    // Verileri doldur
    renderProfilePage(); 
    await refreshUserData(); 
    await loadCompletedTasks();
    renderProfilePage(); 
    
    // Dosya seçme olayını bağla
    const fileInput = document.getElementById('task-image-upload');
    if(fileInput) {
        fileInput.addEventListener('change', (e) => {
            const span = document.getElementById('selected-file-name');
            span.textContent = e.target.files.length ? e.target.files[0].name : 'Dosya seçilmedi.';
            span.style.color = '#28a745';
        });
    }
});

async function refreshUserData() {
    try {
        const res = await fetch(`/api/user/${currentUser.id}`);
        const data = await res.json();
        if(data.success) {
            currentUser.totalScore = data.user.totalScore;
            currentUser.role = data.user.role;
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
        }
    } catch(e) { console.error(e); }
}

async function loadCompletedTasks() {
    try {
        const res = await fetch(`/api/tasks/completed/${currentUser.id}`);
        const data = await res.json();
        completedTasks = data.completedTasks.map(id => `task-${id}`);
    } catch(e) { console.error(e); }
}

function renderProfilePage() {
    // Kullanıcı Bilgilerini Yaz
    document.getElementById('username-display').textContent = currentUser.username || "Kullanıcı";
    document.getElementById('role-display').textContent = currentUser.role || "Üye";
    document.getElementById('total-score-display').textContent = currentUser.totalScore || 0;

    // Görevleri Listele
    const taskGrid = document.getElementById('weekly-tasks');
    if (taskGrid) {
        taskGrid.innerHTML = '';
        const tasksToShow = MONTHLY_TASKS_DATA.slice(0, 4); 

        tasksToShow.forEach(task => {
            const isDone = completedTasks.includes(task.id);
            const card = document.createElement('div');
            card.className = `task-card ${isDone ? 'completed' : ''}`;
            
            card.innerHTML = `
                <div class="task-info">
                    <h4>${task.emoji} ${task.title}</h4>
                    <p>${task.desc}</p>
                </div>
                <div class="task-actions">
                    <div class="points">${task.points} Puan</div>
                    <button class="task-btn-action ${!isDone ? 'active-task' : ''}" data-id="${task.id}" ${isDone ? 'disabled' : ''}>
                        ${isDone ? 'Tamamlandı' : 'Görevi Yap'}
                    </button>
                </div>
            `;
            taskGrid.appendChild(card);
        });

        document.querySelectorAll('.active-task').forEach(btn => {
            btn.onclick = (e) => openModal(e.target.dataset.id);
        });
    }

    renderBadges();

    // Çıkış Butonu
    if(!document.getElementById('logout-container')) {
        const container = document.createElement('div');
        container.id = 'logout-container';
        container.style.cssText = "margin-top: 30px; border-top: 2px solid #e9ecef; padding-top: 20px; text-align: right;";

        const btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Çıkış Yap';
        btn.style.cssText = "background-color: #dc3545; color: white; padding: 12px 25px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1.05em; box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3); transition: background-color 0.3s;";
        
        btn.onclick = () => {
            localStorage.removeItem(USER_STORAGE_KEY);
            window.location.href = LOGIN_PAGE_URL;
        };
        
        container.appendChild(btn);
        const leftSection = document.querySelector('.left-section');
        if(leftSection) leftSection.appendChild(container);
    }
}

function renderBadges() {
    const list = document.getElementById('badges-list');
    const earned = document.getElementById('earned-badges-display');
    if(!list || !earned) return;

    list.innerHTML = ''; earned.innerHTML = '';

    BADGES_DATA.forEach(badge => {
        const unlocked = (currentUser.totalScore || 0) >= badge.score;
        const item = document.createElement('div');
        item.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
        item.innerHTML = `<div class="badge-visual ${badge.styleClass}"><i class="${badge.icon}"></i></div><div class="badge-info"><strong>${badge.name}</strong><span>${badge.score} Puan</span></div>`;
        list.appendChild(item);

        if(unlocked) {
            const icon = document.createElement('div');
            icon.className = 'earned-badge-icon';
            icon.innerHTML = `<div class="badge-visual ${badge.styleClass}"><i class="${badge.icon}"></i></div>`;
            earned.appendChild(icon);
        }
    });
}

function openModal(taskId) {
    currentSelectedTask = MONTHLY_TASKS_DATA.find(t => t.id === taskId);
    if(currentSelectedTask) {
        document.getElementById('modal-task-title').textContent = currentSelectedTask.title;
        if(submissionForm) submissionForm.classList.remove('hidden');
        if(submissionMessage) submissionMessage.classList.add('hidden');
        if(modal) modal.style.display = 'block';
    }
}

if(closeButton) closeButton.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };

if(submitButton) {
    submitButton.onclick = async () => {
        const fileInput = document.getElementById('task-image-upload');
        if(!fileInput || fileInput.files.length === 0) return alert('Lütfen kanıt fotoğrafı yükleyin.');

        const formData = new FormData();
        formData.append('user_id', currentUser.id);
        formData.append('task_id', currentSelectedTask.id);
        formData.append('points', currentSelectedTask.points);
        formData.append('proof', fileInput.files[0]);

        try {
            const res = await fetch('/api/tasks/submit', { method: 'POST', body: formData });
            const result = await res.json();
            
            if(result.success) {
                document.getElementById('gained-points-display').textContent = currentSelectedTask.points;
                submissionForm.classList.add('hidden');
                submissionMessage.classList.remove('hidden');
                await refreshUserData();
                await loadCompletedTasks();
                renderProfilePage();
                setTimeout(() => modal.style.display = 'none', 2000);
            } else {
                alert(result.message);
            }
        } catch(e) { alert('Bir hata oluştu.'); }
    };
}