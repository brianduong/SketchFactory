# Chiến lược nội dung

## Lời hứa nội dung

SketchFactory giúp người xem vẽ một vật dễ nhận ra bằng ít nét nhất có thể. Đây là kỹ
năng giao tiếp bằng hình đơn giản cho người lớn mới bắt đầu, giáo viên, người làm nội
dung và visual thinker; không phải bài học mỹ thuật hàn lâm.

## Đơn vị nội dung

Một Drawing chuẩn tạo đồng thời:

- Short dọc 15–30 giây.
- Một segment có thể ghép vào video dài.
- SVG/PNG cho worksheet, ebook, flashcard và printable.
- Metadata/caption cho từng nền tảng.

Không tạo bản vẽ riêng theo nền tảng. Chỉ thay presentation, copy và tỷ lệ đầu ra.

## Cấu trúc Short

```text
0–2s    hook thật, liên quan trực tiếp đối tượng
2–12s   vẽ từ khối lớn tới chi tiết nhận diện
12–16s  giữ kết quả và gọi tên
16–20s  lời khen + mời người xem thử lại
```

Voice dùng tiếng Anh Mỹ mặc định, câu ngắn và một ý mỗi cue. Subtitle lấy từ cùng
`VoiceCue` để tránh lệch nội dung.

## Trụ nội dung ban đầu

Ưu tiên các nhóm có giá trị cao với người mới, giáo viên và người cần vẽ nhanh:

1. Thú nuôi và động vật quen thuộc.
2. Đồ dùng lớp học.
3. Trái cây, rau củ và đồ ăn.
4. Phương tiện.
5. Thiên nhiên/thời tiết.
6. Chữ cái, chữ số và hình học.
7. Bộ chủ đề theo mùa.

Chỉ mở rộng sau khi cat MVP được review. Mỗi batch mới nên dùng cùng một family
template để giữ tỷ lệ mắt, miệng, độ dày và stroke order.

## Gate xuất bản

`generated` chỉ có nghĩa pipeline đã tạo đủ artifact. Trước `approved`, cần review:

- Nhận diện trong 1–2 giây.
- Trẻ/giáo viên có thể vẽ lại.
- Voice tự nhiên và đúng bước.
- Không có copyright/trademark.
- Thumbnail không gây hiểu nhầm.
- Metadata không keyword stuffing.

Chỉ Publishing Adapter được cấu hình rõ mới nhận content `approved`.
