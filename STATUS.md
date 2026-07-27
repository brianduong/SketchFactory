# Trạng thái SketchFactory

Cập nhật: 2026-07-27 10:03 (Asia/Ho_Chi_Minh)

## Tổng quan

| Giai đoạn | Trạng thái | Bằng chứng |
|---|---|---|
| Khảo sát workspace | ✅ Hoàn thành | Project mới ban đầu rỗng |
| Khảo sát One Small Thing | ✅ Hoàn thành, chỉ đọc | `docs/reuse-from-one-small-thing.md` |
| Thiết kế kiến trúc | ✅ Hoàn thành | `docs/architecture.md` |
| Chuẩn hóa ngôn ngữ vẽ | ✅ Hoàn thành | `docs/drawing-language.md` |
| Khởi tạo TypeScript/CLI | ✅ Hoàn thành | `npm run typecheck` đạt |
| MVP con mèo | ✅ Hoàn thành | QC report đạt, video đã đo bằng ffprobe |
| Nhận diện page | ✅ Hoàn thành | Logo, YouTube banner, Facebook cover và page copy |

## Artifact MVP

| Artifact | Kết quả |
|---|---|
| JSON nguồn | `data/drawings/animal-cat-001.json` |
| SVG đầy đủ/layered | `output/drawings/animal-cat-001/` |
| PNG trong suốt/trắng | `output/drawings/animal-cat-001/` |
| Voice WAV | `output/audio/animal-cat-001.wav` |
| Subtitle SRT | `output/subtitles/animal-cat-001.srt` |
| Shorts | `output/shorts/animal-cat-001.mp4` |
| Thumbnail SVG/PNG | `output/thumbnails/` |
| Metadata | `output/reports/animal-cat-001-metadata.json` |
| QC | `output/reports/animal-cat-001-qc.json` |
| Resume manifest | `output/manifests/animal-cat-001.json` |

`output/` bị ignore khỏi Git và có thể tái tạo từ JSON nguồn.

## Kết quả kiểm chứng

- `npm run typecheck`: đạt, không lỗi TypeScript strict.
- `npm test`: 3 test files, 7 tests đạt.
- `npm run validate -- --id animal-cat-001`: `QC đạt`.
- `npm run list`: `animal-cat-001 / generated / 8 strokes / Cat`.
- QC artifact: 10/10 file bắt buộc tồn tại và không rỗng.
- ffprobe: H.264 1080×1920, 30 fps; AAC 48 kHz; đúng 29.000 giây.
- Phần vẽ kéo dài 18,8 giây (từ giây 3,0 đến 21,8), thay cho khoảng 7,8 giây bản đầu.
- Mỗi nét dùng 1,2–2,5 giây và có khoảng nghỉ ngắn giữa các hành động để học theo.
- Review contact sheet tại 4s/7s/12s/17s/21s/24s/27s: nhịp nét, subtitle, khung an
  toàn, thời gian giữ kết quả và CTA đều đạt.
- Chạy pipeline lần hai: toàn bộ 9 stage được skip, không sinh dữ liệu trùng lặp.

## Sự cố đã phát hiện và sửa

1. FFmpeg không ghi được WAV do thiếu thư mục cha: provider giờ tự tạo parent output.
2. Bản FFmpeg hiện tại không có filter libass `subtitles`: renderer chuyển sang SVG/PNG
   subtitle overlay theo cue, đồng thời vẫn xuất SRT độc lập.
3. Manifest có pipeline version trong checksum để thay đổi renderer không dùng nhầm
   artifact cũ.
4. Bản đầu vẽ quá nhanh để học theo: timeline 001 đã tăng lên 29 giây, riêng phần vẽ
   tăng lên 18,8 giây và có test chống giảm tốc độ ngoài ý muốn.

## Trạng thái nội dung

`animal-cat-001` đang là `generated`, chưa phải `approved`. Không có publishing adapter
hoạt động và không nội dung nào được đăng tự động.

## Bộ nhận diện page

- Logo SVG/PNG: 1000×1000.
- YouTube banner SVG/PNG: 2560×1440; nội dung chính đã kiểm tra trong safe area
  1546×423.
- Facebook cover SVG/PNG: 1640×624; chừa vùng avatar/UI bên trái.
- Tagline: `Draw anything. The simple way.`
- Bio, mô tả Facebook, YouTube, TikTok/Instagram và welcome post:
  `docs/page-description.md`.
- Quy chuẩn màu, typography và sử dụng: `docs/brand-guide.md`.

## Giới hạn có chủ ý của MVP 0.1

- Animation là fade-in mượt cho từng semantic stroke; chưa mô phỏng đầu bút chạy dọc path.
- Voice macOS `say` dùng để chứng minh pipeline; chưa phải voice production cuối.
- Chưa có batch, collection/video dài, database hay publishing.
- Nhận diện trong 1–2 giây đã review nội bộ qua frame; test với nhiều người vẫn cần làm
  trước khi chuyển sang `approved`.
