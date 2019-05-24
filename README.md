# Agrimeme

## Latar Belakang
Di masa kini, banyak tersedia jejaring sosial untuk berbagi tentang suatu hal / informasi ke orang lain. Salah satu media untuk menyebarkan informasi tersebut adalah melalui budaya ‘meme’.

‘Meme’ lebih dikenal sebagai sebuah gambar yang isinya bertujuan untuk menyebarkan informasi, berhumor, maupun berbagi ideologi dari si pembuat meme tersebut. Meme sangat digemari di masa kini, tidak terkecuali masyarakat kampus IPB.

Karena di IPB media penyebaran meme ini masih melalui jejaring sosial (*LINE*, *Facebook*, dll. ), belum ada suatu tempat khusus untuk berbagi meme bagi masyarakat IPB. Dengan adanya **Agrimeme**, masyarakat kampus IPB diharapkan dapat berbagi konten meme melalui suatu platform yang tersentralisasi serta dapat diakses dengan mudah.

## Tujuan Pembuatan Aplikasi
1. Sebagai platform untuk berbagi konten meme.
2. Sebagai sarana hiburan bagi penggunanya.

## Lingkungan Pengembangan

#### Teknologi yang digunakan:
*   Java Springboot
*   MySQL
*   Angular 7
*   Bootstrap v.4.3.1

#### Tools yang digunakan:
*   Eclipse IDE 2018-12
*   Atom 1.37.0

# DOKUMENTASI

## Use Case Diagram
<h1 align='center'><img src="https://github.com/idzharbae/agrimeme-backend/blob/master/Dokumentasi/Use Case Diagram.png"></h1>

## Activity Diagram
<h1 align='center'><img src="https://github.com/idzharbae/agrimeme-backend/blob/master/Dokumentasi/Activity Diagram_Fix.png"></h1>

## Class Diagram
<h1 align='center'><img src="https://github.com/idzharbae/agrimeme-backend/blob/master/Dokumentasi/classDiagram Agrimeme.png"></h1>

# Catatan:

### HTTP Request

Selalu subscribe setelah pakai http service
```
this.postService.downvote(postId).subscribe( result => {
      console.log(result);
      this.post.votes = result['votes'];
    },
    err => {
      console.log(err);
    });
```
Kalau gak di subscribe ada kemungkinan ga kekirim request nya.

