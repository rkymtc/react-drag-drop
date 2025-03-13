# React Drag Drop

Modern bir sürükle-bırak arayüzü ile medya dosyalarını yönetmenizi sağlayan bir React uygulaması.

## Demo

Uygulamanın canlı demosuna aşağıdaki linkten ulaşabilirsiniz:

🔗 [React Drag Drop Demo](https://react-dragdrop.netlify.app/)

## Özellikler

- Resim ve video dosyalarını sürükle-bırak ile yükleme
- Medya dosyalarını timeline'a ekleme
- Timeline'daki öğeleri sürükleyerek yeniden sıralama
- Timeline öğelerinin genişliğini ayarlama

## Teknolojiler

- React
- TypeScript
- React DnD (Drag and Drop)
- Tailwind CSS
- Vite

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Repoyu klonlayın
git clone https://github.com/kullaniciadi/react-drag-drop.git
cd react-drag-drop

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Kullanım

1. **Medya Ekleme**: "Dosya Ekle" butonuna tıklayarak veya sol panele dosya sürükleyerek medya ekleyebilirsiniz.
2. **Önizleme**: Sol paneldeki medya öğelerini orta alana sürükleyerek önizleme yapabilirsiniz.
3. **Timeline'a Ekleme**: Sol paneldeki medya öğelerini alt kısımdaki timeline'a sürükleyerek ekleyebilirsiniz.
4. **Timeline'da Düzenleme**:
   - Öğeleri sürükleyerek yeniden sıralayabilirsiniz.
   - "X" butonuna tıklayarak öğeleri kaldırabilirsiniz.

## Build

Projeyi production için derlemek:

```bash
npm run build
```

Build dosyaları `dist` klasöründe oluşturulacaktır.

## Lisans

MIT
