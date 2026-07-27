# SketchFactory

SketchFactory là pipeline local-first để biến một bản vẽ vector tối giản thành bộ tài
sản tái sử dụng: JSON, SVG, PNG, voice, subtitle, video dọc, thumbnail, metadata và báo
cáo chất lượng.

MVP hiện tập trung vào một đối tượng mẫu: `animal-cat-001`.

## Yêu cầu

- macOS
- Node.js 22+ và npm
- FFmpeg/ffprobe
- `rsvg-convert` (cài qua `brew install librsvg`)
- lệnh `say` của macOS cho voice mặc định; có thể thay bằng provider khác sau

## Bắt đầu

```bash
npm install
cp .env.example .env
npm test
npm run typecheck
npm run create -- --subject cat
```

Các lệnh chính:

```bash
npm run create -- --subject cat
npm run validate -- --id animal-cat-001
npm run render:short -- --id animal-cat-001
npm run list
```

`create` chạy pipeline đầy đủ và có thể chạy lại an toàn. Artifact được ghi vào
`output/` và không được commit. Pipeline bỏ qua stage đã thành công nếu input/config
không đổi; dùng `--force` để dựng lại.

## Trạng thái và tài liệu

- [STATUS.md](STATUS.md): tiến độ, cách kiểm chứng và giới hạn hiện tại.
- [docs/architecture.md](docs/architecture.md): kiến trúc và luồng dữ liệu.
- [docs/drawing-language.md](docs/drawing-language.md): ngôn ngữ vẽ thống nhất.
- [docs/content-strategy.md](docs/content-strategy.md): định vị và gate nội dung.
- [docs/reuse-from-one-small-thing.md](docs/reuse-from-one-small-thing.md): khảo sát tái sử dụng.
- [docs/roadmap.md](docs/roadmap.md): phạm vi MVP và lộ trình.

Không có lệnh publish trong MVP. Nội dung chỉ được publish khi trạng thái là
`approved` và publishing adapter được cấu hình rõ ràng ở giai đoạn sau.
