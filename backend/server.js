const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const saltRounds = 10;

// --- Veritabanı Bağlantısı ---
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '5-(+)kleoN&', 
    database: 'ekososyal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const db = pool.promise();

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Statik Dosyalar ---
app.use(express.static(__dirname)); 
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/JavaScript', express.static(path.join(__dirname, 'JavaScript')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/gorseller', express.static(path.join(__dirname, 'gorseller')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// --- Multer ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads/') },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// ================= API ROTALARI =================

// 1. AUTH
app.post('/api/register', async (req, res) => {
    const { username, dob, email, password, gender, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ success: false, message: 'Eksik bilgi.' });
    const user_type = (role === 'kulup') ? 'CLUB' : 'USER';
    let gender_val = gender ? gender.replace(/-/g, '_').toUpperCase() : null;
    if (gender_val === 'KADIN') gender_val = 'KADIN';

    try {
        const password_hash = await bcrypt.hash(password, saltRounds);
        await db.query(`INSERT INTO Users (username, date_of_birth, email, password_hash, gender, user_type) VALUES (?, ?, ?, ?, ?, ?)`, [username, dob, email, password_hash, gender_val, user_type]);
        res.status(201).json({ success: true });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'Kullanıcı zaten var.' });
        res.status(500).json({ success: false, message: 'Hata.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (isMatch) {
            res.status(200).json({ success: true, user: { id: user.user_id, username: user.username, role: user.user_type, totalScore: user.total_points }});
        } else {
            res.status(401).json({ success: false, message: 'Hatalı şifre.' });
        }
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const [results] = await db.query('SELECT user_id, username, total_points, user_type FROM Users WHERE user_id = ?', [req.params.id]);
        if(results.length > 0) res.json({ success: true, user: { id: results[0].user_id, username: results[0].username, role: results[0].user_type, totalScore: results[0].total_points }});
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. GÖNDERİLER
// --- 1. GÖNDERİLERİ GETİRİRKEN BEĞENİ DURUMUNU KONTROL ET ---
// Mevcut 'app.get('/api/reports'...' kısmını tamamen bununla değiştir:
app.get('/api/reports', async (req, res) => {
    // Frontend'den gelen user_id'yi alıyoruz (Kimin baktığını anlamak için)
    const currentUserId = req.query.user_id; 

    try {
        const [reports] = await db.query(`
            SELECT c.complaint_id as id, c.user_id, c.title, c.description, 
                   c.image_url as photoUrl, c.like_count as likes, c.reported_at, 
                   u.username as user 
            FROM Complaints c 
            JOIN Users u ON c.user_id = u.user_id 
            ORDER BY c.reported_at DESC
        `);

        for (let report of reports) {
            const dateObj = new Date(report.reported_at);
            report.date = dateObj.toLocaleDateString('tr-TR');
            
            // Yorumları çek
            const [comments] = await db.query(`
                SELECT cc.comment_id as id, cc.user_id, cc.text, u.username as user 
                FROM ComplaintComments cc 
                JOIN Users u ON cc.user_id = u.user_id 
                WHERE cc.complaint_id = ? 
                ORDER BY cc.created_at ASC
            `, [report.id]);
            report.comments = comments;

            // --- KRİTİK KISIM: Kullanıcı bu gönderiyi beğenmiş mi? ---
            report.isLiked = false; // Varsayılan: Beğenmedi
            if (currentUserId) {
                const [likeCheck] = await db.query(
                    'SELECT * FROM ComplaintLikes WHERE user_id = ? AND complaint_id = ?', 
                    [currentUserId, report.id]
                );
                if (likeCheck.length > 0) {
                    report.isLiked = true; // Tabloda kaydı varsa: Beğendi
                }
            }
        }
        res.json(reports);
    } catch (err) { res.status(500).json({ error: 'Yüklenemedi: ' + err.message }); }
});

app.post('/api/reports', upload.single('photo'), async (req, res) => {
    const { title, description, user_id } = req.body;
    const image_url = req.file ? 'uploads/' + req.file.filename : 'gorseller/placeholder.png';
    try {
        await db.query('INSERT INTO Complaints (user_id, title, description, image_url) VALUES (?, ?, ?, ?)', [user_id, title, description, image_url]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});

app.post('/api/reports/comment', async (req, res) => {
    const { user_id, report_id, text } = req.body;
    try {
        await db.query('INSERT INTO ComplaintComments (user_id, complaint_id, text) VALUES (?, ?, ?)', [user_id, report_id, text]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});
// server.js - Yorum Silme Rotası Gönderi yorum

// --- 2. BEĞENİ EKLE / ÇIKAR (TOGGLE) ---
app.post('/api/reports/like', async (req, res) => {
    const { user_id, report_id } = req.body;

    try {
        // 1. Önce kullanıcı daha önce beğenmiş mi diye bak
        const [check] = await db.query(
            'SELECT * FROM ComplaintLikes WHERE user_id = ? AND complaint_id = ?', 
            [user_id, report_id]
        );

        if (check.length > 0) {
            // --- DURUM A: Zaten beğenmiş -> BEĞENİYİ GERİ ÇEK (UNLIKE) ---
            await db.query(
                'DELETE FROM ComplaintLikes WHERE user_id = ? AND complaint_id = ?', 
                [user_id, report_id]
            );
            // Sayıyı 1 azalt
            await db.query(
                'UPDATE Complaints SET like_count = like_count - 1 WHERE complaint_id = ?', 
                [report_id]
            );
            
            res.json({ success: true, action: 'unliked' });

        } else {
            // --- DURUM B: Henüz beğenmemiş -> BEĞENİ EKLE (LIKE) ---
            await db.query(
                'INSERT INTO ComplaintLikes (user_id, complaint_id) VALUES (?, ?)', 
                [user_id, report_id]
            );
            // Sayıyı 1 artır
            await db.query(
                'UPDATE Complaints SET like_count = like_count + 1 WHERE complaint_id = ?', 
                [report_id]
            );

            res.json({ success: true, action: 'liked' });
        }

    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: err.message }); 
    }
});
// --- GÖNDERİ SİLME (ADMİN VEYA GÖNDERİ SAHİBİ) ---
app.delete('/api/reports/:id', async (req, res) => {
    const reportId = req.params.id;
    const userId = req.body.user_id; // İsteği yapan kişi

    try {
        // 1. İsteği yapan kişinin rolünü öğren
        const [users] = await db.query("SELECT user_type FROM Users WHERE user_id = ?", [userId]);
        
        if (users.length === 0) return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });

        const isAdmin = users[0].user_type === 'ADMIN';

        // 2. Gönderiyi ve sahibini veritabanından bul
        const [rows] = await db.query("SELECT * FROM Complaints WHERE complaint_id = ?", [reportId]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Gönderi bulunamadı veya zaten silinmiş." });
        }

        // İstek yapan kişi gönderinin sahibi mi?
        const isOwner = rows[0].user_id === parseInt(userId);

        // 3. YETKİ KONTROLÜ: Kişi Admin ise VEYA Sahibi ise silebilir
        if (isAdmin || isOwner) {
            
            // a) Fotoğraf varsa sunucudan fiziksel olarak sil
            const img = rows[0].image_url;
            if (img && img.startsWith("uploads/") && fs.existsSync(img)) {
                fs.unlink(img, () => {});
            }
            
            // b) Önce gönderiye ait yorumları sil (Veritabanı hatası almamak için)
            await db.query("DELETE FROM ComplaintComments WHERE complaint_id = ?", [reportId]);

            // c) Veritabanından gönderiyi sil
            await db.query("DELETE FROM Complaints WHERE complaint_id = ?", [reportId]);

            res.json({ success: true, message: isAdmin ? "Gönderi admin yetkisiyle silindi." : "Gönderiniz silindi." });

        } else {
            // İkisi de değilse izin verme
            res.status(403).json({ success: false, message: "Bu gönderiyi silme yetkiniz yok." });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Sunucu hatası: " + err.message });
    }
});
// --- YORUM SİLME (ADMİN VEYA YORUM SAHİBİ) ---
app.delete('/api/comments/:id', async (req, res) => {
    const commentId = req.params.id;
    const { user_id } = req.body; // İsteği yapan kişi

    try {
        // 1. İsteği yapan kişinin rolünü öğren
        const [users] = await db.query("SELECT user_type FROM Users WHERE user_id = ?", [user_id]);
        
        if (users.length === 0) return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });

        const isAdmin = users[0].user_type === 'ADMIN';

        // 2. Yorumun sahibini veritabanından bul
        const [commentRows] = await db.query("SELECT user_id FROM ComplaintComments WHERE comment_id = ?", [commentId]);

        if (commentRows.length === 0) {
            // Yorum zaten yoksa hata döndür
            return res.status(404).json({ success: false, message: "Yorum bulunamadı veya zaten silinmiş." });
        }

        // İstek yapan kişi yorumun sahibi mi?
        const isOwner = commentRows[0].user_id === parseInt(user_id);

        // 3. YETKİ KONTROLÜ: Kişi Admin ise VEYA Yorum Sahibi ise silebilir
        if (isAdmin || isOwner) {
            await db.query("DELETE FROM ComplaintComments WHERE comment_id = ?", [commentId]);
            res.json({ success: true, message: isAdmin ? "Yorum admin yetkisiyle silindi." : "Yorumunuz silindi." });
        } else {
            // İkisi de değilse izin verme
            res.status(403).json({ success: false, message: "Bu yorumu silme yetkiniz yok." });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
});

// 3. ETKİNLİKLER
// Etkinlikleri Listele
app.get('/api/events', async (req, res) => {
    try {
        const [announcements] = await db.query('SELECT * FROM Announcements ORDER BY posted_at DESC');
        
        const events = announcements.map(a => ({
            id: a.announcement_id + 1000,
            real_id: a.announcement_id,
            owner_id: a.user_id,
            title: a.title,
            description: a.content,
            // Eğer veritabanında resim varsa onu kullan, yoksa varsayılanı kullan
            imageUrl: a.image_url ? a.image_url : 'img/Duyuru.png',
            pageUrl: a.page_url || '',
            date: new Date(a.posted_at).toLocaleDateString('tr-TR')
        }));
        res.json(events);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
// Yeni Etkinlik Ekle (user_id ile)
app.post('/api/events', upload.single('image'), async (req, res) => {
    // FormData ile geldiği için veriler req.body içinde, dosya req.file içindedir
    const { title, content, user_id, pageUrl} = req.body;
    
    // Dosya yüklendiyse yolunu al, yüklenmediyse NULL veya boş bırak
    const image_url = req.file ? 'uploads/' + req.file.filename : null;

    try {
        // SQL sorgusuna image_url eklendi
        await db.query(
            'INSERT INTO Announcements (title, content, user_id, image_url, page_url) VALUES (?, ?, ?, ?, ?)', 
            [title, content, user_id, image_url, pageUrl]
        );
        res.json({ success: true });
    } catch (err) { 
        console.error(err);
        res.status(500).json({ success: false, message: err.message }); 
    }
});

// Etkinlik Silme (Admin herkesinkini silebilir, Kulüp sadece kendininkini)
app.delete('/api/events/:id', async (req, res) => {
    const eventId = req.params.id; // Frontend'den gelen ID (örn: 1005)
    const { user_id } = req.body;  // İsteği yapan kişi
    
    // 1000 eklenmiş ID'yi normale çevir
    const realId = parseInt(eventId) - 1000;

    try {
        // 1. Önce isteği yapan kullanıcının ROLÜNÜ öğrenelim
        const [users] = await db.query("SELECT user_type FROM Users WHERE user_id = ?", [user_id]);
        
        if (users.length === 0) {
            return res.status(403).json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        const userRole = users[0].user_type; // 'ADMIN', 'CLUB' veya 'USER'

        // 2. Silme Sorgusunu Hazırla
        let sql = "DELETE FROM Announcements WHERE announcement_id = ?";
        let params = [realId];

        // EĞER ADMIN DEĞİLSE, ek olarak sahiplik (user_id) kontrolü yap
        if (userRole !== 'ADMIN') {
            sql += " AND user_id = ?";
            params.push(user_id);
        }

        // 3. Önce Yorumları Temizle (Hata almamak için)
        // Admin siliyor olsa bile o etkinliğin yorumları gitmeli
        // (Eğer SQL tablonuzda CASCADE ayarlıysa buna gerek yok ama garanti olsun)
        await db.query("DELETE FROM EventComments WHERE event_id = ?", [realId]);

        // 4. Etkinliği Sil
        const [result] = await db.query(sql, params);

        if (result.affectedRows === 0) {
            // Hiçbir satır silinmediyse yetki yok demektir (veya etkinlik yok)
            return res.json({ success: false, message: "Bu etkinliği silme yetkiniz yok." });
        }
        
        res.json({ success: true, message: "Etkinlik silindi." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Sunucu hatası: " + err.message });
    }
});


// Yorumları Getir
app.get('/api/events/comments/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        // Eğer statik etkinlikse (ID < 1000) veritabanında ID'si 1,2.. diye kayıtlı olabilir veya hiç olmayabilir.
        // Dinamik etkinlikler (ID > 1000) için ID dönüşümü yapmalıyız.
        let dbEventId = eventId;
        if(eventId > 1000) dbEventId = eventId - 1000;

        const [tableCheck] = await db.query("SHOW TABLES LIKE 'EventComments'");
        if(tableCheck.length === 0) return res.json([]);

        // Yorumun ID'sini ve User ID'sini de çekiyoruz
        const [rows] = await db.query(`SELECT ec.comment_id, ec.user_id, ec.text, u.username as user FROM EventComments ec JOIN Users u ON ec.user_id = u.user_id WHERE ec.event_id = ? ORDER BY ec.created_at ASC`, [dbEventId]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Yorum Ekle
app.post('/api/events/comment', async (req, res) => {
    const { user_id, event_id, text } = req.body;
    let dbEventId = event_id;
    if(event_id > 1000) dbEventId = event_id - 1000;

    try {
        await db.query('INSERT INTO EventComments (user_id, event_id, text) VALUES (?, ?, ?)', [user_id, dbEventId, text]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});
// --- ETKİNLİK YORUMU SİLME (YENİ VE DOĞRU ROTA) ---
app.delete('/api/events/comments/:id', async (req, res) => {
    const commentId = req.params.id;
    const { user_id } = req.body; // İsteği yapan kişi

    try {
        // 1. İsteği yapan kişinin admin olup olmadığını kontrol et
        const [users] = await db.query("SELECT user_type FROM Users WHERE user_id = ?", [user_id]);
        
        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });
        }

        const isAdmin = users[0].user_type === 'ADMIN';

        // 2. Yorumun sahibini EVENTCOMMENTS tablosundan bul
        // (Dikkat: ComplaintComments değil, EventComments olmalı)
        const [commentRows] = await db.query("SELECT user_id FROM EventComments WHERE comment_id = ?", [commentId]);

        if (commentRows.length === 0) {
            return res.status(404).json({ success: false, message: "Yorum bulunamadı." });
        }

        // İstek yapan kişi yorumun sahibi mi?
        const isOwner = commentRows[0].user_id == user_id;

        // 3. YETKİ KONTROLÜ: Kişi Admin ise VEYA Yorum Sahibi ise silebilir
        if (isAdmin || isOwner) {
            await db.query("DELETE FROM EventComments WHERE comment_id = ?", [commentId]);
            res.json({ success: true, message: "Yorum başarıyla silindi." });
        } else {
            res.status(403).json({ success: false, message: "Bu yorumu silme yetkiniz yok." });
        }

    } catch (err) {
        console.error("Yorum silme hatası:", err);
        res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
});

// VERİTABANI GÜNCELLEME (Bunu bir kez çalıştırın)
app.get('/api/update-db', async (req, res) => {
    try {
        // Announcements tablosuna user_id sütunu ekle (Eğer yoksa)
        try {
            await db.query("ALTER TABLE Announcements ADD COLUMN user_id INT");
        } catch (e) {
            // Sütun zaten varsa hata verebilir, görmezden geliyoruz.
        }
        res.send("<h1>✅ Veritabanı Güncellendi!</h1><p>Announcements tablosuna user_id eklendi.</p>");
    } catch (err) {
        res.send("Hata: " + err.message);
    }
});


// 4. GÖREVLER
app.get('/api/tasks/completed/:userId', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT task_id FROM UserTaskStatus WHERE user_id = ?', [req.params.userId]);
        res.json({ completedTasks: rows.map(row => row.task_id) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/tasks/submit', upload.single('proof'), async (req, res) => {
    const { user_id, task_id, points } = req.body;
    const image_url = req.file ? 'uploads/' + req.file.filename : '';
    const taskIdInt = parseInt(task_id.replace('task-', '')); 
    try {
        const [check] = await db.query('SELECT * FROM UserTaskStatus WHERE user_id = ? AND task_id = ?', [user_id, taskIdInt]);
        if (check.length > 0) return res.status(400).json({ success: false, message: 'Zaten yapıldı.' });
        
        const [taskCheck] = await db.query('SELECT * FROM Tasks WHERE task_id = ?', [taskIdInt]);
        if (taskCheck.length === 0) {
            await db.query('INSERT INTO Tasks (task_id, title, description, points_reward, start_date, end_date) VALUES (?, ?, ?, ?, CURDATE(), CURDATE())', [taskIdInt, 'Görev', 'Otomatik', points]);
        }

        await db.query('INSERT INTO TaskSubmissions (user_id, task_id, image_url) VALUES (?, ?, ?)', [user_id, taskIdInt, image_url]);
        await db.query('INSERT INTO UserTaskStatus (user_id, task_id) VALUES (?, ?)', [user_id, taskIdInt]);
        await db.query('UPDATE Users SET total_points = total_points + ? WHERE user_id = ?', [points, user_id]);
        res.json({ success: true, points_earned: points });
    } catch (err) { res.status(500).json({ success: false }); }
});

// 5. ANKETLER
app.post('/api/polls/vote', async (req, res) => {
    const { user_id, poll_name, score } = req.body;
    if (!user_id || user_id === 0) return res.json({ success: true, message: 'Misafir oyu.' });

    try {
        await db.query(`CREATE TABLE IF NOT EXISTS QuizResults (result_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, quiz_name VARCHAR(255) NOT NULL, score INT NOT NULL, taken_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)`);
        await db.query('INSERT INTO QuizResults (user_id, quiz_name, score) VALUES (?, ?, ?)', [user_id, poll_name, score]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ success: false }); }
});


// =========================================================
// === KURULUM VE DÜZELTME LİNKLERİ (HEPSİ EKLENDİ!) ===
// =========================================================

// 1. Ayşe Kaya ve Gönderisini Geri Getir
app.get('/api/setup', async (req, res) => {
    try {
        await db.query(`INSERT IGNORE INTO Users (username, email, password_hash, user_type, total_points) VALUES ('Ayşe Kaya', 'ayse@mail.com', 'dummyhash', 'USER', 150)`);
        const [users] = await db.query("SELECT user_id FROM Users WHERE username = 'Ayşe Kaya'");
        const userId = users[0].user_id;
        const [mevcut] = await db.query("SELECT * FROM Complaints WHERE title = 'Çocuk Parkındaki Kırık Camlar'");
        if (mevcut.length === 0) {
            await db.query(`INSERT INTO Complaints (user_id, title, description, image_url, location, like_count, reported_at) VALUES (?, 'Çocuk Parkındaki Kırık Camlar', 'Mahallemizdeki çocuk oyun parkının kaydırağının yanında çok sayıda kırık şişe camı var.', 'gorseller/cam.png', 'Park', 25, '2025-11-17 14:30:00')`, [userId]);
            res.send("<h1>✅ Başarılı!</h1><p>Ayşe Kaya ve gönderisi geri yüklendi.</p>");
        } else {
            res.send("<h1>⚠️ Zaten yüklü.</h1>");
        }
    } catch (err) { res.send("Hata: " + err.message); }
});

// 2. Etkinlik Yorumlarını Geri Getir
app.get('/api/setup-events', async (req, res) => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS EventComments (comment_id INT AUTO_INCREMENT PRIMARY KEY, event_id INT NOT NULL, user_id INT NOT NULL, text TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)`);
        const [users] = await db.query("SELECT user_id FROM Users WHERE username = 'Ayşe Kaya'");
        if (users.length > 0) {
            const userId = users[0].user_id;
            await db.query("INSERT INTO EventComments (event_id, user_id, text) VALUES (1, ?, 'Bu projeyi çok destekliyorum, mutfağımdaki alışkanlıklarım değişti. 🥦')", [userId]);
            res.send("<h1>✅ Başarılı!</h1><p>Etkinlik yorumları yüklendi.</p>");
        } else { res.send("<h1>⚠️ Uyarı</h1><p>Ayşe Kaya bulunamadı. Önce /api/setup yapın.</p>"); }
    } catch (err) { res.send("<h1>❌ Hata</h1><p>" + err.message + "</p>"); }
});

// 3. Admin Oluşturma
app.get('/api/create-admin', async (req, res) => {
    try {
        const password_hash = await bcrypt.hash('123456', saltRounds); 
        await db.query(`INSERT IGNORE INTO Users (username, email, password_hash, user_type, total_points) VALUES ('Admin', 'admin@ekososyal.com', ?, 'ADMIN', 0)`, [password_hash]);
        res.send("<h1>✅ Admin Oluşturuldu!</h1>");
    } catch (err) { res.send("Hata: " + err.message); }
});

// 4. İsim Düzeltme (Süper Admin -> Admin)
app.get('/api/fix-admin-name', async (req, res) => {
    try {
        await db.query("UPDATE Users SET username = 'Admin' WHERE email = 'admin@ekososyal.com'");
        res.send("<h1>✅ İsim Düzeltildi!</h1>");
    } catch (err) { res.send("Hata: " + err.message); }
});

// 5. Duyuru Temizleme
app.get('/api/clear-events', async (req, res) => {
    try {
        await db.query("DELETE FROM Announcements");
        res.send("<h1>✅ Duyurular Temizlendi!</h1>");
    } catch (err) { res.send("Hata: " + err.message); }
});


// --- SAYFA YÖNLENDİRMELERİ ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Anasayfa.html')));
app.get('/giris', (req, res) => res.sendFile(path.join(__dirname, 'Giris-Kayit.html')));
app.get('/profil', (req, res) => res.sendFile(path.join(__dirname, 'Profil.html')));
app.get('/etkinlikler', (req, res) => res.sendFile(path.join(__dirname, 'Etkinlikler.html')));
app.get('/sorun-bildir', (req, res) => res.sendFile(path.join(__dirname, 'CevreSorunuBildir.html')));
app.get('/anketler', (req, res) => res.sendFile(path.join(__dirname, 'Anketler.html')));
app.get('/temel-bilgiler', (req, res) => res.sendFile(path.join(__dirname, 'TemelBilgiler.html')));
/* BU LİNKİ BİR KEZ ÇALIŞTIRIN: http://localhost:3000/api/add-url-column
app.get('/api/add-url-column', async (req, res) => {
    try {
        await db.query("ALTER TABLE Announcements ADD COLUMN page_url VARCHAR(500)");
        res.send("<h1>✅ Sütun Eklendi!</h1><p>Artık etkinliklere link ekleyebilirsiniz.</p>");
    } catch (err) {
        res.send("Hata (Zaten ekli olabilir): " + err.message);
    }
});*/

app.listen(port, () => { console.log(`🚀 Sunucu http://localhost:${port} adresinde çalışıyor...`); });