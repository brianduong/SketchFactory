# Kiến trúc SketchFactory

## 1. Mục tiêu và ranh giới

SketchFactory là content factory, không phải trình vẽ tương tác. Một `Drawing`
được lưu dưới dạng dữ liệu có version và đi qua pipeline xác định để tạo mọi đầu ra.
MVP chạy local trên macOS, điều khiển bằng CLI, không cần UI, cloud hay database server.

Các nguyên tắc:

- Một nguồn dữ liệu chuẩn; không dựng lại nội dung riêng cho từng kênh.
- Stage nhỏ, đầu vào/đầu ra rõ, có thể kiểm thử và chạy lại.
- Adapter ở biên hệ thống cho TTS, render và publishing.
- Không có secret trong source; cấu hình nhạy cảm chỉ qua environment.
- Publishing nằm ngoài pipeline MVP và luôn cần `approved`.

## 2. Sơ đồ pipeline

```text
Subject + template + config
          |
          v
 Content Planner -----> Drawing JSON (canonical)
          |                      |
          v                      v
  Drawing Validator         SVG Engine
          |                  |       |
          |                  v       v
          |             full SVG   layered SVG
          |                  |       |
          |                  v       v
          |              PNG files  stroke layers
          |                              |
          v                              v
    Voice Script ----------------> Timeline Builder
          |                              |
          v                              v
   Voice Provider                  Animation Renderer
          |                              |
          v                              v
       WAV audio -----> Subtitle -----> FFmpeg Short
                                             |
               Metadata + Thumbnail + QC <---+
                                             |
                                      manual approval
                                             |
                                   Publishing Adapter (later)
```

Mỗi stage ghi kết quả và checksum vào `output/manifests/<drawing-id>.json`. Khi chạy
lại, stage có cùng checksum và đủ output sẽ được bỏ qua. Stage lỗi không xóa artifact
thành công của các stage trước.

## 3. Module

| Module | Trách nhiệm | Giao diện chính |
|---|---|---|
| Content Planner | Chọn template và tạo Drawing chuẩn | `plan(subject)` |
| Drawing Generator | Sinh/đọc stroke vector | `createDrawing()` |
| SVG Engine | SVG đầy đủ, layered SVG và stroke layer | `renderSvg(drawing)` |
| Drawing Validator | Luật canvas, nét, trạng thái, timeline | `validate(drawing)` |
| Animation Engine | Timeline và layer animation | `buildTimeline()` |
| Voice Engine | Chọn provider, sinh WAV | `VoiceProvider.synthesize()` |
| Subtitle Engine | Sinh SRT từ cue | `renderSrt()` |
| Audio Engine | Chuẩn hóa/ghép audio bằng FFmpeg | adapter command |
| Video Renderer | Ghép nền, stroke, voice, subtitle | `renderShort()` |
| Thumbnail Generator | Ảnh bìa từ SVG | `renderThumbnail()` |
| Metadata Generator | Tiêu đề, mô tả, tags, caption | `generateMetadata()` |
| Long Video Composer | Ghép Drawing đã có | sau MVP |
| Publishing Adapter | Upload theo nền tảng, gate approved | sau MVP |
| Quality Control | Kiểm tra data và artifact | `runQualityControl()` |

## 4. Luồng dữ liệu

`data/drawings/*.json` là dữ liệu nguồn được review. `output/` chỉ chứa sản phẩm có
thể tái tạo. Các type cốt lõi không phụ thuộc CLI hay provider. Config được merge theo
thứ tự: default JSON → config chuyên biệt → biến môi trường → cờ CLI.

Trạng thái hợp lệ:

```text
draft -> generated -> reviewed -> approved -> rendered -> published
  |          |           |           |
  +----------+-----------+----------> rejected
```

MVP có thể chuyển `draft` sang `generated` sau khi tạo đủ artifact. Việc chuyển sang
`reviewed`/`approved` là hành động có chủ ý của con người. Renderer không tự publish.

## 5. Cấu trúc thư mục

```text
.
├── assets/{fonts,music,sound-effects,branding,backgrounds}/
├── config/{default,voice,video,categories}.json
├── data/{drawings,collections,templates}/
├── docs/
├── output/{drawings,audio,subtitles,shorts,long-videos,thumbnails,reports,manifests}/
├── prompts/{drawing,script,metadata,quality-control}/
├── scripts/
├── src/
│   ├── cli/              # parsing và UX CLI
│   ├── core/             # pipeline, config, manifest
│   ├── drawing/          # template/generator
│   ├── svg/              # SVG serialization
│   ├── animation/        # timeline
│   ├── voice/            # interface/provider
│   ├── subtitle/
│   ├── video/
│   ├── thumbnail/
│   ├── metadata/
│   ├── quality-control/
│   ├── publishing/       # interface, chưa có implementation
│   ├── shared/
│   └── types/
└── tests/
```

## 6. Xử lý lỗi và log

CLI trả exit code khác 0, thông báo stage và nguyên nhân có thể hành động. External
command được gọi bằng argument array, không nội suy shell. Log có timestamp, level,
stage và drawing id. Không log environment hoặc secret.

## 7. Rủi ro

- Chất lượng TTS hệ thống khác nhau giữa máy: giảm thiểu bằng provider interface và
  lưu provider/voice trong manifest.
- Font subtitle không đồng nhất: MVP dùng font hệ thống và giữ subtitle dưới dạng SRT.
- Nhận diện hình là tiêu chí cảm nhận: QC tự động chỉ bắt lỗi hình học; vẫn cần review.
- Render animation theo nhiều layer có thể tăng thời gian: MVP chỉ có 8 nét; về sau
  benchmark trước khi chọn renderer khác.
- Tọa độ SVG và video khác tỷ lệ: dùng canvas chuẩn 1000×1000 và transform duy nhất.
