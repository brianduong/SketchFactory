# Trạng thái SketchFactory

Cập nhật: 2026-08-19 23:45 (Asia/Ho_Chi_Minh)

Nội dung đang phát hành là **bản v2 vẽ nét thuần**: bỏ toàn bộ màu tô, giọng đọc chuyển
sang Kokoro `af_bella` speed 0.85. 22 video bản v1 còn tô màu đã chuyển Unlisted.

Ngày 2026-08-11 thêm 5 video mới (23–27) và đổi nhịp đăng thành **hai ngày một video**.
OAuth đã cấp lại chiều cùng ngày; **23–26 đã upload** ở chế độ Private kèm lịch tự công
khai 13, 15, 17 và 19 tháng 8.

Ngày 2026-08-14 thêm **Squirrel 28**, render xong và QC đạt. Cùng ngày **upload Koala 27
và Squirrel 28** ở chế độ Private kèm lịch tự công khai 21-08 và 23-08; cả 28 video giờ
đều đã nằm trên kênh.

Đối chiếu API ngày 2026-08-14: **23 video đã Public** (01–23), 5 video còn lại (24–28)
vẫn Private và sẽ tự công khai theo lịch 15, 17, 19, 21 và 23 tháng 8.

Đêm 2026-08-14 sản xuất thêm **23 video mới (29–51)**, làm trọn nhóm con vật "chắc ăn":
nai, rắn, sứa, dơi, hồng hạc, tê giác, gà trống, nhím, sao biển, sâu, kiến, cá sấu,
chuột túi, thiên nga, kỳ lân, lạc đà không bướu, toucan, nhện, lạc đà, stegosaurus,
T-rex, ngựa vằn, ngựa. Tất cả **giữ ở local, chưa upload** — người dùng nói sẽ đưa lên
sau. Kênh vẫn đúng 28 video.

Toàn bộ code và artifact của đợt này đã **merge vào `main`** (fast-forward, commit
`410834d`) và push lên `origin/main` ngày 2026-08-15.

Ngày 2026-08-19 sản xuất thêm **10 video mới (52–61)**: cá ngựa, công, bọ rùa, chuồn
chuồn, bọ cạp, cá nóc, thú mỏ vịt, lười, hải ly, hải mã. Chọn theo **dáng hình còn
trống** chứ không theo số nét — tua fan, thân gai, mỏ dẹt, tư thế treo, đuôi bè, ngà.
Cả 10 đều QC `passed`, 29 giây, 1080×1920.

**Chưa upload được video nào.** Refresh token OAuth đã hết hạn (`invalid_grant`) đúng
như dự đoán mốc 2026-08-18; phải nhờ người dùng chạy `npm run youtube:auth`. Hàng đợi
chờ upload giờ là **33 video (29–61)**, quota ~4 video/ngày nên cần khoảng 9 ngày.

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
| Bộ video upload-ready | ✅ 61 video | `output/upload-ready/01-cat.mp4` đến `61-walrus.mp4` |
| Theo dõi đa nền tảng | ✅ Hoàn thành | `docs/publishing/upload-tracker.md` |
| Trạng thái publishing có cấu trúc | ✅ Hoàn thành | `data/publishing-state.json` |
| YouTube uploader | ✅ Hoạt động khi được yêu cầu | OAuth + upload + caption + API verification |
| Google Drive archive | 📝 Đã định nghĩa quy trình | `docs/publishing/operations.md` |

