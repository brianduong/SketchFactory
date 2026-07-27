# Ngôn ngữ vẽ SketchFactory

## Canvas và hình học

- Canvas chuẩn: `1000 × 1000`, viewBox `0 0 1000 1000`.
- Nền preview màu trắng; SVG nguồn có thể trong suốt.
- Safe area: x/y từ `100` đến `900`; nét không được chạm mép canvas.
- Tâm thị giác mục tiêu: `(500, 500)`, sai lệch bbox không quá 8% mỗi trục.
- Dùng circle, ellipse, line, polyline, polygon, rect và path Bézier đơn giản.
- Không transform lồng nhau trong dữ liệu nguồn; lưu tọa độ đã chuẩn hóa.

## Nét

- Màu: `#111111`.
- Độ dày chuẩn: `24` đơn vị canvas; phạm vi được phép `20–28`.
- `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Không fill, trừ chi tiết kín nhỏ cần nhận diện (mắt/mũi); fill vẫn dùng `#111111`.
- Không shadow, texture, gradient hay hiệu ứng 3D.
- Mục tiêu 5–10 semantic strokes. Nhiều subpath trong một stroke chỉ hợp lệ khi được
  vẽ bằng một hành động liên tục hoặc cùng là một chi tiết lặp đơn giản.

## Tỷ lệ và đối xứng

- Đối tượng chiếm 55–75% chiều rộng/cao safe area.
- Bộ phận chính lớn trước, chi tiết nhỏ sau.
- Cặp mắt/tai đặt đối xứng qua trục dọc với sai số tối đa 3% canvas, trừ khi góc nhìn
  được khai báo rõ.
- Đầu/thân của cùng category dùng template tỷ lệ chung; thay đổi phải có lý do nhận diện.
- Chi tiết nhỏ nhất phải có bbox tối thiểu `20 × 20`.

## Đặt tên stroke

ID dùng kebab-case và có tiền tố thứ tự hai chữ số:

```text
01-head-outline
02-left-ear
03-right-ear
```

`name` là tiếng Anh ngắn, mô tả điều người vẽ làm. `order` bắt đầu từ 1, liên tục,
không trùng. Không đặt tên theo cách render như `path-1`.

## Đếm nét

Một nét là đúng **một lần đặt bút liên tục**. Nhấc bút tạo nét mới. Đây là quy tắc
cứng của kênh:

- Không gom nhiều đường rời vào một stroke để làm số nét trông ít hơn.
- Một SVG path chỉ được có một lệnh bắt đầu `M/m`.
- Không dùng `semanticGroup` để hợp thức hóa nhiều đường thành một nét.
- Ưu tiên line, circle, ellipse và đường cong liên tục ngắn.
- Nếu một chi tiết cần nhiều lần nhấc bút, phải lưu thành nhiều stroke riêng.
- Nếu hình vượt quá giới hạn nét, phải đơn giản hóa thiết kế thay vì tạo stroke phức tạp.

`strokeCount` phải bằng tổng stroke đang `enabled`. Nét tắt không render và không tính.

## Chia bước và thứ tự

- Một step có 1–3 stroke và một câu voice ngắn.
- Trình tự: khối lớn → silhouette → bộ phận nhận diện → chi tiết chốt.
- Không vẽ chi tiết phụ trước khi có khung tham chiếu.
- Mỗi stroke có `startMs`, `durationMs`; các khoảng không âm và tăng theo order.
- Chế độ preview nhanh dùng 350–900 ms/nét. Video học theo mặc định dùng
  1.200–2.500 ms/nét và có khoảng nghỉ ngắn giữa hai hành động để người xem kịp vẽ.
- Voice cue mô tả đúng step, không liệt kê dữ liệu kỹ thuật.

## Nhận diện

Một hình đạt khi:

1. Ba người độc lập nhìn bản cuối trong 2 giây và ít nhất hai người gọi đúng nhóm đối
   tượng; trước MVP mở rộng, review thủ công ghi kết quả vào QC.
2. Silhouette vẫn phân biệt được ở thumbnail 160 px.
3. Bỏ từng nét trang trí không làm hình rõ hơn thì nét đó phải bị loại.
4. Không phụ thuộc màu sắc để nhận diện.

Validator tự động kiểm tra bbox, số nét, size tối thiểu, thứ tự, timing và SVG parse
cơ bản. Nó không thay thế bài test nhận diện với con người.

## Phù hợp với người mới và giáo viên

- Hình dùng cấu trúc quen thuộc, an toàn và phù hợp với môi trường làm việc/lớp học.
- Một người chưa từng học vẽ có thể bắt chước từng bước bằng các hình cơ bản.
- Tổng thời gian vẽ tay mục tiêu không quá 10 giây.
- Lời đọc dùng câu ngắn, động từ trực tiếp, không thuật ngữ hình học phức tạp.
- Bản in đen trắng vẫn rõ; mọi nét đủ dày khi in A5.
- Thiết kế nguyên bản, không logo, nhân vật hay đặc trưng nhận diện có bản quyền.

## Quy tắc video

Canvas video 1080×1920. Vùng vẽ nằm trong x `100–980`, y `360–1360`; subtitle nằm
trên vùng UI đáy và không che hình. Hook chiếm 1–2 giây, animation 8–12 giây, bản hoàn
chỉnh được giữ ít nhất 2 giây. Hiệu ứng chỉ phục vụ việc thấy thứ tự nét.
