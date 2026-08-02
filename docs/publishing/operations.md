# SketchFactory Publishing Operations

Updated: 2026-08-02 11:22 (Asia/Ho_Chi_Minh)

## Source of Truth

- Machine-readable state: `data/publishing-state.json`
- Human tracker: `docs/publishing/upload-tracker.md`
- Per-video copy and checklist: `docs/publishing/<video>.md`
- Upload-ready MP4 files: `output/upload-ready/`
- YouTube OAuth credentials and receipts: `.secrets/` (local only, ignored by Git)

Whenever a platform upload succeeds, update all applicable state files in the same
task. Do not rely only on conversation history.

## Current Position

Đối chiếu trực tiếp với YouTube Data API ngày 2026-08-02.

- Nội dung đang phát hành: **bản v2 vẽ nét thuần**, giọng Kokoro `af_bella`
- Last generated video: 22
- Last YouTube upload: 22
- Next new video number: 23
- Videos 01–12: YouTube Public
- Videos 13–22: Private kèm lịch tự công khai 20:00 giờ VN mỗi ngày, 02/08 → 11/08
- Custom thumbnail: đã bật, cả 22 video đều dùng thumbnail riêng
- 22 video bản v1 tô màu: đã Unlisted, giữ lại để khôi phục nếu cần
- Kênh hiện có 44 video: 22 bản v2 hiển thị, 22 bản v1 ẩn
- Playlist đang trống, chờ chạy `npm run youtube:playlist -- --apply`
- Video 09 (Frog, `_j6SiVf0dvs`): nội dung đúng nhưng metadata đang là Fox
- TikTok account: `Simple Sketch` (`@simplesketchdraw`)
- TikTok upload mode: manual; the Developer API integration was skipped
- TikTok, Facebook and Instagram: no uploads marked

## TikTok Upload Rule

TikTok uploads are performed manually by the user. Prepare the numbered MP4 and
the TikTok caption from its publishing sheet. Mark TikTok as uploaded only after
the user confirms that the post was published.

## YouTube Upload Rule

Only upload when the user explicitly requests a specific video. Never upload or
publish based only on a schedule assumption.

**Nhịp đăng: đúng một video công khai mỗi ngày.** Render sẵn bao nhiêu cũng được, nhưng
mỗi lần upload phải để `Private` kèm `--publish-at` để rải mỗi ngày một video lúc 20:00
giờ VN. Không bao giờ để hai video cùng công khai trong một ngày, kể cả khi hàng đã sẵn.
Đây là lỗi đã mắc ngày 27/07/2026 khi 10 video đầu lên cùng lúc.

Default workflow:

1. Resolve the requested number against `data/publishing-state.json`.
2. Confirm the target channel is `Simple Sketch`
   (`UCAfBtu-doN3P_2q8nuRwXng`).
3. Validate the MP4, metadata, subtitle and thumbnail files.
4. Default to `Private` unless the user explicitly requests another visibility.
5. Set audience to `Not made for kids`, language to English (US), and category to
   Howto & Style.
6. Upload MP4, metadata and English captions.
7. Upload the custom thumbnail. Kênh đã xác minh số điện thoại ngày 2026-08-02 nên
   `thumbnails.set` hoạt động; nếu vẫn lỗi thì coi là cảnh báo, không chặn upload.
8. Verify the YouTube video ID, upload status, visibility, audience and captions by
   reading them back through the API.
9. Update the JSON state, tracker, upload sheet and `STATUS.md`.

Do not create a second upload when a local upload receipt already contains a YouTube
video ID. Resume missing thumbnail/caption steps instead.

## Thay nội dung một video đã đăng

YouTube **không cho thay file video** của một video đã tồn tại. Muốn đổi nội dung phải
đăng video mới rồi xử lý video cũ. Quy trình đã dùng khi thay bản v1 tô màu bằng bản v2
vẽ nét ngày 2026-08-02:

1. Lưu ID toàn bộ bản cũ vào `.secrets/youtube-archive-color-version.json`, và chuyển
   `youtube-uploads.json` sang `youtube-uploads-color-version.json` rồi reset về `{}`.
   Nếu không reset, uploader thấy receipt cũ sẽ bỏ qua bước upload.
2. Upload đủ bản mới **trước**. Không ẩn bản cũ sớm, để nếu hết quota giữa chừng thì kênh
   vẫn còn nội dung.
