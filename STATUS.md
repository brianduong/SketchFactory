# Trạng thái SketchFactory

Cập nhật: 2026-08-14 21:55 (Asia/Ho_Chi_Minh)

Nội dung đang phát hành là **bản v2 vẽ nét thuần**: bỏ toàn bộ màu tô, giọng đọc chuyển
sang Kokoro `af_bella` speed 0.85. 22 video bản v1 còn tô màu đã chuyển Unlisted.

Ngày 2026-08-11 thêm 5 video mới (23–27) và đổi nhịp đăng thành **hai ngày một video**.
OAuth đã cấp lại chiều cùng ngày; **23–26 đã upload** ở chế độ Private kèm lịch tự công
khai 13, 15, 17 và 19 tháng 8.

Ngày 2026-08-14 thêm **Squirrel 28**, render xong và QC đạt. Cùng ngày **upload Koala 27
và Squirrel 28** ở chế độ Private kèm lịch tự công khai 21-08 và 23-08; cả 28 video giờ
đều đã nằm trên kênh.

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
| Bộ video upload-ready | ✅ 28 video | `output/upload-ready/01-cat.mp4` đến `28-squirrel.mp4` |
| Theo dõi đa nền tảng | ✅ Hoàn thành | `docs/publishing/upload-tracker.md` |
| Trạng thái publishing có cấu trúc | ✅ Hoàn thành | `data/publishing-state.json` |
| YouTube uploader | ✅ Hoạt động khi được yêu cầu | OAuth + upload + caption + API verification |
| Google Drive archive | 📝 Đã định nghĩa quy trình | `docs/publishing/operations.md` |

## Danh mục 28 video

| No. | Animal | Số nét | Video upload-ready | YouTube |
|---:|---|---:|---|:---:|
| 01 | Cat | 10 | `01-cat.mp4` | ✅ Public — `O4RkgkWIPbE` |
| 02 | Dog | 9 | `02-dog.mp4` | ✅ Public — `hiUp_b8d920` |
| 03 | Rabbit | 9 | `03-rabbit.mp4` | ✅ Public — `HgEQAsTIlIE` |
| 04 | Bear | 9 | `04-bear.mp4` | ✅ Public — `kNk7At4sqXg` |
| 05 | Fox | 9 | `05-fox.mp4` | ✅ Public — `H8IfhyMZcmY` |
| 06 | Panda | 10 | `06-panda.mp4` | ✅ Public — `Zy82wobJ6w4` |
| 07 | Pig | 9 | `07-pig.mp4` | ✅ Public — `N3zTaQAQZ7s` |
| 08 | Cow | 10 | `08-cow.mp4` | ✅ Public — `vH-yIqPOcXg` |
| 09 | Frog | 8 | `09-frog.mp4` | ✅ Public — `7p5AIE9tPUo` |
| 10 | Fish | 9 | `10-fish.mp4` | ✅ Public — `LT8x5E-zxGI` |
| 11 | Turtle | 9 | `11-turtle.mp4` | ✅ Public — `SFgzoLwCkPQ` |
| 12 | Elephant | 10 | `12-elephant.mp4` | ✅ Public — `qsPrsEtp54E` |
| 13 | Lion | 9 | `13-lion.mp4` | 🕗 Hẹn 02-08 20:00 — `LoD45Gl_h6o` |
| 14 | Monkey | 9 | `14-monkey.mp4` | 🕗 Hẹn 03-08 20:00 — `AZ0_u--w9pk` |
| 15 | Owl | 10 | `15-owl.mp4` | 🕗 Hẹn 04-08 20:00 — `Vjkmz43mL8M` |
| 16 | Penguin | 9 | `16-penguin.mp4` | 🕗 Hẹn 05-08 20:00 — `pP2sOsi4Vwo` |
| 17 | Duck | 8 | `17-duck.mp4` | 🕗 Hẹn 06-08 20:00 — `-wBSaSOMguQ` |
| 18 | Mouse | 9 | `18-mouse.mp4` | 🕗 Hẹn 07-08 20:00 — `_hSpAiOlTcA` |
| 19 | Sheep | 9 | `19-sheep.mp4` | 🕗 Hẹn 08-08 20:00 — `oZUi5ZOdWeA` |
| 20 | Giraffe | 10 | `20-giraffe.mp4` | 🕗 Hẹn 09-08 20:00 — `zG9SSaV6omY` |
| 21 | Whale | 9 | `21-whale.mp4` | 🕗 Hẹn 10-08 20:00 — `J6203iAHXos` |
| 22 | Bee | 10 | `22-bee.mp4` | 🕗 Hẹn 11-08 20:00 — `LymfnoWAFUs` |
| 23 | Snail | 9 | `23-snail.mp4` | 🕗 Hẹn 13-08 20:00 — `KgFSmhYfrlc` |
| 24 | Crab | 10 | `24-crab.mp4` | 🕗 Hẹn 15-08 20:00 — `FiaWryl-8AY` |
| 25 | Butterfly | 9 | `25-butterfly.mp4` | 🕗 Hẹn 17-08 20:00 — `8LUXVBkL87g` |
| 26 | Octopus | 10 | `26-octopus.mp4` | 🕗 Hẹn 19-08 20:00 — `gsxj9EtAXDA` |
| 27 | Koala | 7 | `27-koala.mp4` | 🕗 Hẹn 21-08 20:00 — `qQDm6Yd4Zd8` |
| 28 | Squirrel | 9 | `28-squirrel.mp4` | 🕗 Hẹn 23-08 20:00 — `JwvdYcgdhSo` |

