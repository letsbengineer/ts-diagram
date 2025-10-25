# T-S Diyagramı Aracı - Kapsamlı Kullanım Kılavuzu

Bu araç, termodinamik süreçleri ve çevrimleri görselleştirmek, analiz etmek ve dışa aktarmak için tasarlanmış güçlü bir T-s (Sıcaklık-Entropi) diyagramı oluşturucusudur. İster bir mühendislik öğrencisi, ister bir profesyonel olun, bu kılavuz aracın tüm özelliklerinden tam olarak yararlanmanıza yardımcı olacaktır.

##  İçindekiler

- [T-S Diyagramı Aracı - Kapsamlı Kullanım Kılavuzu](#t-s-diyagramı-aracı---kapsamlı-kullanım-kılavuzu)
  - [İçindekiler](#i̇çindekiler)
    - [Giriş](#giriş)
    - [Arayüze Hızlı Bakış](#arayüze-hızlı-bakış)
    - [Bölüm 1: Temel Kullanım - Nokta Ekleme](#bölüm-1-temel-kullanım---nokta-ekleme)
      - [Yöntem A: Tek Tek Nokta Ekleme (Hesaplamalı)](#yöntem-a-tek-tek-nokta-ekleme-hesaplamalı)
      - [Yöntem B: Tek Tek Nokta Ekleme (Manuel T-s)](#yöntem-b-tek-tek-nokta-ekleme-manuel-t-s)
      - [Yöntem C: Toplu Veri Girişi (P-h veya T-s)](#yöntem-c-toplu-veri-girişi-p-h-veya-t-s)
    - [Bölüm 2: Süreçleri Tanımlama - Bağlantılar](#bölüm-2-süreçleri-tanımlama---bağlantılar)
      - [Manuel Bağlantı Oluşturma](#manuel-bağlantı-oluşturma)
      - [Bağlantı Ayarları Paneli](#bağlantı-ayarları-paneli)
      - [Toplu Bağlantı Editörü (Uzman Kullanıcı)](#toplu-bağlantı-editörü-uzman-kullanıcı)
    - [Bölüm 3: Kanvas ile Etkileşim](#bölüm-3-kanvas-ile-etkileşim)
      - [Noktaları Yönetme](#noktaları-yönetme)
      - [Görünümü Kaydırma ve Yakınlaştırma (Pan \& Zoom)](#görünümü-kaydırma-ve-yakınlaştırma-pan--zoom)
      - [Çizgileri Bükme (Eğrisel Süreçler)](#çizgileri-bükme-eğrisel-süreçler)
      - [Sunum Modu](#sunum-modu)
    - [Bölüm 4: Gelişmiş Araçlar ve Analiz](#bölüm-4-gelişmiş-araçlar-ve-analiz)
      - [İzo-çizgileri (İzobarlar) Çizdirme](#i̇zo-çizgileri-i̇zobarlar-çizdirme)
      - [Özel Çevrim Verimliliği Hesabı](#özel-çevrim-verimliliği-hesabı)
    - [Bölüm 5: Görünümü Özelleştirme](#bölüm-5-görünümü-özelleştirme)
      - [Genel Görünüm Ayarları](#genel-görünüm-ayarları)
      - [Nokta ve Çizgi Özelliklerini Değiştirme](#nokta-ve-çizgi-özelliklerini-değiştirme)
      - [Lejant (Legend) ve Notlar](#lejant-legend-ve-notlar)
    - [Bölüm 6: Proje ve Veri Yönetimi](#bölüm-6-proje-ve-veri-yönetimi)
      - [Projeyi Kaydetme ve Yükleme](#projeyi-kaydetme-ve-yükleme)
      - [Veri ve Grafik Dışa Aktarma](#veri-ve-grafik-dışa-aktarma)

---

### Giriş

Bu web tabanlı araç, su/buhar için T-s diyagramları oluşturmanızı sağlar. Temel özellikleri:
*   **Esnek Nokta Girişi:** İki bilinen termodinamik özellikten (P, T, h, s, x) noktaları hesaplayın veya T ve s değerlerini doğrudan girin.
*   **Görsel Süreç Tanımlama:** Noktalar arasında bağlantılar (süreçler) oluşturun, etiketleyin ve stillendirin.
*   **Analiz Araçları:** Sabit basınç eğrileri (izobarlar) çizin ve tanımladığınız çevrimler için termal verimliliği hesaplayın.
*   **Gelişmiş Özelleştirme:** Çizgi kalınlıklarından renklere, etiketlerden lejanta kadar her detayı kontrol edin.
*   **Veri Yönetimi:** Projelerinizi kaydedip tekrar yükleyin, verilerinizi Excel veya Metin dosyası olarak dışa aktarın, diyagramınızı yüksek çözünürlüklü PNG veya vektörel SVG olarak kaydedin.

---

### Arayüze Hızlı Bakış

Arayüz üç ana bölümden oluşur:

| Sol Panel (Kontrol)                                    | Orta Alan (Kanvas)                                       | Sağ Panel (Detay ve Ayar)                               |
| ------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------- |
| Nokta ekleme, toplu veri girişi, analiz ve proje yönetimi | T-s diyagramının kendisi, noktalar ve çizgiler           | Seçilen noktanın özellikleri ve bağlantı ayarları       |

---

### Bölüm 1: Temel Kullanım - Nokta Ekleme

Bir diyagram oluşturmanın ilk adımı durum noktalarını eklemektir. Bunun için birden fazla yöntem mevcuttur.

#### Yöntem A: Tek Tek Nokta Ekleme (Hesaplamalı)

Bu en güçlü yöntemdir. İki bilinen termodinamik özellikten diğer tüm özellikleri hesaplayarak bir nokta ekler.

1.  **Sol panelde**, `➕ Add Points & Data` bölümünü açın.
2.  `Single Point` sekmesine tıklayın.
3.  `Calculate (XSteam)` modunun seçili olduğundan emin olun.
4.  **Point Name** alanına noktanıza bir isim verin (örn: `1`, `Kazan Girişi`).
5.  **Known Property 1** ve **Known Property 2** menülerinden bildiğiniz iki özelliği seçin (örn: `Pressure (P)` ve `Quality (x)`).
6.  Aşağıdaki kutulara bu özelliklerin değerlerini girin.
    *   **İpucu:** `hf` (doymuş sıvı entalpisi), `hg` (doymuş buhar entalpisi) veya `Tsat` (doyma sıcaklığı) gibi özel metinleri de kullanabilirsiniz.
7.  `🧮 Calculate & Add Point` butonuna tıklayın. Noktanız hesaplanacak ve diyagrama eklenecektir.

#### Yöntem B: Tek Tek Nokta Ekleme (Manuel T-s)

Eğer bir noktanın T ve s değerlerini zaten biliyorsanız ve hesaplama yapmak istemiyorsanız:

1.  `Single Point` sekmesindeyken, `Direct (T, s)` moduna geçin.
2.  **Point Name**, **Temperature (°C)** ve **Entropy (kJ/kg·K)** değerlerini girin.
3.  `📍 Add T-s Point` butonuna tıklayın.

#### Yöntem C: Toplu Veri Girişi (P-h veya T-s)

Elinizde bir tablo halinde birden fazla noktanın verisi varsa, bunları tek seferde girebilirsiniz.

1.  `Bulk Import / Update` sekmesine tıklayın.
2.  **Points (T,s) için:**
    *   İlk metin alanına, her satıra bir nokta gelecek şekilde `İsim Sıcaklık Entropi` formatında verilerinizi yapıştırın. Değerler boşluk veya tab ile ayrılabilir.
    *   `Apply T-s Data` butonuna tıklayın.
3.  **XSteam (P,h) için:**
    *   İkinci metin alanına, `İsim Basınç(kPa) Entalpi(kJ/kg)` formatında verilerinizi girin. Entalpi değeri olarak `hf` veya `hg` de kullanabilirsiniz.
    *   `Apply P-h Data` butonuna tıklayın. Sistem tüm noktaları hesaplayıp ekleyecektir.
    *   `Load Current` butonu, mevcut noktaların P-h değerlerini bu alana yükler.

---

### Bölüm 2: Süreçleri Tanımlama - Bağlantılar

Noktaları ekledikten sonra, aralarındaki süreçleri (çevrim adımlarını) göstermek için bağlantılar oluşturabilirsiniz.

#### Manuel Bağlantı Oluşturma

1.  Kanvasın üstündeki kontrol çubuğunda bulunan `🔗 Connect` butonuna tıklayın. Buton kırmızıya dönecek ve fare imleciniz değişecektir.
2.  Başlangıç noktasına tıklayın.
3.  Farenizi bitiş noktasına doğru sürükleyin, kesikli bir çizgi belirecektir.
4.  Bitiş noktasına tıklayın. Arada bir bağlantı (çizgi) oluşacaktır.
5.  Bağlantı modundan çıkmak için `🔗 Cancel` butonuna veya klavyeden `ESC` tuşuna basın.

#### Bağlantı Ayarları Paneli

Oluşturduğunuz bir bağlantıyı özelleştirmek için **sağ paneli** kullanın.

1.  `🔗 Connection Settings` bölümünü açın.
2.  **Source Point** ve **Target Point** menülerinden düzenlemek istediğiniz bağlantının başlangıç ve bitiş noktalarını seçin.
3.  Paneldeki ayarlar otomatik olarak o bağlantının özellikleriyle dolacaktır:
    *   **Line Style:** `Solid`, `Dashed` veya `Dotted` seçimi yapın.
    *   **Label (on-line):** Çizginin üzerinde görünecek etiket (örn: `Isı Girişi`, `İş Çıkışı`).
    *   **Legend Label:** Lejant kutusunda görünecek etiket.
    *   **Renk Kutusu ve Genişlik:** Çizginin rengini ve kalınlığını ayarlayın.
    *   **Show in Legend:** Bu bağlantının lejantta gösterilip gösterilmeyeceğini seçin.
4.  `🔄 Update Connection` butonuna tıklayarak değişiklikleri uygulayın.

#### Toplu Bağlantı Editörü (Uzman Kullanıcı)

Rankine çevrimi gibi karmaşık yapıları hızlıca oluşturmak için en etkili yoldur.

1.  **Sol panelde**, `🔗 Bulk Connection Editor` bölümünü açın.
2.  Metin alanına özel bir formatla komutlarınızı yazın. Detaylı bilgi için `ⓘ` ikonuna tıklayarak yardım menüsünü açabilirsiniz.
3.  **Temel Formatlar:**
    *   **Bağlantı:** `KaynakNokta,HedefNokta,"Etiket",Renk,Stil`
    *   **Nokta Oluşturma:** `NoktaAdı(p=1000,x=0)`
    *   **Hepsi Bir Arada:** `1(p=10,x=0), 2(p=5000,s=*1), "Pompa İşi"`
        *   Bu komut, 1 numaralı noktayı oluşturur, 2 numaralı noktayı 1'in entropisini referans alarak izantropik olarak hesaplar ve aralarına "Pompa İşi" etiketli bir çizgi çeker.
4.  `↥ Apply Changes` butonuna tıklayarak tüm komutları çalıştırın.

---

### Bölüm 3: Kanvas ile Etkileşim

#### Noktaları Yönetme

*   **Seçme:** Bir noktaya tıkladığınızda aktif hale gelir ve sağdaki özellikler panelinde detayları görünür.
*   **Taşıma (Sürükleme):** Seçili bir noktaya basılı tutup sürükleyerek yerini değiştirebilirsiniz. Bu, noktanın *görsel* T ve s değerlerini değiştirir, ancak hesaplanmış termodinamik özelliklerini etkilemez.
*   **Silme:** Bir noktayı seçtikten sonra üzerinde beliren küçük `🗑️` ikonuna tıklayarak veya klavyeden `Delete` tuşuna basarak silebilirsiniz.
*   **Sağ Tık Menüsü:** Bir noktaya sağ tıkladığınızda; düzenleme, silme ve bağlantı başlatma seçenekleri sunan bir menü açılır.

#### Görünümü Kaydırma ve Yakınlaştırma (Pan & Zoom)

*   **Kaydırma (Pan):** Kanvasın boş bir alanına fare ile basılı tutup sürükleyerek diyagramda gezinebilirsiniz.
*   **Yakınlaştırma (Zoom):** Fare tekerleğini kullanarak imlecinizin bulunduğu noktaya yakınlaşıp uzaklaşabilirsiniz. Bu özellikler üst kontrol barındaki `Allow Dragging` ve `Allow Zoom` seçenekleriyle devre dışı bırakılabilir.

#### Çizgileri Bükme (Eğrisel Süreçler)

Gerçek dünyadaki süreçler her zaman düz çizgiler halinde olmaz.

1.  Üst kontrol barında `Allow Bending` seçeneğinin aktif olduğundan emin olun.
2.  Farenizi bir çizginin ortasına getirdiğinizde küçük bir kontrol noktası belirecektir.
3.  Bu kontrol noktasına basılı tutup sürükleyerek çizgiye eğim verebilirsiniz.
4.  Çizgiyi tekrar düz hale getirmek için sağ paneldeki `Connection Settings` altından `Reset Curve` butonunu kullanın.

#### Sunum Modu

`Presentation` butonuna tıkladığınızda arayüzün bazı kısımları sadeleşir, noktaların etiketleri otomatik olarak açılır ve diyagram daha temiz bir sunum için hazırlanır. Tekrar tıklayarak düzenleme moduna geri dönebilirsiniz.

---

### Bölüm 4: Gelişmiş Araçlar ve Analiz

#### İzo-çizgileri (İzobarlar) Çizdirme

Diyagram üzerinde sabit basınç eğrilerini (izobarları) çizdirmek için:

1.  **Sol panelde**, `〰️ Plot Iso-Lines` bölümünü açın.
2.  **Pressure (kPa)** alanına çizdirmek istediğiniz basınç değerini girin.
3.  `Plot Isobar` butonuna tıklayın.
4.  `Plot All Point Pressures` butonu, mevcut tüm noktalarınızın basınç değerleri için otomatik olarak izobarlar çizer.

#### Özel Çevrim Verimliliği Hesabı

Tanımladığınız herhangi bir çevrimin termal verimliliğini hesaplayabilirsiniz.

1.  **Sol panelde**, `📊 Custom Cycle Efficiency` bölümünü açın. (Bu bölüm en az 3 nokta eklenince aktif olur).
2.  **Heat Input (Q_H) Processes** altında, çevrime ısı girişi olan süreçleri tanımlayın. Örneğin, kazandaki süreç için `+ Add Boiler/Heater` butonuna basın, ardından giriş ve çıkış noktalarını seçin.
3.  **Heat Rejection (Q_L) Processes** altında, çevrimden ısı atışı olan süreçleri tanımlayın (örn: kondenser).
4.  Her süreç için kütlesel debiyi (`Mass Flow`) kg/s cinsinden girin.
5.  `🧮 Calculate Efficiency` butonuna tıklayın. Sonuç aşağıda gösterilecektir.

---

### Bölüm 5: Görünümü Özelleştirme

#### Genel Görünüm Ayarları

Kanvasın üstündeki kontrol barında bulunan kutucuklar ile diyagramın genel görünümünü anında değiştirebilirsiniz:
*   `Saturation Curve`: Doyma eğrisini gösterir/gizler.
*   `Show Lines`: Noktalar arası bağlantıları gösterir/gizler.
*   `Show Labels`: Nokta isimlerini gösterir/gizler.
*   `Show Arrows`: Süreçlerin yönünü gösteren okları gösterir/gizler.

#### Nokta ve Çizgi Özelliklerini Değiştirme

**Sağ paneldeki** `🎨 Appearance Settings` bölümü ile tüm görsel elemanları özelleştirebilirsiniz:
*   **Global:** Tüm çizgilerin ve doyma eğrisinin varsayılan kalınlığını ayarlayın.
*   **Point Specific:** Bir nokta seçin ve rengini, boyutunu veya etiket rengini değiştirin.

#### Lejant (Legend) ve Notlar

*   **Lejant:** Kanvasın sağ üst köşesinde bulunur. `Connection Settings` panelinde `Show in Legend` işaretli bağlantılar burada gösterilir. Lejant kutusunu başlığından sürükleyerek istediğiniz yere taşıyabilirsiniz.
*   **Notlar:** Sol üstteki not kutusuna projenizle ilgili özel notlar alabilirsiniz. Bu notlar da projenizle birlikte kaydedilir.

---

### Bölüm 6: Proje ve Veri Yönetimi

#### Projeyi Kaydetme ve Yükleme

Çalışmanızı daha sonra devam etmek üzere kaydedebilirsiniz.

1.  **Sol panelde**, `💾 Project & Data Export` bölümüne gidin.
2.  `📥 Save (.json)` butonuna tıklayarak projenizin tamamını (noktalar, bağlantılar, ayarlar, notlar) bir `.json` dosyası olarak indirin.
3.  Daha sonra bu projeyi açmak için `📤 Load (.json)` butonuna tıklayın ve indirdiğiniz dosyayı seçin.

#### Veri ve Grafik Dışa Aktarma

*   **Veri:**
    *   `📊 Excel (.xlsx)`: Tüm noktaların termodinamik ve doyma özelliklerini içeren detaylı bir Excel raporu oluşturur.
    *   `📋 Text (.txt)`: Kolay kopyalanabilir, düz metin formatında bir özellik raporu oluşturur.
*   **Grafik:**
    *   `💾 4K PNG`: Diyagramınızın yüksek çözünürlüklü (3840x2160) bir resmini indirir.
    *   `✨ SVG`: Diyagramınızın kalitesi bozulmadan büyütülüp küçültülebilen, vektörel bir versiyonunu indirir. Raporlar ve sunumlar için idealdir.