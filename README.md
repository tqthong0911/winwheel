Muốn default result:
- set HARD_RESULT value là array thứ tự trong segments configs

x: Done
-: chưa hoàn mỹ lắm
 : chưa done
 
Checklist các chức năng và hướng đi tiếp (khác) nếu còn time:
[x] Quay từng vòng khi click Xoay 
=> Dùng Canvas toàn bộ + `requestAnimationFrame` để quay từng vòng
[-] Opacity cho từng vòng xoay
[ ] UI giống 100%
=> 1. Nếu dùng Winwheel thì set image và cắt layout từng vòng để set
=> 2. Dùng canvas để vẽ
[ ] Các điểm sáng chạy theo khi xoay
=> 1. Add thêm element và watch biến `wheelSpinning` để run điểm sáng
=> 2. Nếu làm hướng Canvas thì em chưa biết cách làm
