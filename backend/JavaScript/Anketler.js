const anketler = {
  cevrecimisiniz: {
    baslik: "Ne kadar çevrecisiniz?",
    sorular: [
      "Geri dönüşüm kutularını düzenli kullanır mısınız?",
      "Plastik poşet yerine bez çanta kullanır mısınız?",
      "Kullanmadığınız elektronik cihazları fişten çeker misiniz?",
      "Suyu gereksiz yere açık bırakmaz mısınız?",
      "Toplu taşıma araçlarını tercih eder misiniz?",
      "Kağıt israfını önlemeye dikkat eder misiniz?",
      "Evde enerji tasarrufu yapar mısınız?",
      "Doğaya çöp atmaz mısınız?",
      "Çevreyle ilgili kampanyalara katılır mısınız?",
      "Ağaç dikme etkinliklerine katılır mısınız?"
    ]
  },
  hayvansever: {
    baslik: "Patili dostlara bakışımız",
    sorular: [
      "Evcil hayvan sahiplenmeyi düşünüyor musunuz?",
      "Sokak hayvanlarına mama ve su verir misiniz?",
      "Hayvan barınaklarına destek olmayı düşünüyor musunuz?",
      "Hayvanların haklarına saygı gösterir misiniz?",
      "Kedi ve köpeklerin bakımını düzenli yapar mısınız?",
      "Hayvanlara zarar verecek davranışlardan kaçınır mısınız?",
      "Hayvanlarla ilgili eğitim ve kampanyaları takip eder misiniz?",
      "Evcil hayvanınızı aşı ve sağlık kontrollerine götürür müsünüz?",
      "Hayvanlar için gönüllü faaliyetlere katılır mısınız?",
      "Hayvanlara karşı duyarlı bir çevreyi destekler misiniz?"
    ]
  },
   topraginsesi: {
    baslik: "Toprağın Sesi",
    sorular: [
      "Muslukları açık bırakmadan dişlerinizi fırçalar mısınız?",
      "Duş süresini 5 dakikadan uzun tutar mısınız?",
      "Bahçe sulamasını sabah/akşam yapar mısınız?",
      "Evde su tasarruflu musluk başlıkları kullanır mısınız?",
      "Bulaşıkları elde yıkamak yerine bulaşık makinesi kullanır mısınız?",
      "Çamaşırları tam dolmadan çalıştırır mısınız?",
      "Yağmur suyunu bahçe sulamada kullanır mısınız?",
      "Gereksiz su kullanımını azaltmak için dikkat eder misiniz?",
      "Toprak ve bitkiler için gereksiz su harcar mısınız?",
      "Su kaynaklarını korumak için farkındalık yaratır mısınız?"
    ]
  },
   minimalAtik: {
    baslik: "Minimal Atık, Maximum Etki",
    sorular: [
      "Evde geri dönüşüm kutularını kullanıyor musunuz?",
      "Kağıt, plastik ve camları ayrı topluyor musunuz?",
      "Tek kullanımlık ürünlerden mümkün olduğunca kaçınıyor musunuz?",
      "Alışverişlerde ambalajsız ürünleri tercih ediyor musunuz?",
      "Artıkları kompost yapıyor veya organik atıkları değerlendiriyor musunuz?",
      "Gereksiz paketlemeyi azaltmak için dikkat ediyor musunuz?",
      "Sıfır atık yaklaşımına uyuyor musunuz?",
      "Plastik şişe yerine tekrar kullanılabilir şişe kullanıyor musunuz?",
      "Kullanılmış malzemeleri yeniden değerlendiriyor musunuz?",
      "Geri dönüşüm ve sıfır atık konularında çevrenize farkındalık yaratıyor musunuz?"
    ]
  },
  karbonAyakizi: {
    baslik: "Karbon Ayak İzi",
    sorular: [
      "Günlük kısa mesafeleri araç yerine yürüyerek gidiyor musunuz?",
      "Hafta içi iş veya okul için toplu taşıma kullanıyor musunuz?",
      "Bisiklet kullanıyor musunuz?",
      "Özel araç kullanımınızı azaltmak için dikkat ediyor musunuz?",
      "Uçak yolculuğu yaparken alternatifleri değerlendiriyor musunuz?",
      "Araç kullanırken yakıt tasarrufuna dikkat ediyor musunuz?",
      "Araç paylaşımı veya carpool yapıyor musunuz?",
      "Elektrikli veya hibrit araç tercih ediyor musunuz?",
      "Hafta sonları uzun mesafeler için araç yerine otobüs veya tren kullanıyor musunuz?",
      "Karbon salınımını azaltmak için genel farkındalığa sahip misiniz?"
    ]
  },
   iklimNabzi: {
    baslik: "İklim Nabzı",
    sorular: [
      "İklim değişikliği hakkında bilgi sahibi misiniz?",
      "İklim değişikliğinin etkilerinden endişe duyuyor musunuz?",
      "Küresel ısınma konusunda farkındalığınızı artırmak için çaba harcıyor musunuz?",
      "Enerji ve kaynak kullanımında çevreyi dikkate alıyor musunuz?",
      "İklim değişikliğiyle mücadele eden kampanyalara katılıyor musunuz?",
      "Günlük alışkanlıklarınızın iklim üzerindeki etkilerini göz önünde bulunduruyor musunuz?",
      "İklim değişikliği hakkında çevrenizle konuşuyor musunuz?",
      "Sera gazı salınımını azaltacak davranışlar sergiliyor musunuz?",
      "İklim değişikliği konusunda kaygınız sizi harekete geçiriyor mu?",
      "Küresel iklim hedeflerine ulaşmak için bireysel olarak katkı sağlıyor musunuz?"
    ]
  }
};

