# Trạng thái SketchFactory

Cập nhật: 2026-07-27 14:23 (Asia/Ho_Chi_Minh)

## Tổng quan

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Kiến trúc TypeScript/CLI | ✅ Hoàn thành | `src/`, `docs/architecture.md` |
| Ngôn ngữ vẽ nét đơn | ✅ Hoàn thành | `docs/drawing-language.md` |
| Pipeline SVG/PNG/voice/subtitle/video | ✅ Hoạt động | 12 drawing JSON và artifact cục bộ |
| Hook an toàn trên điện thoại | ✅ Hoàn thành | Hook tự chia hai dòng, font 44, căn giữa |
| Metadata tiếng Anh trung tính | ✅ Hoàn thành | `src/metadata/engine.ts`, metadata tests |
| Thumbnail theo từng con vật | ✅ Hoàn thành | `src/thumbnail/engine.ts` |
| Bộ nhận diện kênh | ✅ Hoàn thành | `assets/branding/`, `docs/brand-guide.md` |
| Bộ video upload-ready | ✅ 12 video | `output/upload-ready/01-cat.mp4` đến `12-elephant.mp4` |
| Theo dõi đa nền tảng | ✅ Hoàn thành | `docs/publishing/upload-tracker.md` |
| Publishing tự động | ⏳ Chưa triển khai | Hiện đăng thủ công |

## Danh mục 12 video

| No. | Animal | Số nét | Video upload-ready | YouTube |
|---:|---|---:|---|:---:|
| 01 | Cat | 10 | `01-cat.mp4` | ✅ Uploaded |
| 02 | Dog | 9 | `02-dog.mp4` | ✅ Uploaded |
| 03 | Rabbit | 9 | `03-rabbit.mp4` | ✅ Uploaded |
| 04 | Bear | 9 | `04-bear.mp4` | ✅ Uploaded |
| 05 | Fox | 9 | `05-fox.mp4` | ✅ Uploaded |
| 06 | Panda | 10 | `06-panda.mp4` | ✅ Uploaded |
| 07 | Pig | 9 | `07-pig.mp4` | ✅ Uploaded |
| 08 | Cow | 10 | `08-cow.mp4` | ✅ Uploaded |
| 09 | Frog | 8 | `09-frog.mp4` | ✅ Uploaded |
| 10 | Fish | 9 | `10-fish.mp4` | ✅ Uploaded |
| 11 | Turtle | 9 | `11-turtle.mp4` | ⬜ Chưa upload |
| 12 | Elephant | 10 | `12-elephant.mp4` | ⬜ Chưa upload |

TikTok, Facebook và Instagram chưa có video nào được đánh dấu uploaded. Trạng thái chi
tiết được duy trì đồng thời trong bảng tổng và từng upload sheet.

## Quy ước file và publishing

- Video dùng để đăng nằm tại `output/upload-ready/` và có prefix `01`–`12`.
- `output/shorts/` đã được xóa sau khi checksum xác nhận đủ 12 bản trùng trong
  `upload-ready`.
- File sinh trong `output/` bị ignore khỏi Git và có thể tái tạo từ JSON nguồn.
- Upload sheet nằm tại `docs/publishing/`; mỗi file ghi số video và trạng thái riêng
  cho YouTube, TikTok, Facebook và Instagram.
- Bảng tổng: `docs/publishing/upload-tracker.md`.
- Metadata và public copy dùng tiếng Anh, định hướng general audience, không gắn nhãn
  theo nhóm tuổi.

## Nguyên tắc nội dung đang áp dụng

- Mỗi bước là một nét đơn liên tục; không gom nhiều chi tiết vào một stroke.
- Mỗi hình có 5–10 nét và phải nhận diện nhanh.
- Video dọc 1080×1920, dài 29 giây, có voice, subtitle và thumbnail.
- Hook “Can you draw…” tự chia hai dòng để không bị khuất hai bên trên YouTube mobile.
- Tiêu đề, mô tả và tag dùng tiếng Anh nhất quán.
- Audience trên YouTube được đặt thủ công là `No, it's not made for kids`.

## Kết quả kiểm chứng hiện tại

- `npm run typecheck`: đạt, không lỗi TypeScript strict.
- `npm test`: 5 test files, 42/42 tests đạt.
- Validator chặn stroke phức tạp, semantic group, sai số nét và chi tiết ngoài safe area.
- Pipeline và QC độc lập đạt cho Turtle 11 và Elephant 12.
- Cả 12 MP4 upload-ready đã được đối chiếu với bản render trước khi xóa
  `output/shorts/`.
- Turtle và Elephant đã được review trực quan ở final frame và thumbnail.
- Elephant đã được chỉnh lại vòi/ngà để không chạm vùng chữ kết quả.

## Artifact được lưu trong Git

- Drawing source: `data/drawings/*.json`
- Drawing factories: `src/drawing/*.ts`
- Pipeline, validator, SVG/thumbnail/metadata engines: `src/`
- Publishing sheets và upload tracker: `docs/publishing/`
- Brand guide, strategy và page copy: `docs/`
- Logo/banner source: `assets/branding/`

## Việc tiếp theo

1. Upload video 11 Turtle và video 12 Elephant lên YouTube.
2. Cập nhật tracker sau mỗi lần đăng lên YouTube, TikTok, Facebook hoặc Instagram.
3. Theo dõi dữ liệu 10 video đầu để chọn nhóm con vật nên sản xuất tiếp.
4. Tiếp tục duy trì kho dự trữ và lịch đăng bền vững.
