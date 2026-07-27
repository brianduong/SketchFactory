# Khảo sát tái sử dụng từ One Small Thing

## Phạm vi khảo sát

Project được tìm thấy tại `/Users/mac/Miganet/Facebook`. Khảo sát ngày 2026-07-27 ở
chế độ chỉ đọc. Không file nào của project cũ bị sửa; không đọc/copy `.env`, token,
model voice hay file xuất bản.

Các file kỹ thuật đã xem gồm README, STATUS, tài liệu quy trình và các script liên
quan tới render FFmpeg, Piper TTS, tách lời đọc, khung Reels.

## Stack hiện tại

- Python scripts điều phối pipeline.
- FFmpeg/ffprobe render và kiểm tra media.
- SVG tạo overlay/branding.
- TTS provider: VieNeu (VI), Piper offline (EN), có macOS `say` cho bản cũ/nháp.
- File Markdown/TXT làm nguồn nội dung, filesystem làm storage.
- Render dọc 1080×1920 và audio AAC 48 kHz.

## Ma trận tái sử dụng

| Thành phần | Quyết định | Lý do |
|---|---|---|
| FFmpeg/ffprobe command patterns | Chỉnh sửa và tái hiện | Công cụ đã phù hợp; đầu vào SketchFactory là stroke layer |
| 1080×1920, 30 fps, safe area | Tái sử dụng nguyên tắc | Đã kiểm chứng đa nền tảng |
| Provider TTS tách riêng | Tái sử dụng kiến trúc | Tránh khóa nhà cung cấp |
| Piper voice implementation | Chưa copy; adapter sau MVP | Python/model/runtime riêng, không nên kéo vào lõi TS |
| Kiểm tra script đã duyệt | Tái sử dụng nguyên tắc | SketchFactory dùng status gate |
| Timeline theo thẻ chữ | Chỉnh thành timeline theo step/stroke | Miền dữ liệu khác |
| SVG overlay branding | Không copy code/brand | Nhận diện SketchFactory phải độc lập |
| Tải Pexels/B-roll | Không dùng | Video vẽ cần nền sạch, không cần ảnh thật |
| VieNeu xử lý tiếng Việt | Không dùng trong MVP | Voice mặc định MVP là tiếng Anh Mỹ |
| Facebook publishing script | Không copy | Có token và chính sách riêng; publishing ngoài MVP |
| Nhạc nền gốc | Không copy file | Quyền sử dụng phải xác minh độc lập |

## Bài học áp dụng

1. Fail-fast khi nguồn lời đọc và timeline không khớp.
2. Đo output thật bằng ffprobe thay vì tin vào ước lượng.
3. Chuẩn hóa âm lượng một lần cho toàn bài, không theo từng câu.
4. Vùng an toàn phải lấy mức khắt khe nhất của nhiều nền tảng.
5. Output lớn nằm ngoài Git và mọi stage phải có thể tạo lại.
6. Không publish tự động trước khi người dùng duyệt.

## Ranh giới an toàn

SketchFactory không import trực tiếp từ đường dẫn project cũ khi chạy. Điều này tránh
phụ thuộc ngầm và đảm bảo project One Small Thing tiếp tục hoạt động độc lập. Nếu sau
này cần dùng chung code, sẽ tách một package mới với test contract, rồi migrate từng
project riêng thay vì sửa tại chỗ.