const USER_STORAGE_KEY = 'currentUserData'; 
let currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');

let aktifAnketAdi = null; 

function anketiBaslat(anketAdi) {
    // --- BURADAKİ GİRİŞ KONTROLÜNÜ KALDIRDIK ---
    // Artık herkes tıklayıp çözebilir.

    document.getElementById("anketListesi").classList.add("hidden");
    document.getElementById("anketAlani").classList.remove("hidden");

    // Başlıkları gizle
    const anaBaslik = document.querySelector("#anaBaslik");
    if(anaBaslik) anaBaslik.classList.add("hidden");
    
    const header = document.querySelector(".main-header");
    if(header) header.classList.add("hidden-on-poll");

    const anket = anketler[anketAdi];
    document.getElementById("anketBaslik").innerText = anket.baslik;

    const form = document.getElementById("anketFormu");
    form.innerHTML = "";
    
    aktifAnketAdi = anketAdi; 
    ilerlemeyiSifirla(); 

    anket.sorular.forEach((soru, i) => {
        const soruDiv = document.createElement("div");
        soruDiv.classList.add("soru");
        const soruAdi = `soru${i}`; 

        soruDiv.innerHTML = `
            <p>${i + 1}. ${soru}</p>
            <label><input type="radio" name="${soruAdi}" value="5"> Evet</label>
            <label><input type="radio" name="${soruAdi}" value="3"> Bazen</label>
            <label><input type="radio" name="${soruAdi}" value="1"> Hayır</label>
        `;
        form.appendChild(soruDiv);
    });

    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            ilerlemeyiGuncelle(aktifAnketAdi);
        });
    });
}

async function anketiGonder() {
  const sorular = document.querySelectorAll("#anketFormu .soru");
  let toplamPuan = 0;

  sorular.forEach((_, i) => {
    const secilen = document.querySelector(`input[name="soru${i}"]:checked`);
    if (secilen) toplamPuan += parseInt(secilen.value);
  });

  const ortalama = toplamPuan / sorular.length;
  let sonuc = "";
  const baslik = document.getElementById("anketBaslik").innerText;

  if (baslik === "Toprağın Sesi") {
    if (ortalama >= 4.5) sonuc = "🌊 Harika! Su tasarrufuna çok dikkat ediyorsunuz.";
    else if (ortalama >= 3) sonuc = "💧 Fena değil! Su kullanımında dikkatli olmalısınız.";
    else sonuc = "⚠️ Su kullanım alışkanlıklarınız kuraklığa etki ediyor.";
  } else if (baslik === "Ne kadar çevrecisiniz?") {
    if (ortalama >= 4.5) sonuc = "🌿 Harika! Gerçek bir çevre dostusunuz!";
    else if (ortalama >= 3) sonuc = "🌱 Fena değil! Biraz daha dikkatli olabilirsiniz.";
    else sonuc = "⚠️ Çevre konusunda daha bilinçli olmalısınız.";
  } else if (baslik === "Patili dostlara bakışımız") {
    if (ortalama >= 4.5) sonuc = "🐾 Tebrikler! Gerçek bir hayvanseversiniz!";
    else if (ortalama >= 3) sonuc = "🐶 Fena değil! Sevgiyi geliştirebilirsiniz.";
    else sonuc = "🐱 Hayvanlara karşı daha duyarlı olmalısınız.";
  } else if (baslik === "Minimal Atık, Maximum Etki") {
    if (ortalama >= 4.5) sonuc = "♻️ Harika! Sıfır atık konusunda çok bilinçlisiniz!";
    else if (ortalama >= 3) sonuc = "♻️ Fena değil! Alışkanlıklarınızı geliştirebilirsiniz.";
    else sonuc = "⚠️ Sıfır atık alışkanlıklarınız zayıf.";
  } else if (baslik === "Karbon Ayak İzi") {
    if (ortalama >= 4.5) sonuc = "🌱 Harika! Karbon ayak izinizi minimumda tutuyorsunuz.";
    else if (ortalama >= 3) sonuc = "🚶‍♂️ Fena değil! Biraz daha azaltabilirsiniz.";
    else sonuc = "⚠️ Karbon ayak izinizi ciddi şekilde azaltmalısınız.";
  } else if (baslik === "İklim Nabzı") {
    if (ortalama >= 4.5) sonuc = "🌎 Harika! İklim değişikliği konusunda çok bilinçlisiniz.";
    else if (ortalama >= 3) sonuc = "🌱 Fena değil! Farkındalığınızı artırabilirsiniz.";
    else sonuc = "⚠️ İklim değişikliği hakkında daha bilinçli olmanız gerekiyor.";
  }
 
  document.getElementById("sonucMetni").innerText = sonuc;

  // VERİTABANI İSTEĞİ (Misafir ise server.js kaydetmeden başarılı döner)
  try {
      const userId = (currentUser && currentUser.isLoggedIn) ? currentUser.id : 0;
      
      await fetch('/api/polls/vote', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ user_id: userId, poll_name: baslik, score: toplamPuan })
      });
  } catch(e) { console.error(e); }

  const tekrarBtn = document.getElementById('tekrarBtn');
  if (tekrarBtn) {
      tekrarBtn.classList.remove("hidden");
      tekrarBtn.disabled = false;           
      tekrarBtn.style.opacity = 1;          
  }

  const gonderBtn = document.getElementById("gonderBtn");
  if (gonderBtn) {
      gonderBtn.disabled = true; 
      gonderBtn.style.opacity = 0.5; 
  }
}