Toàn bộ 22 video bản v2 đã nằm trên kênh `Simple Sketch`, xác minh trực tiếp qua YouTube
Data API ngày 2026-08-02: 12 video đầu Public, 10 video 13–22 Private kèm `publishAt` để
tự công khai lúc 20:00 giờ VN mỗi ngày, từ 02/08 đến 11/08.

Video 23–26 upload ngày 2026-08-11, xác minh lại qua API: cả 4 đều `private`, đúng
`publishAt`, `madeForKids=false`, `uploadStatus=processed`, category 26 và ngôn ngữ `en`.

22 video bản v1 còn tô màu đã chuyển **Unlisted**, không xóa, ID lưu tại
`.secrets/youtube-archive-color-version.json`. Receipt của bản v1 giữ ở
`.secrets/youtube-uploads-color-version.json`.

Uploader hỗ trợ đặt lịch qua `--publish-at` (RFC3339, UTC) và ghi lại
`scheduledPublishAt` vào `data/publishing-state.json`.

Giọng đọc dùng Kokoro chạy cục bộ (`src/voice/kokoro.ts`), voice `af_bella`, speed 0.85.
Model ONNX đã cache trên máy nên render không cần mạng.

Tài khoản TikTok đã tạo: `Simple Sketch` (`@simplesketchdraw`). TikTok được đăng thủ
công; phần tích hợp Developer API đã bỏ qua. TikTok, Facebook và Instagram chưa có
video nào được đánh dấu uploaded. Trạng thái chi tiết được duy trì đồng thời trong
bảng tổng và từng upload sheet.

## Quy ước file và publishing

- Video dùng để đăng nằm tại `output/upload-ready/` và có prefix `01`–`28`.
- `output/shorts/` chứa bản render mới nhất; `upload-ready/` là bản đã chép để upload.
- File sinh trong `output/` bị ignore khỏi Git và có thể tái tạo từ JSON nguồn.
- Upload sheet nằm tại `docs/publishing/`; mỗi file ghi số video và trạng thái riêng
  cho YouTube, TikTok, Facebook và Instagram.
- Bảng tổng: `docs/publishing/upload-tracker.md`.
- Trạng thái máy đọc được: `data/publishing-state.json`; số video tiếp theo là `29`.
- Nhịp đăng hiện tại: hai ngày một video lúc 20:00 giờ VN, ghi ở
  `data/publishing-state.json` → `youtube.publishCadence`.
- Upload sheet cho video mới sinh bằng `npx tsx scripts/publishing-sheet.ts --id <drawing-id>`
  để title/description/tag luôn khớp metadata pipeline.
- Chỉ upload khi người dùng yêu cầu rõ video; mặc định YouTube là `Private`.
- Quy trình vận hành và archive: `docs/publishing/operations.md`.
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
- `npm test`: 5 test files, 89/89 tests đạt.
- Video 23–28: pipeline chạy đủ stage, QC đạt 0 issue, đều 1080×1920, 29 giây, h264 + aac.
- Squirrel 28 đã review trên PNG nền trắng: đuôi phải sửa năm vòng (lưỡi liềm rời → chữ D
  → lá → cụp quá thấp) mới ra bó đuôi xù ôm lưng; tai tam giác bị đầu che thành tai mèo nên
  đổi lại tai bầu dục nhỏ nhô cao.
- 5 hình mới đã review trực quan trên PNG nền trắng. Snail phải dời vỏ và kéo dài cuống
  mắt vì mắt chen vào vỏ; Crab đổi càng bốn lần (tia sét → tai thỏ → nơ → lá) mới ra hình
  bầu dục có khe kìm; Koala nâng miệng lên cho khỏi dính viền đầu.
