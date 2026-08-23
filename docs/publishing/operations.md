# SketchFactory Publishing Operations

Updated: 2026-08-14 21:55 (Asia/Ho_Chi_Minh)

## Source of Truth

- Machine-readable state: `data/publishing-state.json`
- Human tracker: `docs/publishing/upload-tracker.md`
- Per-video copy and checklist: `docs/publishing/<video>.md`
- Upload-ready MP4 files: `output/upload-ready/`
- YouTube OAuth credentials and receipts: `.secrets/` (local only, ignored by Git)

Whenever a platform upload succeeds, update all applicable state files in the same
task. Do not rely only on conversation history.

## Current Position

Đối chiếu trực tiếp với YouTube Data API ngày 2026-08-14.

- Nội dung đang phát hành: **bản v2 vẽ nét thuần**, giọng Kokoro `af_bella`
- Last generated video: 28
- Last YouTube upload: 28
- Next new video number: 29
- Videos 01–12: YouTube Public
- Videos 13–22: Private kèm lịch tự công khai 20:00 giờ VN mỗi ngày, 02/08 → 11/08
- Videos 23–26: Private kèm lịch tự công khai 20:00 giờ VN, hai ngày một video,
  13/08 → 19/08. Upload ngày 2026-08-11 sau khi cấp lại OAuth.
- Videos 27–28 (Koala, Squirrel): upload ngày 2026-08-14, Private kèm lịch 21/08 và
  23/08 20:00 giờ VN.
- Custom thumbnail: đã bật, cả 28 video đều dùng thumbnail riêng
- Phụ đề: mỗi video có 1 track `standard` do mình upload và 1 track `asr` YouTube tự
  sinh, xác minh ngày 2026-08-14
- 22 video bản v1 tô màu: đã Unlisted, giữ lại để khôi phục nếu cần
- Kênh hiện có 50 video: 28 bản v2 hiển thị, 22 bản v1 ẩn
- Playlist đang trống, chờ chạy `npm run youtube:playlist -- --apply` (nay 28 video)
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

**Nhịp đăng: từ video 23 là hai ngày một video công khai** (đổi ngày 2026-08-11; trước
đó là mỗi ngày một video và video 01–22 giữ nguyên lịch cũ). Render sẵn bao nhiêu cũng
được, nhưng mỗi lần upload phải để `Private` kèm `--publish-at` để rải đúng nhịp, lúc
20:00 giờ VN. Không bao giờ để hai video cùng công khai trong một ngày, kể cả khi hàng
đã sẵn. Đây là lỗi đã mắc ngày 27/07/2026 khi 10 video đầu lên cùng lúc.

Nhịp hiện hành ghi máy đọc được ở `data/publishing-state.json` → `youtube.publishCadence`,
và mốc dự kiến của từng video chưa đăng nằm ở `youtube.plannedPublishAt`.

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
   Chỉ xóa hẳn khi người dùng yêu cầu rõ và đã biết mình mất bao nhiêu view — dùng
   `npm run youtube:retire -- --archive <file> --delete-confirm`. Script mặc định chỉ
   liệt kê, và ghi `deletedAt` cho từng video ngay sau khi xóa nên chạy lại sau khi hết
   quota sẽ làm tiếp đúng chỗ dừng.
5. Gỡ bản cũ khỏi playlist **và** thêm bản mới vào trong cùng một bước, nếu không playlist
   sẽ rỗng. Dùng `npm run youtube:playlist -- --apply`.

## Playlist

Kênh dùng **hai playlist**, khai báo trong `youtube.playlists` của
`data/publishing-state.json`:

| Playlist | `includes` | Nhận video |
|---|---|---|
| `Simple Drawing Tutorials` (`PLS5I18k91_u4`) | `all` | tất cả, xếp theo số thứ tự |
| `Easy Object Drawings` (chưa có id) | `objects` | chỉ nhóm đồ vật, từ video 62 |

Playlist chung giữ nguyên vai trò cũ: chạy liên tục từ video 01 tới cuối. Vẫn **không chia
playlist theo nhóm con vật** — quyết định ngày 2026-08-02 còn nguyên giá trị, dù drawing có
sẵn `subcategory` (wildlife, pets, farm, birds, aquatic, insects). Playlist thứ hai mở ngày
2026-08-23 khi loạt đồ vật bắt đầu, vì đồ vật lẫn vào danh sách con vật thì người xem theo
chủ đề khó tìm.

`npm run youtube:playlist -- --apply` đọc `category` của từng video rồi thêm vào đúng
playlist; playlist nào còn `id: null` thì script tự tạo (public) và ghi id ngược lại vào
state. Video đồ vật nằm ở **cả hai** playlist.

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
npm run youtube:upload -- --number 23 --id 23-animal-snail-001 \
  --privacy private --publish-at 2026-08-13T13:00:00Z \
  --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
```

Lô 23–27 dùng các lệnh sau. Ngày 2026-08-11 đã chạy xong 23–26; **video 27 còn lại** vì
quota một ngày chỉ đủ 4 video:

```
# đã chạy 2026-08-11
npm run youtube:upload -- --number 23 --id 23-animal-snail-001     --privacy private --publish-at 2026-08-13T13:00:00Z --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
npm run youtube:upload -- --number 24 --id 24-animal-crab-001      --privacy private --publish-at 2026-08-15T13:00:00Z --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
npm run youtube:upload -- --number 25 --id 25-animal-butterfly-001 --privacy private --publish-at 2026-08-17T13:00:00Z --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
npm run youtube:upload -- --number 26 --id 26-animal-octopus-001   --privacy private --publish-at 2026-08-19T13:00:00Z --confirm-channel UCAfBtu-doN3P_2q8nuRwXng

# còn lại, chạy sau khi quota reset lúc 14:00 giờ VN ngày 2026-08-12
npm run youtube:upload -- --number 27 --id 27-animal-koala-001     --privacy private --publish-at 2026-08-21T13:00:00Z --confirm-channel UCAfBtu-doN3P_2q8nuRwXng
```

Mẹo đếm quota: 4 video đầy đủ là 8.200 đơn vị. Video thứ 5 sẽ chạm 10.250, vượt trần
10.000 — và nó thường vỡ giữa chừng chứ không chặn ngay, tức là `videos.insert` (1.600)
lọt còn `captions.insert` (400) trượt, để lại video không phụ đề. Đừng cố video thứ 5.

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

## OAuth hết hạn

Ngày 2026-08-11 `npm run youtube:channel` trả `invalid_grant`: refresh token trong
`.secrets/youtube-token.json` không còn dùng được. OAuth client đang ở chế độ Testing thì
refresh token hết hạn sau 7 ngày, khớp với mốc cấp quyền 2026-08-02.

Khắc phục: chạy `npm run youtube:auth`, xác nhận trong trình duyệt bằng đúng tài khoản của
kênh `Simple Sketch`. Lệnh mở server callback tại `http://127.0.0.1:53682/oauth2callback`
và chờ tối đa 5 phút. Không có cách nào cấp lại token mà không có thao tác của người dùng.
Muốn khỏi lặp lại mỗi tuần thì đưa OAuth client sang trạng thái Published trong Google
Cloud Console.

Đã cấp lại thành công lúc 2026-08-11 18:20, kết nối đúng kênh Simple Sketch
(`UCAfBtu-doN3P_2q8nuRwXng`). Vì client vẫn ở Testing nên **hạn chết kế tiếp khoảng
2026-08-18**. Trong trang consent phải bấm Advanced → Go to … (unsafe) vì app chưa verify.
