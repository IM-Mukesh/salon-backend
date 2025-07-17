// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model";
import { generateSalonToken } from "../utils/jwt";
import Salon from "../models/salon.model";

const client = new OAuth2Client();

export const googleLogin = async (req: Request, res: Response) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.name) {
      return res.status(400).json({ error: "Invalid Google token" });
    }

    // Check if user already exists
    let user = await User.findOne({ email: payload.email });

    // Create new user if not exists
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        role: "salon",
      });
    }

    // Ensure salon exists for this user
    let salon = await Salon.findOne({ owner: user._id });

    if (!salon) {
      const defaultReviewUrl = `https://yourdomain.com/review/${user._id}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        defaultReviewUrl
      )}&size=200x200`;

      salon = await Salon.create({
        owner: user._id,
        name: `${user.name}'s Salon`,
        contact: "Please update contact",
        description: "Please add a salon description.",
        businessHours: "Mon-Sat 9AM - 6PM",
        address: "Please update address",
        pinCode: "000000",
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
        images: [],
        qrCodeUrl,
      });
    }

    // Generate and return JWT token
    const token = generateSalonToken(user._id.toString());

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({ error: "Google login failed" });
  }
};
