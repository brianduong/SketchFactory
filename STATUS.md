# Trạng thái SketchFactory

Cập nhật: 2026-07-27 09:34 (Asia/Ho_Chi_Minh)

## Tổng quan

| Giai đoạn | Trạng thái | Bằng chứng |
|---|---|---|
| Khảo sát workspace | ✅ Hoàn thành | Project mới ban đầu rỗng |
| Khảo sát One Small Thing | ✅ Hoàn thành, chỉ đọc | `docs/reuse-from-one-small-thing.md` |
| Thiết kế kiến trúc | ✅ Hoàn thành | `docs/architecture.md` |
| Chuẩn hóa ngôn ngữ vẽ | ✅ Hoàn thành | `docs/drawing-language.md` |
| Khởi tạo TypeScript/CLI | ✅ Hoàn thành | `npm run typecheck` đạt |
| MVP con mèo | ✅ Hoàn thành | QC report đạt, video đã đo bằng ffprobe |

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
- `npm test`: 3 test files, 6 tests đạt.
- `npm run validate -- --id animal-cat-001`: `QC đạt`.
- `npm run list`: `animal-cat-001 / generated / 8 strokes / Cat`.
- QC artifact: 10/10 file bắt buộc tồn tại và không rỗng.
- ffprobe: H.264 1080×1920, 30 fps; AAC 48 kHz; đúng 20.000 giây.
- Review frame 1s/7s/13s/17s: thứ tự nét, subtitle, khung an toàn và frame cuối đạt.
- Chạy pipeline lần hai: toàn bộ 9 stage được skip, không sinh dữ liệu trùng lặp.

## Sự cố đã phát hiện và sửa

1. FFmpeg không ghi được WAV do thiếu thư mục cha: provider giờ tự tạo parent output.
2. Bản FFmpeg hiện tại không có filter libass `subtitles`: renderer chuyển sang SVG/PNG
   subtitle overlay theo cue, đồng thời vẫn xuất SRT độc lập.
3. Manifest có pipeline version trong checksum để thay đổi renderer không dùng nhầm
   artifact cũ.

## Trạng thái nội dung

`animal-cat-001` đang là `generated`, chưa phải `approved`. Không có publishing adapter
hoạt động và không nội dung nào được đăng tự động.

## Giới hạn có chủ ý của MVP 0.1

- Animation là fade-in mượt cho từng semantic stroke; chưa mô phỏng đầu bút chạy dọc path.
- Voice macOS `say` dùng để chứng minh pipeline; chưa phải voice production cuối.
- Chưa có batch, collection/video dài, database hay publishing.
- Nhận diện trong 1–2 giây đã review nội bộ qua frame; test với nhiều người vẫn cần làm
  trước khi chuyển sang `approved`.
