
Cách chạy react frontend app

- C1: Chạy bằng npm
 + B1: npm install
 + B2: npm start

- C2: Chạy bằng docker
 + B1: docker build -t frontend .  (cái này chạy 1 lần thôi, khởi động máy lên không chạy lần 2 )
 + B2: docker run -p 3000:80 frontend (cái này nếu chạy 1 lần thì sau khởi động máy lên chạy 2 lệnh docker stop frontend, docker rm frontend, docker run -p 3000:80 frontend)
 
 
 Lưu ý: Trước khi chạy cần cài docker và npm


- 