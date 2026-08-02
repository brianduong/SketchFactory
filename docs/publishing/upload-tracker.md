# SketchFactory — Upload Tracker

Updated: 2026-08-02 15:05 (Asia/Ho_Chi_Minh) — đối chiếu trực tiếp với YouTube Data API

Nội dung đang phát hành là **bản v2 vẽ nét thuần**, upload ngày 2026-08-02. Bản v1 còn
tô màu đã chuyển Unlisted, không còn hiện trên kênh.

## Status Guide

- `[x]` Uploaded
- `[ ]` Not uploaded yet
- This tracker records uploads only; it does not mean the video is already Public.

| No. | Animal | YouTube | Visibility | Video ID | TikTok | Facebook | Instagram | Storage | Publishing info |
|---:|---|:---:|---|---|:---:|:---:|:---:|---|---|
| 01 | Cat | [x] | Public | `O4RkgkWIPbE` | [ ] | [ ] | [ ] | Local | [Open](animal-cat-001.md) |
| 02 | Dog | [x] | Public | `hiUp_b8d920` | [ ] | [ ] | [ ] | Local | [Open](animal-dog-001.md) |
| 03 | Rabbit | [x] | Public | `HgEQAsTIlIE` | [ ] | [ ] | [ ] | Local | [Open](animal-rabbit-001.md) |
| 04 | Bear | [x] | Public | `kNk7At4sqXg` | [ ] | [ ] | [ ] | Local | [Open](animal-bear-001.md) |
| 05 | Fox | [x] | Public | `H8IfhyMZcmY` | [ ] | [ ] | [ ] | Local | [Open](animal-fox-001.md) |
| 06 | Panda | [x] | Public | `Zy82wobJ6w4` | [ ] | [ ] | [ ] | Local | [Open](animal-panda-001.md) |
| 07 | Pig | [x] | Public | `N3zTaQAQZ7s` | [ ] | [ ] | [ ] | Local | [Open](animal-pig-001.md) |
| 08 | Cow | [x] | Public | `vH-yIqPOcXg` | [ ] | [ ] | [ ] | Local | [Open](animal-cow-001.md) |
| 09 | Frog | [x] | Public | `7p5AIE9tPUo` | [ ] | [ ] | [ ] | Local | [Open](animal-frog-001.md) |
| 10 | Fish | [x] | Public | `LT8x5E-zxGI` | [ ] | [ ] | [ ] | Local | [Open](animal-fish-001.md) |
| 11 | Turtle | [x] | Public | `SFgzoLwCkPQ` | [ ] | [ ] | [ ] | Local | [Open](11-animal-turtle-001.md) |
| 12 | Elephant | [x] | Public | `qsPrsEtp54E` | [ ] | [ ] | [ ] | Local | [Open](12-animal-elephant-001.md) |
| 13 | Lion | [x] | Scheduled 02-08 20:00 | `LoD45Gl_h6o` | [ ] | [ ] | [ ] | Local | [Open](13-animal-lion-001.md) |
| 14 | Monkey | [x] | Scheduled 03-08 20:00 | `AZ0_u--w9pk` | [ ] | [ ] | [ ] | Local | [Open](14-animal-monkey-001.md) |
| 15 | Owl | [x] | Scheduled 04-08 20:00 | `Vjkmz43mL8M` | [ ] | [ ] | [ ] | Local | [Open](15-animal-owl-001.md) |
| 16 | Penguin | [x] | Scheduled 05-08 20:00 | `pP2sOsi4Vwo` | [ ] | [ ] | [ ] | Local | [Open](16-animal-penguin-001.md) |
| 17 | Duck | [x] | Scheduled 06-08 20:00 | `-wBSaSOMguQ` | [ ] | [ ] | [ ] | Local | [Open](17-animal-duck-001.md) |
| 18 | Mouse | [x] | Scheduled 07-08 20:00 | `_hSpAiOlTcA` | [ ] | [ ] | [ ] | Local | [Open](18-animal-mouse-001.md) |
| 19 | Sheep | [x] | Scheduled 08-08 20:00 | `oZUi5ZOdWeA` | [ ] | [ ] | [ ] | Local | [Open](19-animal-sheep-001.md) |
| 20 | Giraffe | [x] | Scheduled 09-08 20:00 | `zG9SSaV6omY` | [ ] | [ ] | [ ] | Local | [Open](20-animal-giraffe-001.md) |
| 21 | Whale | [x] | Scheduled 10-08 20:00 | `J6203iAHXos` | [ ] | [ ] | [ ] | Local | [Open](21-animal-whale-001.md) |
| 22 | Bee | [x] | Scheduled 11-08 20:00 | `LymfnoWAFUs` | [ ] | [ ] | [ ] | Local | [Open](22-animal-bee-001.md) |

## Current Totals

- YouTube: 22/22 uploaded — 12 Public, 10 Private có lịch tự công khai
- TikTok: 0/22 marked
- Facebook: 0/22 marked
- Instagram: 0/22 marked

## Lịch phát hành 13–22

YouTube tự chuyển sang Public đúng 20:00 (Asia/Ho_Chi_Minh) mỗi ngày, mỗi ngày một video.

| Ngày công khai (giờ VN) | Video |
|---|---|
| 02-08 20:00 | 13 Lion |
| 03-08 20:00 | 14 Monkey |
| 04-08 20:00 | 15 Owl |
| 05-08 20:00 | 16 Penguin |
| 06-08 20:00 | 17 Duck |
| 07-08 20:00 | 18 Mouse |
| 08-08 20:00 | 19 Sheep |
| 09-08 20:00 | 20 Giraffe |
| 10-08 20:00 | 21 Whale |
| 11-08 20:00 | 22 Bee |

## Bản v1 còn tô màu

22 video bản cũ đã chuyển **Unlisted** ngày 2026-08-02, không xóa. View và bình luận vẫn
còn, vẫn xem được qua link trực tiếp. ID lưu tại
`.secrets/youtube-archive-color-version.json`, MP4 và drawing JSON cũ nằm ngoài repo.

## Việc còn treo

- Playlist `Simple Drawing Tutorials` (`PLS5I18k91_u4`) hiện **trống**: 22 bản cũ đã bị
  gỡ nhưng 22 bản mới chưa kịp thêm vì hết quota. Chạy `npm run youtube:playlist -- --apply`.
- Mỗi video mới có 2 track phụ đề, chưa xác minh được `trackKind`.

Next new video number: **23**

Archive procedure: [Publishing operations](operations.md#google-drive-archive-rule)