- Validator chặn stroke phức tạp, semantic group, sai số nét và chi tiết ngoài safe area.
- Test `keeps every declared bound around the real geometry` đối chiếu `bounds` với hình
  học thật của từng nét cho cả 22 drawing.
- Pipeline và QC độc lập đạt cho Turtle 11 và Elephant 12.
- Video 13–22: pipeline chạy đủ stage, QC đạt, đều 1080×1920, 29 giây, h264 + aac,
  0 issue.
- Cả 12 MP4 upload-ready đầu tiên đã được đối chiếu với bản render trước khi xóa
  `output/shorts/`.
- Turtle và Elephant đã được review trực quan ở final frame và thumbnail.
- Elephant đã được chỉnh lại vòi/ngà để không chạm vùng chữ kết quả.
- Cả 10 hình 13–22 đã được review trực quan trên bản PNG nền trắng. Monkey được chỉnh
  mắt/mũi/miệng cho nằm gọn trong mảng mặt, Duck được phóng to mỏ và đuôi, Whale được
  đổi thứ tự nét (bụng trước, vây sau), thêm khấc đuôi và tia nước cong.
- YouTube OAuth đã kết nối đúng kênh Simple Sketch.
- Video 11 và 12 đã upload Private; API xác nhận xử lý thành công, audience đúng và
  captions tiếng Anh tồn tại.
- Kênh đã xác minh số điện thoại ngày 2026-08-02; cả 22 video đã được gắn custom
  thumbnail từ `output/thumbnails/`, `thumbnails.set` trả về thành công 22/22.
- Video Frog bản v1 đã được sửa metadata từ Fox về Frog; bản v2 sinh metadata đúng ngay
  từ đầu.
- Bản v2: 22 hình đã bỏ hết màu tô, chỉ còn `#111111`, `#FFFDF7` và `none`. Ba lỗi nét
  vô hình (mắt penguin, mắt và túm lông sheep, đường bụng whale — trước đây trắng trên
  nền màu) đã sửa thành nét đen. Lời thoại bỏ các từ chỉ màu.
- Elephant được chỉnh lại: vòi buông giữa mặt xuống `y=855`, hai ngà dời ra `380–445` và
  `555–620` nên không còn nét cắt nhau.
- 22 hình bản v2 đã render PNG và review bằng mắt trước khi upload.
- Phụ đề: xác minh ngày 2026-08-14 trên video 27 và 28, mỗi video đúng 2 track —
  1 track `asr` của YouTube và 1 track `standard` do mình upload.
- Video 27 và 28 upload ngày 2026-08-14, API xác nhận `private`, đúng `publishAt`,
  `madeForKids=false`, `uploadStatus=processed`, category 26, ngôn ngữ `en`.
- Playlist `Simple Drawing Tutorials` (`PLS5I18k91_u4`) hiện **trống**: 22 bản v1 đã gỡ,
  bản v2 chưa thêm vì hết quota; nay là 28 video. Chạy `npm run youtube:playlist -- --apply`.
- OAuth cấp lại ngày 2026-08-11. Client còn ở trạng thái Testing nên refresh token chết
  sau 7 ngày, hạn kế tiếp khoảng 2026-08-18. Nên chuyển app sang Published.
- `recordPublishingState` trước đây không ghi `thumbnailSet` vào `data/publishing-state.json`
  nên trường này phải sửa tay; đã vá ngày 2026-08-11 và backfill cho video 23–26.
- `npm audit --omit=dev`: 0 vulnerabilities sau khi khóa phiên bản dependency an toàn.

## Artifact được lưu trong Git

- Drawing source: `data/drawings/*.json`
- Drawing factories: `src/drawing/*.ts`
- Pipeline, validator, SVG/thumbnail/metadata engines: `src/`
- Publishing sheets và upload tracker: `docs/publishing/`
- Publishing state: `data/publishing-state.json`
- Brand guide, strategy và page copy: `docs/`
- Logo/banner source: `assets/branding/`

## Việc tiếp theo

1. Chạy `npm run youtube:playlist -- --apply` khi có quota để thêm 28 video vào playlist.
2. Theo dõi lịch tự công khai 13–22 mỗi tối 20:00 và cập nhật tracker sau mỗi mốc.
3. Cân nhắc thiết kế lại Whale 21: silhouette hiện tại vẫn gần với Fish 10.
4. Tạo video mới với số bắt đầu từ 29 và chỉ upload khi người dùng yêu cầu.
5. Cập nhật tracker sau mỗi lần đăng lên YouTube, TikTok, Facebook hoặc Instagram.
6. Archive MP4 lên Google Drive theo checksum trước khi xóa local.
