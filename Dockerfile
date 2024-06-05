#phiên bản nodeJS
FROM node:18.18.0

#thiết lập thư mục làm việc trong container 
WORKDIR /usr/src/app

#sao chép package.json và package-lock.json 
COPY package*.json ./

RUN npm install -g typescript

RUN npm install -g nodemon

# Cài đặt các gói Node.js
RUN npm install

#sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc 
COPY . .

# Mở cổng 3000
EXPOSE 5000


# Lệnh để khởi động ứng dụng
CMD [ "npm", "start" ]