## Danh mục 61 video

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
| 13 | Lion | 9 | `13-lion.mp4` | ✅ Public — `LoD45Gl_h6o` |
| 14 | Monkey | 9 | `14-monkey.mp4` | ✅ Public — `AZ0_u--w9pk` |
| 15 | Owl | 10 | `15-owl.mp4` | ✅ Public — `Vjkmz43mL8M` |
| 16 | Penguin | 9 | `16-penguin.mp4` | ✅ Public — `pP2sOsi4Vwo` |
| 17 | Duck | 8 | `17-duck.mp4` | ✅ Public — `-wBSaSOMguQ` |
| 18 | Mouse | 9 | `18-mouse.mp4` | ✅ Public — `_hSpAiOlTcA` |
| 19 | Sheep | 9 | `19-sheep.mp4` | ✅ Public — `oZUi5ZOdWeA` |
| 20 | Giraffe | 10 | `20-giraffe.mp4` | ✅ Public — `zG9SSaV6omY` |
| 21 | Whale | 9 | `21-whale.mp4` | ✅ Public — `J6203iAHXos` |
| 22 | Bee | 10 | `22-bee.mp4` | ✅ Public — `LymfnoWAFUs` |
| 23 | Snail | 9 | `23-snail.mp4` | ✅ Public — `KgFSmhYfrlc` |
| 24 | Crab | 10 | `24-crab.mp4` | 🕗 Hẹn 15-08 20:00 — `FiaWryl-8AY` |
| 25 | Butterfly | 9 | `25-butterfly.mp4` | 🕗 Hẹn 17-08 20:00 — `8LUXVBkL87g` |
| 26 | Octopus | 10 | `26-octopus.mp4` | 🕗 Hẹn 19-08 20:00 — `gsxj9EtAXDA` |
| 27 | Koala | 7 | `27-koala.mp4` | 🕗 Hẹn 21-08 20:00 — `qQDm6Yd4Zd8` |
| 28 | Squirrel | 9 | `28-squirrel.mp4` | 🕗 Hẹn 23-08 20:00 — `JwvdYcgdhSo` |
| 29 | Deer | 10 | `29-deer.mp4` | ⏳ Chưa upload — dự kiến 25-08 20:00 |
| 30 | Snake | 7 | `30-snake.mp4` | ⏳ Chưa upload — dự kiến 27-08 20:00 |
| 31 | Jellyfish | 10 | `31-jellyfish.mp4` | ⏳ Chưa upload — dự kiến 29-08 20:00 |
| 32 | Bat | 8 | `32-bat.mp4` | ⏳ Chưa upload — dự kiến 31-08 20:00 |
| 33 | Flamingo | 8 | `33-flamingo.mp4` | ⏳ Chưa upload — dự kiến 02-09 20:00 |
| 34 | Rhino | 9 | `34-rhino.mp4` | ⏳ Chưa upload — dự kiến 04-09 20:00 |
| 35 | Rooster | 10 | `35-rooster.mp4` | ⏳ Chưa upload — dự kiến 06-09 20:00 |
| 36 | Hedgehog | 6 | `36-hedgehog.mp4` | ⏳ Chưa upload — dự kiến 08-09 20:00 |
| 37 | Starfish | 9 | `37-starfish.mp4` | ⏳ Chưa upload — dự kiến 10-09 20:00 |
| 38 | Caterpillar | 10 | `38-caterpillar.mp4` | ⏳ Chưa upload — dự kiến 12-09 20:00 |
| 39 | Ant | 10 | `39-ant.mp4` | ⏳ Chưa upload — dự kiến 14-09 20:00 |
| 40 | Crocodile | 9 | `40-crocodile.mp4` | ⏳ Chưa upload — dự kiến 16-09 20:00 |
| 41 | Kangaroo | 9 | `41-kangaroo.mp4` | ⏳ Chưa upload — dự kiến 18-09 20:00 |
| 42 | Swan | 8 | `42-swan.mp4` | ⏳ Chưa upload — dự kiến 20-09 20:00 |
| 43 | Unicorn | 9 | `43-unicorn.mp4` | ⏳ Chưa upload — dự kiến 22-09 20:00 |
| 44 | Llama | 10 | `44-llama.mp4` | ⏳ Chưa upload — dự kiến 24-09 20:00 |
| 45 | Toucan | 8 | `45-toucan.mp4` | ⏳ Chưa upload — dự kiến 26-09 20:00 |
| 46 | Spider | 8 | `46-spider.mp4` | ⏳ Chưa upload — dự kiến 28-09 20:00 |
| 47 | Camel | 10 | `47-camel.mp4` | ⏳ Chưa upload — dự kiến 30-09 20:00 |
| 48 | Stegosaurus | 8 | `48-stegosaurus.mp4` | ⏳ Chưa upload — dự kiến 02-10 20:00 |
| 49 | T-Rex | 8 | `49-trex.mp4` | ⏳ Chưa upload — dự kiến 04-10 20:00 |
| 50 | Zebra | 10 | `50-zebra.mp4` | ⏳ Chưa upload — dự kiến 06-10 20:00 |
| 51 | Horse | 10 | `51-horse.mp4` | ⏳ Chưa upload — dự kiến 08-10 20:00 |
| 52 | Seahorse | 10 | `52-seahorse.mp4` | ⏳ Chưa upload — dự kiến 10-10 20:00 |
| 53 | Peacock | 10 | `53-peacock.mp4` | ⏳ Chưa upload — dự kiến 12-10 20:00 |
| 54 | Ladybug | 9 | `54-ladybug.mp4` | ⏳ Chưa upload — dự kiến 14-10 20:00 |
| 55 | Dragonfly | 9 | `55-dragonfly.mp4` | ⏳ Chưa upload — dự kiến 16-10 20:00 |
| 56 | Scorpion | 8 | `56-scorpion.mp4` | ⏳ Chưa upload — dự kiến 18-10 20:00 |
| 57 | Pufferfish | 6 | `57-pufferfish.mp4` | ⏳ Chưa upload — dự kiến 20-10 20:00 |
| 58 | Platypus | 8 | `58-platypus.mp4` | ⏳ Chưa upload — dự kiến 22-10 20:00 |
| 59 | Sloth | 9 | `59-sloth.mp4` | ⏳ Chưa upload — dự kiến 24-10 20:00 |
| 60 | Beaver | 10 | `60-beaver.mp4` | ⏳ Chưa upload — dự kiến 26-10 20:00 |
| 61 | Walrus | 9 | `61-walrus.mp4` | ⏳ Chưa upload — dự kiến 28-10 20:00 |

