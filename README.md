# Quick Chat

> Project 1: Socket Programming | 662-01418351

## About

Quick Chat, a web application for chatting with friends quickly, is a real-time chat system that allows users to create rooms for chatting and join other users' rooms via URL or room ID. Communication uses HTTP and WebSocket over the TCP protocol to ensure that the sent messages are error-free.

<!-- Quick Chat เว็บแอปพลิเคชั่นสําหรับการพูดคุยกับเพื่อน ๆ แบบเร็ว ๆ เป็นระบบ real-time chat ที่ user สามารถสร้างห้องเพื่อพูดคุยกันได้ และเข้าร่วมห้องของ user คนอื่นผ่าน url หรือเข้าผ่าน room id การสื่อสารใช้ HTTP และ WebSocket ผ่าน TCP protocol ในการติดต่อระหว่าง client กับ server เพื่อให้มั่นใจได้ว่าข้อความที่ส่งไปนั้นไม่มีข้อผิดพลาดใด ๆ -->

## Tech Stack

- Frontend - [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn-UI](https://ui.shadcn.com/)
- Backend - [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Socket.io](https://socket.io/)

## Live site

- Frontend - https://chat.qu1etboy.dev
- Backend - https://chat-qmv6.onrender.com

## Local Development

Clone the project

```
git clone https://github.com/Qu1etboy/quick-chat.git
```

Install dependencies and start the development server

```sh
# install pnpm if you haven't
npm install -g pnpm
# install dependencies
pnpm install
# Start the development server
pnpm dev
```

## Creator

- 6410406860 Weerawong Vonggatunyu
