# Nhận diện SketchFactory

## Ý tưởng

Logo kết hợp ba hình cơ bản và một cây bút đang vẽ. Nó đại diện cho cách SketchFactory
biến mọi vật thành những hình và nét đơn giản. Biểu tượng không phụ thuộc riêng vào
con mèo nên có thể dùng lâu dài khi thư viện mở rộng.

## Màu

| Vai trò | Màu | Hex |
|---|---|---|
| Vàng chính | Pencil yellow | `#F4D35E` |
| Đen nét | Ink black | `#111111` |
| Trắng giấy | Paper white | `#FFFDF7` |
| Coral nhấn | Pencil coral | `#EF6F6C` |
| Gỗ bút | Wood | `#F5C99B` |
| Chữ phụ | Soft gray | `#555555` |

Không đổi nét chính sang màu khác giữa các hình. Coral chỉ dùng làm điểm nhấn, không
chiếm ưu thế hơn vàng.

## Typography

Wordmark dùng sans-serif đậm, ưu tiên `Helvetica Neue`, `Helvetica`, `Arial`. Không
phụ thuộc font tải ngoài để asset render ổn định trên macOS. Heading dùng 800; tagline
dùng 700 và letter spacing rộng.

## File bàn giao

| File | Kích thước | Mục đích |
|---|---:|---|
| `logo-sketchfactory.svg/png` | 1000×1000 | Avatar Facebook, YouTube, TikTok, Instagram |
| `banner-youtube.svg/png` | 2560×1440 | YouTube channel art |
| `cover-facebook.svg/png` | 1640×624 | Facebook Page cover @2x |

SVG là file nguồn. PNG là bản xuất để tải trực tiếp lên nền tảng.

## Vùng an toàn

- YouTube: toàn bộ logo, wordmark và copy chính nằm trong vùng giữa
  `1546 × 423` tại `(507, 508)`, nên hiển thị được trên mobile, desktop và TV.
- Facebook: copy bắt đầu sau x=500; vùng trái dưới được để trống cho avatar và UI Page.
- Avatar: biểu tượng quan trọng nằm trong 71% giữa canvas, an toàn khi nền tảng crop tròn.

## Quy tắc sử dụng

- Không bóp méo tỷ lệ.
- Không đặt logo trên nền có độ tương phản thấp.
- Không thêm shadow, gradient hoặc texture.
- Không tách riêng cây bút khỏi ba hình để làm logo khác.
- Giữ khoảng trống tối thiểu bằng 10% chiều rộng logo quanh biểu tượng.
- Dùng tagline chính xác: `Draw anything. The simple way.`
