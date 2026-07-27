# Roadmap

## Tóm tắt hiểu biết

SketchFactory phải trở thành một nhà máy nội dung dựa trên thư viện hình tối giản,
không phải bộ script tạo video rời rạc. Dữ liệu vector có cấu trúc là tài sản cốt lõi;
video Shorts chỉ là một trong nhiều đầu ra. Đối tượng phải dễ nhận ra, dễ vẽ lại, nhất
quán và an toàn thương mại.

## MVP 0.1 — con mèo

Đầu ra bắt buộc:

1. JSON chuẩn cho `animal-cat-001`.
2. SVG hoàn chỉnh và SVG giữ từng stroke có id.
3. PNG nền trong suốt và nền trắng.
4. Animation từng nét trong video.
5. Voice tiếng Anh qua provider.
6. Subtitle SRT đồng bộ.
7. Shorts 1080×1920.
8. Thumbnail.
9. Metadata YouTube/caption.
10. Báo cáo QC JSON.

CLI: `create`, `render:short`, `validate`, `list`. Không triển khai batch, long video
hay publishing trong 0.1.

## Danh sách file khởi tạo

- Cấu hình: `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`,
  `config/*.json`.
- Dữ liệu: `data/drawings/animal-cat-001.json`.
- Types/core: model, config, logger, external command, manifest, pipeline.
- Engines: drawing template, SVG, timeline, voice, subtitle, video, thumbnail,
  metadata, QC.
- CLI và test unit/integration nhẹ.
- Docs và `STATUS.md`.

## Kế hoạch theo bước

1. Khảo sát read-only và ghi ma trận reuse.
2. Chốt schema, drawing language, stage contract và cấu trúc output.
3. Khởi tạo TypeScript strict và CLI không framework nặng.
4. Tạo cat template, SVG/PNG và validator.
5. Tạo timeline, voice, subtitle, render video và thumbnail.
6. Tạo metadata, QC, manifest/idempotency.
7. Chạy typecheck, test và render thật; đo bằng ffprobe.
8. Review thủ công trước khi đổi trạng thái `approved`.

## Sau MVP

- 0.2: thêm 9 hình cùng category, JSON Schema/version migration, batch CLI.
- 0.3: collection và long video composer dùng lại Drawing.
- 0.4: provider TTS production, ASS subtitle, loudness normalization.
- 0.5: review workflow và publishing adapters có dry-run/idempotency key.
- 1.0: catalog ổn định, licensing registry, printable/export packages.

## Quyết định kỹ thuật còn cần đánh giá sau MVP

- SQLite khi số Drawing/collection khiến truy vấn filesystem khó quản lý.
- Piper native/service hay cloud TTS làm provider mặc định.
- Renderer stroke animation bằng FFmpeg layers hay headless vector renderer.
- Font thương mại chính thức sau khi hoàn tất kiểm tra license.
- Chính sách version/migration cho schema trước khi sản xuất hàng loạt.