function anketleriGoster() {
    document.getElementById("anketListesi").classList.remove("hidden");
    document.getElementById("anketAlani").classList.add("hidden");
    document.getElementById("sonucMetni").innerText = "";

    const anaBaslik = document.querySelector("#anaBaslik");
    if(anaBaslik) anaBaslik.classList.remove("hidden");
    
    const header = document.querySelector(".main-header");
    if(header) header.classList.remove("hidden-on-poll");
    
    ilerlemeyiSifirla(); 
    aktifAnketAdi = null; 
}

function ilerlemeyiGuncelle(anketAdi) {
    const toplamSoruSayisi = anketler[anketAdi].sorular.length;
    const cevaplananSoruSayisi = document.querySelectorAll(`#anketFormu input[type="radio"]:checked`).length;
    const gecerliCevapSayisi = Math.min(cevaplananSoruSayisi, toplamSoruSayisi);
    
    const yuzde = Math.round((gecerliCevapSayisi / toplamSoruSayisi) * 100);
    const gecerliYuzde = Math.min(100, yuzde);

    const progressBar = document.getElementById('anket-progress-bar');
    const progressText = document.getElementById('anket-progress-text');

    if (progressBar && progressText) {
        const red = Math.round(255 * (100 - gecerliYuzde) / 100); 
        const green = Math.round(255 * gecerliYuzde / 100); 
        const blue = 0; 
        const renkKodu = `rgb(${red}, ${green}, ${blue})`;

        progressBar.style.width = gecerliYuzde + '%';
        progressBar.style.backgroundColor = renkKodu;
        progressText.textContent = gecerliYuzde + '% İlerlendi';

        const gonderBtn = document.getElementById('gonderBtn');
        if (gonderBtn) {
            gonderBtn.disabled = gecerliYuzde !== 100;
            gonderBtn.style.opacity = gecerliYuzde === 100 ? 1 : 0.5;
        }
    }
 }

function ilerlemeyiSifirla() {
    const progressBar = document.getElementById('anket-progress-bar');
    const progressText = document.getElementById('anket-progress-text');
    const gonderBtn = document.getElementById('gonderBtn');
    const tekrarBtn = document.getElementById('tekrarBtn');

    if (progressBar && progressText) {
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = '#ff0000'; 
        progressText.textContent = '0% İlerlendi';
    }
    if (gonderBtn) {
        gonderBtn.disabled = true;
        gonderBtn.style.opacity = 0.5;
    }
    if (tekrarBtn) {
        tekrarBtn.classList.add("hidden"); 
        tekrarBtn.disabled = true;           
    }
}

function anketiTekrarCoz() {
  if (aktifAnketAdi) {
    anketiBaslat(aktifAnketAdi);
    document.getElementById("sonucMetni").innerText = "";
  }
}