3. Ẩn theo cặp: bản mới của con nào lên xong thì ẩn bản cũ của con đó ngay.
4. Ẩn bằng `privacyStatus: unlisted`, không xóa. View, bình luận và lịch sử vẫn còn, và
   khôi phục được. Việc chuyển unlisted cũng hủy luôn `publishAt` của bản cũ.
5. Gỡ bản cũ khỏi playlist **và** thêm bản mới vào trong cùng một bước, nếu không playlist
   sẽ rỗng. Dùng `npm run youtube:playlist -- --apply`.

## Quota YouTube

Hạn mức tính theo ngày, reset lúc 0h giờ Thái Bình Dương, tức 14h giờ Việt Nam. Giá:

| Thao tác | Đơn vị |
|---|---:|
| `videos.insert` | 1.600 |
| `captions.insert` | 400 |
| `thumbnails.set`, `videos.update`, `playlistItems.*`, `captions.list` | 50 |
| `videos.list`, `playlistItems.list` | 1 |

Một video đăng đầy đủ tốn 2.050 đơn vị, nên **không đăng nổi 22 video trong một ngày**.
Khi hết quota, API trả 403 `quotaExceeded`. Uploader ghi receipt ngay sau khi
`videos.insert` thành công nên chạy lại hôm sau sẽ không đăng trùng, chỉ làm tiếp các
bước còn thiếu.

Cẩn thận với script kiểm tra: `captions.list` tốn 50 đơn vị mỗi lần gọi, quét 22 video
hết 1.100 đơn vị. Đừng chạy audit khi còn việc ghi quan trọng chưa xong.

## Scheduled Publishing

Đặt lịch bằng `--publish-at <RFC3339 UTC>` kèm `--privacy private`; YouTube chỉ nhận
`publishAt` khi video đang Private. 20:00 giờ VN tương ứng `T13:00:00Z` cùng ngày.

```
npm run youtube:upload -- --number 23 --id 23-animal-... \
  --privacy private --publish-at 2026-08-12T13:00:00Z \
  --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
```

Uploader đọc lại `privacyStatus` và `publishAt` từ API sau khi upload, ghi
`visibility: "scheduled"` cùng `scheduledPublishAt` vào `data/publishing-state.json`.
Chạy lại lệnh với `--publish-at` khác sẽ dời lịch qua `videos.update`, không upload lại.

## Current Publishing Recovery Plan

The first 10 videos were published on the same day. Do not delete, re-upload or change
them back to Private only to alter their release order.

- Leave videos 01–12 Public. Videos 11 và 12 đã được chuyển Public (không phải do
  uploader thực hiện), nên không đổi ngược lại về Private chỉ để sửa thứ tự phát hành.
- Resume a sustainable schedule of one new Public video per day.
- Đã xong 2026-08-02: video `_j6SiVf0dvs` (Frog) trước đây mang title/description/tag
  của Fox, nay đã sửa về `How to Draw a Frog in 8 Simple Strokes ✏️`.
- Đã xong 2026-08-02: playlist `Easy Drawing in 10 Strokes` đổi tên thành
  `Simple Drawing Tutorials` (`PLS5I18k91_u4`) và bổ sung đủ 22 video.

Lưu ý khi sửa metadata: `videos.update` với `part=["snippet"]` ghi đè toàn bộ snippet,
nên phải gửi kèm `categoryId`, `defaultLanguage` và `defaultAudioLanguage`, nếu không
các trường đó bị xóa. Đọc lại ngay sau khi ghi có thể còn trả dữ liệu cũ; kiểm tra lại
sau vài giây trước khi kết luận là thất bại.

## Google Drive Archive Rule

When local disk space becomes limited, archive completed media to Google Drive in
numbered order. Never delete the local copy merely because an upload request returned
success.

For every archived file:

1. Calculate the local SHA-256 checksum and file size.
2. Upload the MP4 to the designated SketchFactory Google Drive folder.
3. Read the Drive file back or download it to a temporary location.
4. Confirm the Drive copy has the same size and SHA-256 checksum.
5. Record the Drive file ID/link and set `storage.googleDrive=true` in
   `data/publishing-state.json`.
6. Only after verification, delete that exact local MP4 from `output/upload-ready/`.
7. Set `storage.local=false` and update the human tracker.

Do not remove drawing JSON, source code, publishing sheets, OAuth tokens or upload
receipts as part of media archiving. Those files are small and are required to
reproduce or manage the videos.