Toàn bộ 28 video bản v2 đã nằm trên kênh `Simple Sketch`. Xác minh qua YouTube Data API
ngày 2026-08-14: video 01–23 đã Public (13–22 tự lên đúng lịch mỗi ngày 02/08–11/08,
Snail 23 lên tối 13/08), video 24–28 còn Private kèm `publishAt` cách hai ngày một video.

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

- Video dùng để đăng nằm tại `output/upload-ready/` và có prefix `01`–`51`.
- `output/shorts/` chứa bản render mới nhất; `upload-ready/` là bản đã chép để upload.
- File sinh trong `output/` bị ignore khỏi Git và có thể tái tạo từ JSON nguồn.
- Upload sheet nằm tại `docs/publishing/`; mỗi file ghi số video và trạng thái riêng
  cho YouTube, TikTok, Facebook và Instagram.
- Bảng tổng: `docs/publishing/upload-tracker.md`.
- Trạng thái máy đọc được: `data/publishing-state.json`; số video tiếp theo là `52`.
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
- `npm test`: 5 test files, 135/135 tests đạt.
- Video 23–28: pipeline chạy đủ stage, QC đạt 0 issue, đều 1080×1920, 29 giây, h264 + aac.
- Video 29–51 đều review trên PNG nền trắng trước khi render. Ba ca khó: con nhện không
  đủ 10 nét cho thân + 8 chân + mắt nên mỗi nét vẽ thành một đường vòng qua thân thành
  hai chân (4 nét ra 8 chân); con lạc đà bị bướu lùn vì đường bậc hai `Q` không chạm điểm
  điều khiển, phải đổi sang bậc ba `C`; ngựa vằn và ngựa suýt đụng kỳ lân nên tách thành
  đầu chính diện có sọc và nguyên con nhìn nghiêng.
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
  sau 7 ngày, **hạn khoảng 2026-08-18**. Muốn upload 29–51 sau mốc đó thì phải chạy lại
  `npm run youtube:auth` (cần bấm xác nhận trong trình duyệt). Nên chuyển app sang Published.
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

1. **Cấp lại OAuth rồi upload 33 video 29–61.** Người dùng đã yêu cầu upload nối tiếp
   từ số 29 (quyết định 2026-08-19). Đang kẹt ở `invalid_grant`, cần chạy
   `npm run youtube:auth`. MP4 đã sẵn ở `output/upload-ready/`. Quota chỉ đủ ~4
   video/ngày (2.050 đơn vị/video, reset 14:00 giờ VN) nên cần khoảng 9 ngày. Ngày
   trong tracker mới là dự kiến, chưa đặt `publishAt` nào.
2. Chạy `npm run youtube:playlist -- --apply` khi có quota để thêm 28 video vào playlist.
3. Theo dõi lịch tự công khai 24–28 (15, 17, 19, 21, 23 tháng 8) và cập nhật tracker sau mỗi mốc.
4. Cân nhắc thiết kế lại Whale 21: silhouette hiện tại vẫn gần với Fish 10.
5. Sau 61 con, kho silhouette động vật đã rất chật. Đợt 52–61 phải sửa nhiều vòng preview (bọ cạp 5 vòng, hải ly 3 vòng). Đợt sau nên tính tới đổi chủ đề; chỉ upload khi người dùng yêu cầu.
6. Cập nhật tracker sau mỗi lần đăng lên YouTube, TikTok, Facebook hoặc Instagram.
7. Archive MP4 lên Google Drive theo checksum trước khi xóa local.
