// // middleware.ts

// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// export const withAuth = (handler: NextApiHandler) => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     // Example authentication logic
//     const isAuthenticated = checkAuthentication(req); // Implement your actual authentication logic

//     if (!isAuthenticated) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Proceed with the original handler
//     return await handler(req, res);
//   };
// };

// // Example function to check authentication based on token or session
// const checkAuthentication = (req: NextApiRequest): boolean => {
//   // Implement your authentication logic here
//   const token = req.headers.authorization; // Example: Retrieve token from headers

//   // Check if token is valid and allow access
//   if (token) {
//     return true;
//   }

//   return false;
// };

