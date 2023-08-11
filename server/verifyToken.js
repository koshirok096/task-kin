import jwt from 'jsonwebtoken';
import { handleError } from './error.js';

export const verifyToken = (req, res, next) => {
  const secretKey = process.env.JWT;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(handleError(401, "Invalid authorization header"));
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded); // デコード結果をサーバーのコンソールに表示
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err); // エラーメッセージをサーバーのコンソールに表示
    return next(handleError(403, "Token is invalid", err)); // エラーレスポンスとしてデコードエラーを返す
  }
};

// export const verifyToken = (req, res, next) => {
//   const secretKey = process.env.JWT; // .envファイルから秘密鍵を取得するなど、正しい鍵を指定してください
//   const token = req.cookies.access_token;

//   if (!token) return next(handleError(401, 'You are not authenticated'));

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     console.log(decoded); // デコード結果をサーバーのコンソールに表示
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err); // エラーメッセージをサーバーのコンソールに表示
//     return next(handleError(403, 'Token is invalid', err)); // エラーレスポンスとしてデコードエラーを返す
//   }
// };

