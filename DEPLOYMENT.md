# isimtescil.net Hosting'e Deployment Rehberi (Plesk Obsidian)

Bu rehber, React/Vite projesini isimtescil.net hosting'e (Plesk Obsidian 18.0.74) yükleme adımlarını içerir.

## Ön Hazırlık

Proje zaten build edilmiş durumda. `dist` klasöründe yayına hazır dosyalar bulunmaktadır.

## Yükleme Adımları

### Yöntem 1: Plesk File Manager ile

1. **Plesk Obsidian paneline giriş yapın**
   - isimtescil.net hosting panelinize giriş yapın
   - Plesk Obsidian kontrol paneline erişin

2. **File Manager'ı açın**
   - Plesk ana sayfasında "Files" (Dosyalar) sekmesine tıklayın
   - Veya sol menüden "Files" seçeneğini seçin
   - `httpdocs` klasörüne gidin (bu, web sitenizin ana dizinidir)

3. **Mevcut dosyaları temizleyin (opsiyonel)**
   - Eğer eski bir site varsa, gerekirse yedek alın
   - Plesk File Manager'da dosyaları seçip "Remove" (Kaldır) butonuna tıklayarak silebilirsiniz
   - Veya FTP ile yedek alabilirsiniz

4. **Dosyaları yükleyin**
   - Plesk File Manager'da `httpdocs` klasöründeyken "Upload Files" (Dosya Yükle) butonuna tıklayın
   - `dist` klasörünün **içindeki tüm dosyaları** seçin:
     - `index.html`
     - `.htaccess`
     - `assets/` klasörü (içindeki tüm dosyalarla birlikte)
   - **ÖNEMLİ**: `dist` klasörünün kendisini değil, içindeki dosyaları yükleyin
   - Dosyaları sürükleyip bırakabilir veya "Select Files" ile seçebilirsiniz
   - Yükleme tamamlandığında "Close" butonuna tıklayın

5. **Klasör yapısını kontrol edin**
   - `httpdocs` klasöründe `index.html` olmalı
   - `httpdocs` klasöründe `.htaccess` olmalı
   - `httpdocs` klasöründe `assets/` klasörü olmalı

6. **.htaccess dosyasını kontrol edin**
   - Plesk'te `.htaccess` dosyası görünmeyebilir (gizli dosya)
   - Eğer görünmüyorsa, "Show hidden files" (Gizli dosyaları göster) seçeneğini aktif edin
   - `.htaccess` dosyasının yüklendiğinden emin olun

### Yöntem 2: Plesk FTP Ayarları ile

1. **FTP bilgilerinizi Plesk'ten alın**
   - Plesk panelinde "Websites & Domains" (Web Siteleri ve Alan Adları) sekmesine gidin
   - Domain'inizin yanındaki "FTP Access" (FTP Erişimi) seçeneğine tıklayın
   - FTP kullanıcı adı ve şifrenizi kontrol edin veya yeni bir FTP kullanıcısı oluşturun
   - FTP sunucu adresi genellikle domain adresinizdir (örn: ftp.alanadiniz.com)
   - Port: 21 (standart FTP portu)

2. **FTP istemcisi ile bağlanın**
   - FileZilla, WinSCP veya başka bir FTP programı kullanın
   - Sunucu bilgilerini girip bağlanın

2. **FTP istemcisi ile bağlanın**
   - FileZilla, WinSCP veya başka bir FTP programı kullanın
   - Sunucu bilgilerini girip bağlanın

3. **Hedef dizine gidin**
   - `httpdocs` klasörüne gidin (veya ana dizine)
   - Eğer `httpdocs` yoksa, ana dizine gidin

4. **Dosyaları yükleyin**
   - Yerel bilgisayarınızda `yap1/dist` klasörünü açın
   - **Tüm dosya ve klasörleri** seçin:
     - `index.html`
     - `.htaccess`
     - `assets/` klasörü
   - Seçili dosyaları FTP ile sunucuya sürükleyip bırakın veya "Upload" butonuna tıklayın

5. **Dosya izinlerini kontrol edin**
   - `.htaccess` dosyasının izinleri: 644
   - `index.html` dosyasının izinleri: 644
   - Klasörlerin izinleri: 755

## Doğrulama ve Test

1. **Ana sayfayı test edin**
   - Tarayıcınızda site URL'nizi açın
   - Ana sayfa düzgün yüklenmeli

2. **Route'ları test edin**
   - `/about` sayfasını açın
   - `/services` sayfasını açın
   - `/projects` sayfasını açın
   - `/contact` sayfasını açın
   - Her sayfa düzgün çalışmalı (404 hatası almamalısınız)

3. **Asset'leri kontrol edin**
   - Resimler yüklenmeli
   - CSS stilleri uygulanmalı
   - JavaScript çalışmalı

## Sorun Giderme

### 404 Hatası Alıyorum
- `.htaccess` dosyasının yüklendiğinden emin olun (Plesk'te gizli dosyaları gösterin)
- `.htaccess` dosyasının `httpdocs` klasöründe olduğunu kontrol edin
- Plesk'te Apache mod_rewrite modülünün aktif olduğundan emin olun:
  - Plesk panelinde "Apache & nginx Settings" (Apache ve nginx Ayarları) sekmesine gidin
  - "Additional directives for Apache" bölümünü kontrol edin
  - Gerekirse hosting sağlayıcınızla (isimtescil.net) iletişime geçin

### Sayfalar Yüklenmiyor
- Tarayıcı konsolunu açın (F12) ve hataları kontrol edin
- Dosya yollarının doğru olduğundan emin olun
- `assets` klasörünün doğru yüklendiğini kontrol edin

### CSS/JS Dosyaları Yüklenmiyor
- `assets` klasörünün ana dizinde olduğundan emin olun
- Dosya izinlerini kontrol edin (644)
- Tarayıcı konsolunda 404 hataları olup olmadığını kontrol edin

## Önemli Notlar

- **Build işlemi**: Her değişiklikten sonra `npm run build` komutunu çalıştırıp yeni `dist` klasörünü yüklemeniz gerekir
- **.htaccess dosyası**: React Router için kritik öneme sahiptir, mutlaka yüklenmelidir
- **Dosya yolu**: `dist` klasörünün içindeki dosyaları yükleyin, `dist` klasörünü değil
- **Cache**: İlk yüklemeden sonra tarayıcı cache'ini temizleyin (Ctrl+F5)

## Plesk Özel Notlar

- **Dizin yapısı**: Plesk'te web dosyaları `httpdocs` klasöründe bulunur
- **Gizli dosyalar**: `.htaccess` dosyasını görmek için Plesk File Manager'da "Show hidden files" seçeneğini aktif edin
- **Apache ayarları**: Plesk'te Apache yapılandırması genellikle otomatik olarak `.htaccess` dosyasını okur
- **Dosya izinleri**: Plesk genellikle dosya izinlerini otomatik olarak ayarlar, ancak gerekirse manuel olarak düzenleyebilirsiniz

## Teknik Detaylar

- **Build çıktısı**: `dist` klasörü
- **Ana dosya**: `index.html`
- **Hedef dizin**: `httpdocs` (Plesk'te)
- **Routing**: Apache mod_rewrite ile yapılandırılmış (`.htaccess` dosyası ile)
- **Compression**: Gzip aktif
- **Caching**: Asset'ler için browser cache aktif
- **Plesk Versiyonu**: Obsidian 18.0.74

## İletişim

Sorun yaşarsanız, hosting sağlayıcınızın (isimtescil.net) destek ekibiyle iletişime geçebilirsiniz.
