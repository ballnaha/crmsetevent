"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box, Button, Chip, CircularProgress, Dialog, DialogContent,
  DialogTitle, Divider, FormControl, IconButton, InputLabel,
  MenuItem, Paper, Select, Stack, Tab, Tabs, TextField,
  Tooltip, Typography, Checkbox, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {
  CheckCircle2, ChevronLeft, FileText, ImageIcon, Mail, Paperclip,
  Pencil, Plus, Send, Trash2, Users, X, XCircle, Eye, AlertCircle,
  Sparkles, Clock, ChevronRight, ChevronsLeft, ChevronsRight
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type EmailTemplate = {
  id: number;
  name: string;
  subject: string;
  body: string;
  updatedAt: string;
};

type Campaign = {
  id: number;
  name: string;
  status: string;
  sentAt: string | null;
  createdAt: string;
  template: { name: string } | null;
  _count: { recipients: number };
};

type Contact = {
  id: number | string;
  companyName: string;
  contactName: string | null;
  email: string | null;
  lastSentAt?: string | null;
};

type Attachment = {
  filename: string;
  contentType: string;
  base64: string;
  size: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const MERGE_TAGS = [
  { tag: "{{contact_name}}", label: "ชื่อผู้ติดต่อ" },
  { tag: "{{company_name}}", label: "ชื่อบริษัท" },
  { tag: "{{email}}", label: "อีเมล" },
];

const BOILERPLATES = [
  {
    name: "📺 โปรโมชั่นจอ LED (Set Event)",
    subject: "เนรมิตอีเวนต์พรีเมียม ครบวงจร แสง-สี-เสียง-จอ LED จบในที่เดียว — Set Event Thailand",
    body: `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Event Thailand - LED Screen Promotion</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6; /* พื้นหลังภายนอกสีเทาอ่อนมาก */
            font-family: 'Prompt', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            width: 100%;
        }
        td {
            padding: 0;
        }
        img {
            border: 0;
            display: block;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff; /* ตัวเมลพื้นสีขาวสะอาด Modern */
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .btn-modern {
            background-color: #e50914; /* สีแดงเอกลักษณ์ของ Set Event */
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 45px;
            font-weight: 600;
            border-radius: 8px; /* โค้งมนแบบโมเดิร์นคลาสสิก */
            display: inline-block;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 14px rgba(229, 9, 21, 0.25);
            transition: all 0.3s ease;
        }
        .info-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 16px;
        }
        /* Style สำหรับจัดระเบียบรูป 3 รูปใน 1 แถว */
        .gallery-container {
            padding: 0 40px 30px 40px;
        }
        .gallery-table {
            width: 100%;
        }
        .gallery-cell {
            width: 31%;
            padding: 0 1%;
            vertical-align: top;
        }
        .gallery-img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.04);
        }
        @media screen and (max-width: 600px) {
            .responsive-padding {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
            /* เมื่อเปิดในมือถือ ให้รูปขยายเต็มแผ่ลงมาเป็นแนวตั้งเพื่อความชัดเจน */
            .gallery-container {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
            .gallery-cell {
                display: block !important;
                width: 100% !important;
                padding: 0 0 15px 0 !important;
            }
        }
    </style>
</head>
<body>

    <table width="100%" bgcolor="#f3f4f6" style="padding: 50px 0;">
        <tr>
            <td>
                <div class="email-container">
                    
                    <!-- HEADER SECTION -->
                    <table width="100%" style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;" class="responsive-padding">
                        <tr>
                            <td>
                                <!-- โลโก้จริงของ Set Event Thailand -->
                                <img src="https://seteventthailand.com/images/logo1.png" alt="Set Event Thailand" width="120">
                            </td>
                            <td align="right" style="color: #64748b; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                PROFESSIONAL TEAM <br>
                                End-to-End Event Solution
                            </td>
                        </tr>
                    </table>

                    <!-- MAIN CONTENT -->
                    <table width="100%" style="padding: 45px 40px 20px 40px;" class="responsive-padding">
                        <tr>
                            <td>
                                <span style="color: #e50914; font-size: 13px; font-weight: bold; letter-spacing: 1.5px; display: inline-block; margin-bottom: 12px; text-transform: uppercase;">One-Stop Event Production</span>
                                <h1 style="font-size: 26px; color: #0f172a; margin: 0 0 20px 0; font-weight: 700; line-height: 1.4;">
                                    เนรมิตงานอีเวนต์สุดพรีเมียม<br><span style="color: #e50914;">ครบวงจรจบในที่เดียว</span> สะกดทุกสายตา
                                </h1>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0;">
                                    เรียน พันธมิตรผู้จัดงานและลูกค้าทุกท่าน,<br><br>
                                    หมดกังวลเรื่องความยุ่งยากในการประสานงานหลายฝ่าย! **Set Event Thailand** ยกระดับมาตรฐานการจัดงานด้วยบริการ **Event Organizer & Production ครบวงจร** เราพร้อมเนรมิตงานของคุณให้สมบูรณ์แบบ ไร้รอยต่อ ตั้งแต่ระบบแสง สี เสียง โครงสร้างเวที ไปจนถึง **ระบบจอ LED Display เกรดพรีเมียม (High Refresh Rate)** ที่ให้ภาพคมชัดสูง แสงไม่กระพริบเมื่อถ่ายภาพ/วิดีโอหน้างาน ช่วยเสริมภาพลักษณ์ระดับไฮเอนด์ให้กับทุกงานสัมมนา งานแต่งงาน งานแถลงข่าว หรือคอนเสิร์ต<br><br>
                                    <strong>ทำไมต้องเลือก Set Event Thailand?</strong><br>
                                    • <strong>ครบจบในที่เดียว (One-Stop Solution):</strong> ดูแลทั้งจอ LED แสง เสียง และรันเวที ไม่ต้องแยกดีลหลายเจ้า ประหยัดงบและเวลา<br>
                                    • <strong>อุปกรณ์เกรดพรีเมียมระดับท็อป:</strong> จอ LED และระบบเสียงมาตรฐานสากล คมชัดสมจริง ไร้กังวลเรื่องขัดข้องหน้างาน<br>
                                    • <strong>ทีมงานผู้เชี่ยวชาญเคียงข้างคุณ:</strong> ทีมวิศวกรและช่างเทคนิคดูแลใกล้ชิดทุกวินาที มั่นใจได้ในความมืออาชีพ
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- 3-IMAGE GALLERY ROW (เพิ่มโซนแสดงภาพผลงาน 3 ภาพใน 1 แถว) -->
                    <table width="100%" class="gallery-container">
                        <tr>
                            <td>
                                <table class="gallery-table" style="width:100%">
                                    <tr>
                                        <!-- ภาพที่ 1 (แนะนำขนาดสี่เหลี่ยมจัตุรัส หรือ 4:3 เช่น 400x400 px) -->
                                        <td class="gallery-cell">
                                            <img src="https://crm.seteventthailand.com/uploads/1782091617684-4znt6k.jpg" alt="LED ผลงาน" class="gallery-img">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- HIGHLIGHT CARDS (PACKAGES) -->
                    <table width="100%" style="padding: 0 40px 25px 40px;" class="responsive-padding">
                        <tr>
                            <td>
                                <!-- PACKAGE S -->
                                <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1.5px solid #06b6d4; border-radius: 14px; background-color: #ffffff; margin-bottom: 20px; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 3px;">
                                            <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid #e0f7fa; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                                                <!-- Header -->
                                                <tr>
                                                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 14px 18px; color: #ffffff;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <tr>
                                                                <td style="font-size: 15px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; font-family: 'Prompt', sans-serif;">
                                                                    ⚡ PACKAGE S
                                                                </td>
                                                                <td align="right" style="font-size: 15px; font-weight: 800; color: #ffffff; font-family: 'Prompt', sans-serif;">
                                                                    60,000 BAHT
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- Body -->
                                                <tr>
                                                    <td style="padding: 18px; background-color: #fcfdfd;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <!-- LED Screen -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #e0f7fa; color: #00acc1; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">LED Screen:</strong> PH3.9 ขนาด 2x4 เมตร
                                                                </td>
                                                            </tr>
                                                            <!-- Lighting System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #e0f7fa; color: #00acc1; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Lighting System:</strong> Beam 4 Units / Par LED 8 Units / Daylight 8 Units / Truss I shape 2 Units / Truss T shape 2 Units
                                                                </td>
                                                            </tr>
                                                            <!-- Sound System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #e0f7fa; color: #00acc1; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Sound System (up to 100 Pax):</strong> ลำโพง 2 Units / ไมโครโฟน 2-4 Units
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- PACKAGE M -->
                                <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1.5px solid #ec4899; border-radius: 14px; background-color: #ffffff; margin-bottom: 20px; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 3px;">
                                            <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid #fce7f3; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                                                <!-- Header -->
                                                <tr>
                                                    <td style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); padding: 14px 18px; color: #ffffff;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <tr>
                                                                <td style="font-size: 15px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; font-family: 'Prompt', sans-serif;">
                                                                    ⭐ PACKAGE M
                                                                </td>
                                                                <td align="right" style="font-size: 15px; font-weight: 800; color: #ffffff; font-family: 'Prompt', sans-serif;">
                                                                    100,000 BAHT
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- Body -->
                                                <tr>
                                                    <td style="padding: 18px; background-color: #fcfdfd;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <!-- LED Display -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #fce7f3; color: #db2777; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">LED Display:</strong> PH2.6 ขนาด 3x5.5 เมตร
                                                                </td>
                                                            </tr>
                                                            <!-- Lighting System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #fce7f3; color: #db2777; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Lighting System:</strong> Beam 6 Units / Par LED 10 Units / Par Warm Light 8 Units
                                                                </td>
                                                            </tr>
                                                            <!-- Sound System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #fce7f3; color: #db2777; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Sound System (200 Pax):</strong> ลำโพง Eon JBL 4 Units / ไมโครโฟนไร้สาย 4-6 Units
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- PACKAGE L -->
                                <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 2px solid #06b6d4; border-radius: 14px; background-color: #ffffff; margin-bottom: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.1);">
                                    <tr>
                                        <td style="padding: 3px;">
                                            <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1.5px solid #ec4899; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                                                <!-- Header -->
                                                <tr>
                                                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #ec4899 100%); padding: 14px 18px; color: #ffffff;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <tr>
                                                                <td style="font-size: 15px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; font-family: 'Prompt', sans-serif; vertical-align: middle;">
                                                                    <span style="background-color: #ffffff; color: #ec4899; font-size: 9px; font-weight: 900; padding: 2px 6px; border-radius: 4px; margin-right: 8px; vertical-align: middle; display: inline-block; font-family: sans-serif;">POPULAR</span> 🔥 PACKAGE L
                                                                </td>
                                                                <td align="right" style="font-size: 15px; font-weight: 800; color: #ffffff; font-family: 'Prompt', sans-serif; vertical-align: middle;">
                                                                    150,000 BAHT
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- Body -->
                                                <tr>
                                                    <td style="padding: 18px; background-color: #faf5ff;">
                                                        <table width="100%" style="border-collapse: collapse;">
                                                            <!-- LED Display -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #e0f7fa; color: #00acc1; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">LED Display:</strong> PH3.9 ขนาด 3x10 เมตร (จอยาวพิเศษ)
                                                                </td>
                                                            </tr>
                                                            <!-- Lighting System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px; padding-bottom: 12px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #fce7f3; color: #db2777; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; padding-bottom: 12px; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Lighting System:</strong> Beam 14 Units / Par LED 16 Units / Par Warm Light 16 Units
                                                                </td>
                                                            </tr>
                                                            <!-- Sound System -->
                                                            <tr>
                                                                <td style="vertical-align: top; width: 26px;">
                                                                    <span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; background-color: #f3e8ff; color: #7c3aed; font-size: 10px; font-weight: bold;">✓</span>
                                                                </td>
                                                                <td style="font-size: 13.5px; line-height: 1.6; color: #334155; font-family: 'Prompt', sans-serif;">
                                                                    <strong style="color: #0f172a;">Sound System (300-400 Pax):</strong> ลำโพง 6-8 Units / ไมโครโฟนไร้สาย 6 Units
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- FOOTER -->
                    <table width="100%" bgcolor="#0f172a" style="padding: 40px; color: #94a3b8; font-size: 13px; line-height: 1.7;" class="responsive-padding">
                        <tr>
                            <td style="text-align: center;">
                                <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: bold; font-size: 15px; letter-spacing: 0.5px;">SET EVENT THAILAND</p>
                                <p style="margin: 0 0 20px 0; font-size: 12px; color: #cbd5e1;">ผู้เชี่ยวชาญด้านระบบแสง เสียง ภาพ และโครงสร้างจัดงานอีเวนต์ครบวงจร</p>
                                 
                                <p style="margin: 0 0 4px 0;">ฝ่ายบริการลูกค้า: 093-726-5055 | Email: setevent26@gmail.com | Line OA: @setevent</p>
                                <p style="margin: 0 0 20px 0;">Website: <a href="https://www.seteventthailand.com" style="color: #38bdf8; text-decoration: none;">www.seteventthailand.com</a></p>
                                 
                                <hr style="border: none; border-top: 1px solid #334155; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: #64748b;">
                                    ทางบริษัทฯ หวังเป็นอย่างยิ่งว่าข้อมูลประชาสัมพันธ์นี้จะเป็นประโยชน์ต่อการวางแผนจัดงานครั้งถัดไปของคุณลูกค้า
                                </p>
                            </td>
                        </tr>
                    </table>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>`
  },
  {
    name: "✉️ จดหมายทักทายทั่วไป",
    subject: "สวัสดีคุณ {{contact_name}} — ขอบคุณที่ติดต่อเรา",
    body: `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Event Thailand - Thank You</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: 'Prompt', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            width: 100%;
        }
        td {
            padding: 0;
        }
        img {
            border: 0;
            display: block;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .btn-modern {
            background-color: #0ea5e9;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 45px;
            font-weight: 600;
            border-radius: 8px;
            display: inline-block;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);
            transition: all 0.3s ease;
        }
        @media screen and (max-width: 600px) {
            .responsive-padding {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
        }
    </style>
</head>
<body>

    <table width="100%" bgcolor="#f3f4f6" style="padding: 50px 0;">
        <tr>
            <td>
                <div class="email-container">
                    
                    <!-- HEADER SECTION -->
                    <table width="100%" style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;" class="responsive-padding">
                        <tr>
                            <td>
                                <img src="https://seteventthailand.com/images/logo1.png" alt="Set Event Thailand" width="120">
                            </td>
                            <td align="right" style="color: #64748b; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                PROFESSIONAL TEAM <br>
                                End-to-End Event Solution
                            </td>
                        </tr>
                    </table>

                    <!-- MAIN CONTENT -->
                    <table width="100%" style="padding: 45px 40px 30px 40px;" class="responsive-padding">
                        <tr>
                            <td>
                                <span style="color: #0ea5e9; font-size: 13px; font-weight: bold; letter-spacing: 1.5px; display: inline-block; margin-bottom: 12px; text-transform: uppercase;">Customer Greeting & Support</span>
                                <h1 style="font-size: 26px; color: #0f172a; margin: 0 0 20px 0; font-weight: 700; line-height: 1.4;">
                                    เรียนคุณ {{contact_name}},
                                </h1>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 20px 0;">
                                    ขอขอบคุณสำหรับความสนใจในบริการของทาง <strong>{{company_name}}</strong> ทางทีมงานของเรายินดีเป็นอย่างยิ่งที่มีโอกาสได้แนะนำข้อมูลและแนวทางจัดงานอีเวนต์ให้แก่ท่าน
                                </p>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 30px 0;">
                                    หากท่านมีคำถามเกี่ยวกับแคมเปญ งานสัมมนา หรือระบบจัดการความต้องการพิเศษของงานจัดแสดงสินค้าเพิ่มเติม สามารถติดต่อผู้ดูแลโครงการของท่านได้โดยการตอบกลับอีเมลนี้โดยตรง หรือกดปุ่มพูดคุยกับเจ้าหน้าที่ของเราด้านล่างนี้
                                </p>
                                <div style="text-align: center;">
                                    <a href="#" class="btn-modern">พูดคุยกับเจ้าหน้าที่</a>
                                </div>
                                <p style="margin-top: 40px; font-size: 15px; line-height: 1.8; color: #475569;">
                                    ขอแสดงความนับถือ,<br>
                                    <span style="color: #0ea5e9; font-weight: bold;">ทีมงาน SetEventThailand Co.</span>
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- FOOTER -->
                    <table width="100%" bgcolor="#0f172a" style="padding: 40px; color: #94a3b8; font-size: 13px; line-height: 1.7;" class="responsive-padding">
                        <tr>
                            <td style="text-align: center;">
                                <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: bold; font-size: 15px; letter-spacing: 0.5px;">SET EVENT THAILAND</p>
                                <p style="margin: 0 0 20px 0; font-size: 12px; color: #cbd5e1;">ผู้เชี่ยวชาญด้านระบบแสง เสียง ภาพ และโครงสร้างจัดงานอีเวนต์ครบวงจร</p>
                                 
                                <p style="margin: 0 0 4px 0;">ฝ่ายบริการลูกค้า: 093-726-5055 | Email: setevent26@gmail.com | Line OA: @setevent</p>
                                <p style="margin: 0 0 20px 0;">Website: <a href="https://www.seteventthailand.com" style="color: #38bdf8; text-decoration: none;">www.seteventthailand.com</a></p>
                                 
                                <hr style="border: none; border-top: 1px solid #334155; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: #64748b;">
                                    ทางบริษัทฯ หวังเป็นอย่างยิ่งว่าข้อมูลประชาสัมพันธ์นี้จะเป็นประโยชน์ต่อการวางแผนจัดงานครั้งถัดไปของคุณลูกค้า
                                </p>
                            </td>
                        </tr>
                    </table>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>`
  },
  {
    name: "📅 การ์ดเชิญร่วมงานสัมมนา",
    subject: "ขอเรียนเชิญคุณ {{contact_name}} เข้าร่วมงานสัมมนาพิเศษประจำปี 2026",
    body: `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Event Thailand - Seminar Invitation</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: 'Prompt', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            width: 100%;
        }
        td {
            padding: 0;
        }
        img {
            border: 0;
            display: block;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .btn-modern {
            background-color: #8b5cf6;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 45px;
            font-weight: 600;
            border-radius: 8px;
            display: inline-block;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.25);
            transition: all 0.3s ease;
        }
        @media screen and (max-width: 600px) {
            .responsive-padding {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
        }
    </style>
</head>
<body>

    <table width="100%" bgcolor="#f3f4f6" style="padding: 50px 0;">
        <tr>
            <td>
                <div class="email-container">
                    
                    <!-- HEADER SECTION -->
                    <table width="100%" style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;" class="responsive-padding">
                        <tr>
                            <td>
                                <img src="https://seteventthailand.com/images/logo1.png" alt="Set Event Thailand" width="120">
                            </td>
                            <td align="right" style="color: #64748b; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                PROFESSIONAL TEAM <br>
                                End-to-End Event Solution
                            </td>
                        </tr>
                    </table>

                    <!-- MAIN CONTENT -->
                    <table width="100%" style="padding: 45px 40px 20px 40px;" class="responsive-padding">
                        <tr>
                            <td>
                                <span style="color: #8b5cf6; font-size: 13px; font-weight: bold; letter-spacing: 1.5px; display: inline-block; margin-bottom: 12px; text-transform: uppercase;">Exclusive Invitation</span>
                                <h1 style="font-size: 26px; color: #0f172a; margin: 0 0 20px 0; font-weight: 700; line-height: 1.4;">
                                    EventSync Forum 2026<br><span style="color: #8b5cf6;">The Next Era of Smart Event Tech</span>
                                </h1>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 20px 0;">
                                    เรียน คุณ <strong>{{contact_name}}</strong> จากบริษัท <strong>{{company_name}}</strong>,
                                </p>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 25px 0;">
                                    เรามีความยินดีเป็นอย่างยิ่งที่จะเรียนเชิญท่านเข้าร่วมสัมมนาพิเศษ ที่จะรวมเหล่าผู้บริหารและผู้เชี่ยวชาญจากกลุ่มงาน Event ทั่วประเทศมาร่วมแบ่งปันวิสัยทัศน์ในหัวข้อการใช้ Data ขับเคลื่อนความสำเร็จของการจัดแสดงสินค้าและนวัตกรรมระบบแสง สี เสียง แห่งอนาคต
                                </p>

                                <!-- DETAILS CARD -->
                                <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1.5px solid #8b5cf6; border-radius: 14px; background-color: #ffffff; margin: 25px 0 30px 0; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 3px;">
                                            <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid #faf5ff; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                                                <tr>
                                                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 12px 16px; color: #ffffff; font-size: 14.5px; font-weight: 700; font-family: 'Prompt', sans-serif;">
                                                        📆 รายละเอียดงานสัมมนา
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 18px; background-color: #faf5ff; font-size: 14px; line-height: 1.8; color: #334155; font-family: 'Prompt', sans-serif;">
                                                        • <strong>วันที่:</strong> 15 กรกฎาคม 2026<br>
                                                        • <strong>สถานที่:</strong> BITEC Grand Hall (Room 201-203)<br>
                                                        • <strong>เวลา:</strong> 13:00 - 17:00 น.
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <div style="text-align: center; margin-bottom: 30px;">
                                    <a href="#" class="btn-modern">ลงทะเบียนรับบัตรฟรี</a>
                                </div>

                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin-top: 30px;">
                                    ขอแสดงความนับถือ,<br>
                                    <span style="color: #8b5cf6; font-weight: bold;">คณะผู้จัดงาน SetEventThailand Forum</span>
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- FOOTER -->
                    <table width="100%" bgcolor="#0f172a" style="padding: 40px; color: #94a3b8; font-size: 13px; line-height: 1.7;" class="responsive-padding">
                        <tr>
                            <td style="text-align: center;">
                                <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: bold; font-size: 15px; letter-spacing: 0.5px;">SET EVENT THAILAND</p>
                                <p style="margin: 0 0 20px 0; font-size: 12px; color: #cbd5e1;">ผู้เชี่ยวชาญด้านระบบแสง เสียง ภาพ และโครงสร้างจัดงานอีเวนต์ครบวงจร</p>
                                 
                                <p style="margin: 0 0 4px 0;">ฝ่ายบริการลูกค้า: 093-726-5055 | Email: setevent26@gmail.com | Line OA: @setevent</p>
                                <p style="margin: 0 0 20px 0;">Website: <a href="https://www.seteventthailand.com" style="color: #38bdf8; text-decoration: none;">www.seteventthailand.com</a></p>
                                 
                                <hr style="border: none; border-top: 1px solid #334155; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: #64748b;">
                                    ทางบริษัทฯ หวังเป็นอย่างยิ่งว่าข้อมูลประชาสัมพันธ์นี้จะเป็นประโยชน์ต่อการวางแผนจัดงานครั้งถัดไปของคุณลูกค้า
                                </p>
                            </td>
                        </tr>
                    </table>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>`
  },
  {
    name: "🚀 ข้อเสนอพิเศษ / Proposal",
    subject: "ข้อเสนอพิเศษสุดพิเศษสำหรับ {{company_name}} ยกระดับระบบจัดการ Event ของท่าน",
    body: `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Event Thailand - Special Proposal</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: 'Prompt', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            width: 100%;
        }
        td {
            padding: 0;
        }
        img {
            border: 0;
            display: block;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .btn-modern {
            background-color: #06b6d4;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 45px;
            font-weight: 600;
            border-radius: 8px;
            display: inline-block;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 14px rgba(6, 182, 212, 0.25);
            transition: all 0.3s ease;
        }
        @media screen and (max-width: 600px) {
            .responsive-padding {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
        }
    </style>
</head>
<body>

    <table width="100%" bgcolor="#f3f4f6" style="padding: 50px 0;">
        <tr>
            <td>
                <div class="email-container">
                    
                    <!-- HEADER SECTION -->
                    <table width="100%" style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;" class="responsive-padding">
                        <tr>
                            <td>
                                <img src="https://seteventthailand.com/images/logo1.png" alt="Set Event Thailand" width="120">
                            </td>
                            <td align="right" style="color: #64748b; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                PROFESSIONAL TEAM <br>
                                End-to-End Event Solution
                            </td>
                        </tr>
                    </table>

                    <!-- MAIN CONTENT -->
                    <table width="100%" style="padding: 45px 40px 20px 40px;" class="responsive-padding">
                        <tr>
                            <td>
                                <span style="color: #06b6d4; font-size: 13px; font-weight: bold; letter-spacing: 1.5px; display: inline-block; margin-bottom: 12px; text-transform: uppercase;">Exclusive Proposal</span>
                                <h1 style="font-size: 26px; color: #0f172a; margin: 0 0 20px 0; font-weight: 700; line-height: 1.4;">
                                    Exclusive Partnership Proposal<br><span style="color: #ec4899;">จัดเตรียมเป็นพิเศษสำหรับ {{company_name}}</span>
                                </h1>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 20px 0;">
                                    เรียน คุณ {{contact_name}},
                                </p>
                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 10px 0;">
                                    สืบเนื่องจากการติดต่อขอข้อมูลระบบบริการและโครงสร้างจัดการแคมเปญร่วมกันที่ผ่านมา ทางทีมงานได้สรุปบริการและอัตราค่าใช้จ่ายพิเศษสำหรับแคมเปญ Q3 ดังรายละเอียดต่อไปนี้:
                                </p>

                                <!-- DETAILS PROPOSAL TABLE CARD -->
                                <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1.5px solid #06b6d4; border-radius: 14px; background-color: #ffffff; margin: 25px 0 25px 0; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 3px;">
                                            <table width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid #e0f7fa; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                                                <tr>
                                                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 12px 16px; color: #ffffff; font-size: 14.5px; font-weight: 700; font-family: 'Prompt', sans-serif;">
                                                        📋 ตารางข้อเสนอพิเศษ
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 16px; background-color: #ffffff;">
                                                        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; font-family: 'Prompt', sans-serif;">
                                                            <thead>
                                                                <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-weight: 750;">
                                                                    <th style="padding: 8px 10px; text-align: left;">รายการบริการ</th>
                                                                    <th style="padding: 8px 10px; text-align: right;">ราคาพิเศษ (บาท)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                                                    <td style="padding: 10px 10px; color: #334155;">Event Calendar Sync Hub (BITEC & IMPACT)</td>
                                                                    <td style="padding: 10px 10px; text-align: right; font-weight: 600; color: #06b6d4;">Included</td>
                                                                </tr>
                                                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                                                    <td style="padding: 10px 10px; color: #334155;">Email Automation Campaign Module</td>
                                                                    <td style="padding: 10px 10px; text-align: right; font-weight: 600; color: #06b6d4;">Included</td>
                                                                </tr>
                                                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                                                    <td style="padding: 10px 10px; font-weight: bold; color: #0f172a;">ค่าธรรมเนียมรายปีสมาชิก CRM Operator License</td>
                                                                    <td style="padding: 10px 10px; text-align: right; font-weight: bold; color: #ec4899;">9,500.- / ปี</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin: 0 0 25px 0;">
                                    ข้อเสนอนี้ยืดอายุถึงสิ้นเดือนนี้เท่านั้น ท่านสามารถกดยืนยันเพื่อขอข้อมูลเพิ่มเติมหรือนัดสาธิตการใช้งานระบบกับเจ้าหน้าที่เทคนิคของเรา
                                </p>

                                <div style="text-align: center; margin-bottom: 30px;">
                                    <a href="#" class="btn-modern" style="background: linear-gradient(135deg, #06b6d4 0%, #ec4899 100%); box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);">นัดจองคิวรับการสาธิตระบบ</a>
                                </div>

                                <p style="font-size: 15px; line-height: 1.8; color: #475569; margin-top: 30px;">
                                    ขอแสดงความนับถือ,<br>
                                    <span style="color: #06b6d4; font-weight: bold;">ฝ่ายประสานงานเทคนิค SetEventThailand</span>
                                </p>
                            </td>
                        </tr>
                    </table>

                    <!-- FOOTER -->
                    <table width="100%" bgcolor="#0f172a" style="padding: 40px; color: #94a3b8; font-size: 13px; line-height: 1.7;" class="responsive-padding">
                        <tr>
                            <td style="text-align: center;">
                                <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: bold; font-size: 15px; letter-spacing: 0.5px;">SET EVENT THAILAND</p>
                                <p style="margin: 0 0 20px 0; font-size: 12px; color: #cbd5e1;">ผู้เชี่ยวชาญด้านระบบแสง เสียง ภาพ และโครงสร้างจัดงานอีเวนต์ครบวงจร</p>
                                 
                                <p style="margin: 0 0 4px 0;">ฝ่ายบริการลูกค้า: 093-726-5055 | Email: setevent26@gmail.com | Line OA: @setevent</p>
                                <p style="margin: 0 0 20px 0;">Website: <a href="https://www.seteventthailand.com" style="color: #38bdf8; text-decoration: none;">www.seteventthailand.com</a></p>
                                 
                                <hr style="border: none; border-top: 1px solid #334155; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 11px; color: #64748b;">
                                    ทางบริษัทฯ หวังเป็นอย่างยิ่งว่าข้อมูลประชาสัมพันธ์นี้จะเป็นประโยชน์ต่อการวางแผนจัดงานครั้งถัดไปของคุณลูกค้า
                                </p>
                            </td>
                        </tr>
                    </table>

                </div>
            </td>
        </tr>
    </table>

</body>
</html>`
  }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function paginationItems(page: number, total: number) {
  const visible = new Set([1, total, page - 1, page, page + 1].filter((n) => n >= 1 && n <= total));
  const items: (number | "…")[] = [];
  let prev = 0;
  Array.from(visible).sort((a, b) => a - b).forEach((n) => {
    if (prev && n - prev > 1) items.push("…");
    items.push(n);
    prev = n;
  });
  return items;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function campaignStatusMeta(s: string) {
  if (s === "SENT") return { label: "ส่งแล้ว", color: "var(--success)", bg: "rgba(16,185,129,0.08)" };
  if (s === "FAILED") return { label: "ล้มเหลว", color: "var(--danger)", bg: "rgba(239,68,68,0.08)" };
  if (s === "SENDING") return { label: "กำลังส่ง", color: "var(--brand)", bg: "rgba(14,165,233,0.08)" };
  return { label: "ร่างแคมเปญ", color: "var(--muted)", bg: "rgba(148,163,184,0.08)" };
}

function fieldSx() {
  return {
    "& .MuiInputBase-root": {
      bgcolor: "rgba(0,0,0,0.02)",
      color: "var(--foreground)",
      fontSize: "0.82rem",
      borderRadius: "10px",
      transition: "all 0.15s ease",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(148,163,184,0.15)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(14,165,233,0.3)",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--brand)",
      borderWidth: 1.5,
    },
    "& .MuiInputLabel-root": {
      color: "var(--muted)",
      fontSize: "0.78rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--brand)",
    },
  };
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fileToAttachment(file: File): Promise<Attachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve({ filename: file.name, contentType: file.type || "application/octet-stream", base64, size: file.size });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function compilePreview(html: string) {
  let preview = html;
  preview = preview.replaceAll("{{contact_name}}", '<strong style="color: #0ea5e9; background: rgba(14,165,233,0.08); padding: 1px 4px; border-radius: 4px; font-weight: 600;">คุณสมชาย ใจดี</strong>');
  preview = preview.replaceAll("{{company_name}}", '<strong style="color: #8b5cf6; background: rgba(139,92,246,0.08); padding: 1px 4px; border-radius: 4px; font-weight: 600;">บริษัท มั่งมี คอร์ปอเรชัน</strong>');
  preview = preview.replaceAll("{{email}}", '<strong style="color: #64748b; background: rgba(100,116,139,0.08); padding: 1px 4px; border-radius: 4px; font-family: monospace;">somchai@mungmee.co.th</strong>');
  return preview;
}

// ─── AttachmentZone Component ────────────────────────────────────────────────

function AttachmentZone({ attachments, onChange }: { attachments: Attachment[]; onChange: (a: Attachment[]) => void }) {
  const [dragging, setDragging] = useState(false);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const newOnes = await Promise.all(Array.from(files).map(fileToAttachment));
    onChange([...attachments, ...newOnes]);
  }

  function remove(idx: number) {
    onChange(attachments.filter((_, i) => i !== idx));
  }

  return (
    <Box>
      <Typography sx={{ color: "var(--foreground)", fontSize: "0.76rem", fontWeight: 700, mb: 1 }}>
        เอกสารแนบ (เอกสาร PDF / สไลด์ / รูปภาพ)
      </Typography>

      <Box
        component="label"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 1, p: 2.5, borderRadius: "12px", cursor: "pointer",
          border: `2px dashed ${dragging ? "var(--brand)" : "rgba(148,163,184,0.2)"}`,
          bgcolor: dragging ? "rgba(14,165,233,0.04)" : "rgba(0,0,0,0.01)",
          transition: "all 0.2s ease-in-out",
          "&:hover": { borderColor: "var(--brand)", bgcolor: "rgba(14,165,233,0.02)" },
        }}
      >
        <input type="file" multiple hidden accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={(e) => addFiles(e.target.files)} />
        <Box sx={{ p: 1, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.03)", color: dragging ? "var(--brand)" : "var(--muted)", transition: "all 0.15s" }}>
          <Paperclip size={18} />
        </Box>
        <Typography sx={{ color: "var(--foreground)", fontSize: "0.8rem", fontWeight: 600 }}>
          คลิกหรือลากไฟล์มาวางที่นี่เพื่อแนบไฟล์
        </Typography>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem" }}>
          PDF, Word, Excel, รูปภาพ - สูงสุด 10 MB / ไฟล์
        </Typography>
      </Box>

      {attachments.length > 0 && (
        <Stack spacing={1} sx={{ mt: 1.5 }}>
          {attachments.map((a, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: "center", gap: 1.5, px: 2, py: 1, borderRadius: "10px", bgcolor: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
              <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "rgba(14,165,233,0.1)", color: "var(--brand)", display: "grid", placeItems: "center" }}>
                <ImageIcon size={14} />
              </Box>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.8rem", fontWeight: 600, flex: 1, minWidth: 0 }} noWrap>
                {a.filename}
              </Typography>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.7rem" }}>{formatBytes(a.size)}</Typography>
              <IconButton size="small" onClick={() => remove(i)} sx={{ p: 0.25, color: "var(--muted)", "&:hover": { color: "var(--danger)", bgcolor: "rgba(239,68,68,0.08)" } }}>
                <X size={14} />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
}

// ─── TemplateDialog Component ────────────────────────────────────────────────

function TemplateDialog({
  open, onClose, initial, onSaved,
}: {
  open: boolean;
  onClose: () => void;
  initial?: EmailTemplate | null;
  onSaved: (t: EmailTemplate) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [subject, setSubject] = useState(initial?.subject ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [boilerplateConfirmTarget, setBoilerplateConfirmTarget] = useState<{ subject: string, body: string } | null>(null);

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setSubject(initial?.subject ?? "");
      setBody(initial?.body ?? "");
      setErr("");
    }
  }, [open, initial]);

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) { setErr("เฉพาะไฟล์รูปภาพเท่านั้น"); return; }
    setUploading(true);
    try {
      const processedFile = await resizeAndCompressImage(file);
      const fd = new FormData();
      fd.append("file", processedFile);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      const imgTag = `<img src="${data.url}" alt="${processedFile.name}" style="max-width:100%; height:auto; display:block; margin:8px 0; border-radius: 8px;">`;
      setBody((prev) => prev + "\n" + imgTag);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!name.trim() || !subject.trim() || !body.trim()) {
      setErr("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setSaving(true);
    try {
      const url = initial ? `/api/email-templates/${initial.id}` : "/api/email-templates";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, subject, body }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      onSaved(data.template);
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  }

  function insertTag(tag: string) {
    setBody((prev) => prev + tag);
  }

  return (<>
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "18px", height: "92vh", display: "flex", flexDirection: "column", overflow: "hidden" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2, px: 3, flexShrink: 0 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: "rgba(14,165,233,0.08)", color: "var(--brand)", display: "grid", placeItems: "center" }}>
            <FileText size={16} />
          </Box>
          <Box>
            <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "1.05rem" }}>
              {initial ? "แก้ไข Template โครงร่างจดหมาย" : "สร้าง Template โครงร่างจดหมายใหม่"}
            </Typography>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.72rem" }}>
              ออกแบบโครงร่างอีเมลพร้อมผสานแท็กตัวแปรเฉพาะคน
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--muted)", bgcolor: "rgba(0,0,0,0.02)", "&:hover": { bgcolor: "rgba(0,0,0,0.05)" } }}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: "var(--line)" }} />

      <DialogContent sx={{ p: 3, flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, gap: 3.5, flex: 1, minHeight: 0 }}>

          {/* Left Column: Form Editor */}
          <Stack spacing={2} sx={{ height: "100%", overflowY: "auto", pr: { md: 1.5 } }}>
            {err && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "var(--danger-bg)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", p: 1.25 }}>
                <AlertCircle size={14} style={{ color: "var(--danger)", flexShrink: 0 }} />
                <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 500 }}>{err}</Typography>
              </Stack>
            )}

            <TextField label="ชื่อ Template" placeholder="เช่น เทมเพลตเสนอราคา BITEC" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" sx={fieldSx()} />

            <TextField
              label="Subject (หัวข้ออีเมล)" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth size="small"
              placeholder="เช่น สวัสดีคุณ {{contact_name}} — ยินดีต้อนรับร่วมโครงการ"
              sx={fieldSx()}
            />

            {/* Quick Boilerplates Selection */}
            <Box>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.74rem", fontWeight: 700, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
                <Sparkles size={12} style={{ color: "var(--brand)" }} /> เลือกโครงร่างเริ่มต้น (Boilerplates)
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                {BOILERPLATES.map((bp) => (
                  <Button
                    key={bp.name}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      if (!body.trim()) {
                        setSubject(bp.subject);
                        setBody(bp.body);
                      } else {
                        setBoilerplateConfirmTarget({ subject: bp.subject, body: bp.body });
                      }
                    }}
                    sx={{
                      color: "var(--muted)",
                      borderColor: "var(--line)",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      px: 1.5,
                      py: 0.5,
                      "&:hover": {
                        borderColor: "var(--brand)",
                        color: "var(--brand)",
                        bgcolor: "rgba(14,165,233,0.04)"
                      }
                    }}
                  >
                    {bp.name}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Toolbar Tags & Media */}
            <Box>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "var(--foreground)", fontSize: "0.74rem", fontWeight: 700 }}>
                  แท็กข้อมูลสำหรับเชื่อมโยง (Merge Tags)
                </Typography>

                <Box component="label" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.5, py: 0.5, borderRadius: "8px", cursor: "pointer", bgcolor: uploading ? "rgba(14,165,233,0.08)" : "rgba(0,0,0,0.02)", border: "1px solid var(--line)", "&:hover": { bgcolor: "rgba(14,165,233,0.05)", borderColor: "rgba(14,165,233,0.3)" }, transition: "all 0.15s" }}>
                  <input type="file" hidden accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }} />
                  {uploading ? <CircularProgress size={12} sx={{ color: "var(--brand)" }} /> : <ImageIcon size={13} style={{ color: "var(--brand)" }} />}
                  <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.72rem", fontWeight: 700 }}>
                    {uploading ? "กำลังอัปโหลด..." : "แทรกรูปภาพ"}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {MERGE_TAGS.map((m) => (
                  <Chip
                    key={m.tag} label={`${m.tag} (${m.label})`} size="small"
                    onClick={() => insertTag(m.tag)}
                    sx={{ cursor: "pointer", borderRadius: "6px", bgcolor: "rgba(14,165,233,0.08)", color: "var(--brand-dark)", fontWeight: 600, border: "1px solid rgba(14,165,233,0.2)", fontSize: "0.7rem", "&:hover": { bgcolor: "rgba(14,165,233,0.15)" } }}
                  />
                ))}
              </Box>
            </Box>

            <TextField
              label="เนื้อหาจดหมาย (รองรับ HTML และ Plain Text)"
              value={body} onChange={(e) => setBody(e.target.value)}
              fullWidth multiline rows={12} size="small"
              placeholder={"เขียนโค้ด HTML ตัวอย่าง:\n<p>สวัสดีคุณ {{contact_name}},</p>\n<p>ยินดีต้อนรับร่วมงานสัมมนา...</p>"}
              sx={{
                ...fieldSx(),
                flex: 1,
                minHeight: 0,
                "& .MuiInputBase-root": { fontFamily: "Consolas, Monaco, monospace", fontSize: "0.8rem", color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.015)", borderRadius: "10px", height: "100%", alignItems: "flex-start" },
                "& .MuiInputBase-input": { resize: "none", height: "100% !important", overflow: "auto !important" },
                "& .MuiFormControl-root": { height: "100%" },
              }}
            />
          </Stack>

          {/* Right Column: Real-Time Preview */}
          <Stack spacing={1.5} sx={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }}>
            <Typography sx={{ color: "var(--foreground)", fontSize: "0.76rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.75 }}>
              <Eye size={14} style={{ color: "var(--brand)" }} /> แสดงตัวอย่างแบบเรียลไทม์ (Live HTML Preview)
            </Typography>

            <Box sx={{
              flex: 1,
              bgcolor: "#ffffff",
              borderRadius: "14px",
              border: "1px solid var(--line)",
              overflow: "auto",
              p: 2.5,
              display: "block",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.03)",
              minHeight: 300
            }}>
              {body.trim() ? (
                <div dangerouslySetInnerHTML={{ __html: compilePreview(body) }} />
              ) : (
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--muted)", gap: 1, py: 6 }}>
                  <Eye size={32} style={{ opacity: 0.3 }} />
                  <Typography sx={{ fontSize: "0.8rem" }}>ป้อนเนื้อความจดหมายเพื่อแสดงตัวอย่าง</Typography>
                </Box>
              )}
            </Box>
          </Stack>

        </Box>
      </DialogContent>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <Box sx={{ p: 2.5, px: 3, display: "flex", justifyContent: "flex-end", gap: 1.5, flexShrink: 0 }}>
        <Button onClick={onClose} size="small" sx={{ color: "var(--muted)", textTransform: "none", fontWeight: 600 }}>ยกเลิก</Button>
        <Button onClick={save} disabled={saving} size="small" variant="contained"
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 700, px: 3.5, py: 0.75, borderRadius: "8px", "&:hover": { bgcolor: "#0284c7" } }}>
          {saving ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : "บันทึกเทมเพลต"}
        </Button>
      </Box>
    </Dialog>

    {/* ── Overwrite Boilerplate Confirmation Dialog ── */}
    <Dialog
      open={Boolean(boilerplateConfirmTarget)}
      onClose={() => setBoilerplateConfirmTarget(null)}
      slotProps={{
        paper: {
          sx: {
            bgcolor: "var(--panel-solid)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            p: 1.5,
            maxWidth: 400,
            boxShadow: "var(--shadow-md)",
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
        <Box sx={{ width: 34, height: 34, borderRadius: "50%", bgcolor: "rgba(245,158,11,0.1)", display: "grid", placeItems: "center", color: "var(--warning)" }}>
          <AlertCircle size={16} />
        </Box>
        <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.95rem" }}>เขียนทับเนื้อหาเดิม?</Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.5 }}>
          การเลือกโครงร่างใหม่จะ<strong>เขียนทับเนื้อความเดิมทั้งหมด</strong>ที่พิมพ์อยู่ในปัจจุบัน คุณต้องการดำเนินการต่อหรือไม่?
        </Typography>
      </DialogContent>
      <Divider sx={{ borderColor: "var(--line)" }} />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          size="small"
          onClick={() => setBoilerplateConfirmTarget(null)}
          sx={{ color: "var(--muted)", textTransform: "none", border: "1px solid var(--line)", borderRadius: "8px", px: 2 }}
        >
          ยกเลิก
        </Button>
        <Button
          size="small"
          onClick={() => {
            if (boilerplateConfirmTarget) {
              setSubject(boilerplateConfirmTarget.subject);
              setBody(boilerplateConfirmTarget.body);
            }
            setBoilerplateConfirmTarget(null);
          }}
          variant="contained"
          sx={{
            bgcolor: "var(--warning)",
            color: "#fff",
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            "&:hover": { bgcolor: "rgba(245,158,11,0.9)" },
          }}
        >
          เขียนทับเนื้อความ
        </Button>
      </Box>
    </Dialog>
  </>
  );
}

// ─── PreviewDialog Component ─────────────────────────────────────────────────

function PreviewDialog({ open, onClose, subject, body }: { open: boolean; onClose: () => void; subject: string; body: string }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      slotProps={{ paper: { sx: { bgcolor: "var(--panel-solid)", border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-md)" } } }}>

      {/* Mock Client Topbar */}
      <Box sx={{ bgcolor: "#f1f5f9", px: 2.5, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ef4444" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#eab308" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#22c55e" }} />
          <Typography sx={{ color: "var(--muted)", fontSize: "0.74rem", fontWeight: 650, pl: 1.5, fontFamily: "Consolas, monospace" }}>
            inbox_preview_message.eml
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--muted)", bgcolor: "rgba(0,0,0,0.03)", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}><X size={15} /></IconButton>
      </Box>

      {/* Mock Client Headers */}
      <Box sx={{ p: 2.5, borderBottom: "1px solid var(--line)", bgcolor: "var(--panel-solid)" }}>
        <Stack spacing={1.25}>
          <Stack direction="row" sx={{ alignItems: "flex-start" }}>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 600, minWidth: 60, mt: 0.25 }}>หัวข้อ:</Typography>
            <Typography sx={{ color: "var(--foreground)", fontSize: "0.92rem", fontWeight: 700 }}>
              {subject || "(ไม่มีหัวข้อ)"}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 600, minWidth: 60 }}>จาก:</Typography>
            <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.8rem", fontWeight: 600 }}>
              SetEventThailand Company &lt;noreply@seteventthailand.com&gt;
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 600, minWidth: 60 }}>ถึง:</Typography>
            <Typography sx={{ color: "var(--foreground)", fontSize: "0.8rem" }}>
              {"{{contact_name}} <{{email}} >"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Mock Client Body Frame */}
      <DialogContent sx={{ p: 0, bgcolor: "#f8fafc", minHeight: 320, overflow: "auto" }}>
        {body.trim() ? (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <Box sx={{ py: 8, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--muted)" }}>
            <Typography sx={{ fontSize: "0.85rem" }}>(เทมเพลตนี้ว่างเปล่า)</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── TemplatesTab Component ──────────────────────────────────────────────────

function TemplatesTab() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EmailTemplate | null>(null);
  const [previewT, setPreviewT] = useState<EmailTemplate | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EmailTemplate | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/email-templates");
      const data = await res.json();
      setTemplates(data.templates ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleting(id);
    try {
      const res = await fetch(`/api/email-templates/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "เกิดข้อผิดพลาดในการลบแม่แบบโครงร่าง");
        return;
      }
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setDeleting(null);
    }
  }

  function onSaved(t: EmailTemplate) {
    setTemplates((prev) => {
      const idx = prev.findIndex((x) => x.id === t.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = t; return next; }
      return [t, ...prev];
    });
  }

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem", fontWeight: 500 }}>
          พบทั่งหมด {templates.length} รูปแบบแคมเปญ
        </Typography>
        <Button size="small" startIcon={<Plus size={14} />} variant="contained"
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 700, borderRadius: "8px", px: 2.5, py: 0.75, fontSize: "0.8rem", "&:hover": { bgcolor: "#0284c7" } }}>
          สร้างแม่แบบเทมเพลต
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
      ) : templates.length === 0 ? (
        <Box sx={{
          textAlign: "center", py: 8, bgcolor: "var(--panel)", border: "1px dashed var(--line)", borderRadius: "14px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1
        }}>
          <FileText size={42} style={{ color: "var(--muted)", opacity: 0.3 }} />
          <Typography sx={{ color: "var(--muted)", fontSize: "0.88rem" }}>ยังไม่มีแม่แบบจดหมายในระบบ</Typography>
          <Button size="small" variant="text" onClick={() => { setEditing(null); setDialogOpen(true); }} sx={{ color: "var(--brand)", textTransform: "none", fontWeight: 600 }}>สร้างรูปแบบจดหมายแรกของคุณ ➔</Button>
        </Box>
      ) : (
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 2.5
        }}>
          {/* Create template visual placeholder card */}
          <Paper
            onClick={() => { setEditing(null); setDialogOpen(true); }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 185,
              border: "2.5px dashed rgba(14, 165, 233, 0.2)",
              bgcolor: "rgba(14, 165, 233, 0.015)",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "var(--brand)",
                bgcolor: "rgba(14, 165, 233, 0.04)",
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-glow)",
              }
            }}
          >
            <Box sx={{ p: 1, borderRadius: "50%", bgcolor: "rgba(14,165,233,0.08)", color: "var(--brand)", mb: 1 }}>
              <Plus size={20} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--brand-dark)" }}>สร้างเทมเพลตใหม่</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "var(--muted)", mt: 0.5 }}>บันทึกร่างอีเมลไว้ใช้งานด่วน</Typography>
          </Paper>

          {templates.map((t) => (
            <Paper key={t.id}
              sx={{
                position: "relative",
                bgcolor: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "var(--shadow-card)",
                transition: "all 0.22s ease-in-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 185,
                "&:hover": {
                  transform: "translateY(-2px)",
                  borderColor: "rgba(14, 165, 233, 0.3)",
                  boxShadow: "var(--shadow-md), var(--shadow-glow)",
                }
              }}
            >
              {/* Top Accent line */}
              <Box sx={{ height: 4, background: "linear-gradient(90deg, var(--brand) 0%, var(--accent) 100%)" }} />

              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, alignItems: "center" }}>
                  <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: "rgba(14,165,233,0.08)", color: "var(--brand)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <FileText size={16} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.88rem", mb: 0.25 }} noWrap>{t.name}</Typography>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem" }}>อัปเดต {fmtDate(t.updatedAt)}</Typography>
                  </Box>
                </Stack>

                <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.78rem", fontWeight: 600, mb: 1 }} noWrap>
                  Subject: {t.subject}
                </Typography>

                <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                  <Chip label={`ขนาด ${formatBytes(t.body.length)}`} size="small" sx={{ height: 18, fontSize: "0.66rem", bgcolor: "rgba(0,0,0,0.03)", color: "var(--muted)", borderRadius: "4px" }} />
                  <Chip label={`แท็กตัวแปร`} size="small" sx={{ height: 18, fontSize: "0.66rem", bgcolor: "rgba(14,165,233,0.05)", color: "var(--brand-dark)", borderRadius: "4px", fontWeight: 500 }} />
                </Stack>
              </Box>

              <Divider sx={{ borderColor: "var(--line)" }} />

              <Box sx={{ px: 1.5, py: 1, bgcolor: "rgba(0,0,0,0.015)", display: "flex", justifyContent: "flex-end", gap: 0.25 }}>
                <Tooltip title="ดูตัวอย่าง">
                  <IconButton size="small" onClick={() => setPreviewT(t)} sx={{ color: "var(--muted)", "&:hover": { color: "var(--brand)", bgcolor: "rgba(14,165,233,0.08)" } }}>
                    <Eye size={14} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="แก้ไข">
                  <IconButton size="small" onClick={() => { setEditing(t); setDialogOpen(true); }} sx={{ color: "var(--muted)", "&:hover": { color: "var(--warning)", bgcolor: "rgba(245,158,11,0.08)" } }}>
                    <Pencil size={14} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="ลบ">
                  <IconButton size="small" onClick={() => setDeleteTarget(t)} disabled={deleting === t.id} sx={{ color: "var(--muted)", "&:hover": { color: "var(--danger)", bgcolor: "rgba(239,68,68,0.08)" } }}>
                    {deleting === t.id ? <CircularProgress size={12} /> : <Trash2 size={14} />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <TemplateDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initial={editing} onSaved={onSaved} />
      {previewT && <PreviewDialog open={!!previewT} onClose={() => setPreviewT(null)} subject={previewT.subject} body={previewT.body} />}

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => deleting === null && setDeleteTarget(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--panel-solid)",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              p: 1.5,
              maxWidth: 400,
              boxShadow: "var(--shadow-md)",
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
          <Box sx={{ width: 34, height: 34, borderRadius: "50%", bgcolor: "rgba(239,68,68,0.1)", display: "grid", placeItems: "center", color: "var(--danger)" }}>
            <Trash2 size={16} />
          </Box>
          <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "0.95rem" }}>ยืนยันลบแม่แบบโครงร่าง</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.5 }}>
            คุณแน่ใจหรือไม่ว่าต้องการลบแม่แบบโครงร่าง <strong>{deleteTarget?.name}</strong>?
          </Typography>
          <Typography sx={{ color: "var(--danger)", fontSize: "0.78rem", mt: 0.75, fontWeight: 550 }}>
            ⚠️ คำเตือน: แคมเปญร่างที่อ้างอิงแม่แบบนี้อาจได้รับผลกระทบ
          </Typography>
        </DialogContent>
        <Divider sx={{ borderColor: "var(--line)" }} />
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            size="small"
            disabled={deleting !== null}
            onClick={() => setDeleteTarget(null)}
            sx={{ color: "var(--muted)", textTransform: "none", border: "1px solid var(--line)", borderRadius: "8px", px: 2 }}
          >
            ยกเลิก
          </Button>
          <Button
            size="small"
            disabled={deleting !== null}
            onClick={confirmDelete}
            variant="contained"
            startIcon={deleting !== null ? <CircularProgress size={13} sx={{ color: "#fff" }} /> : <Trash2 size={13} />}
            sx={{
              bgcolor: "var(--danger)",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              "&:hover": { bgcolor: "var(--danger-hover)" },
            }}
          >
            {deleting !== null ? "กำลังลบ..." : "ลบแม่แบบ"}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

// ─── Send Campaign Tab ───────────────────────────────────────────────────────

const SENDERS = [
  { id: "setevent", label: "SetEventThailand", email: "noreply@seteventthailand.com", formatted: "SetEventThailand <noreply@seteventthailand.com>" }
];

type SendStep = "compose" | "contacts" | "confirm" | "done";

const wizardSteps = [
  { key: "compose", label: "ข้อมูลแคมเปญ", icon: FileText },
  { key: "contacts", label: "เลือกผู้รับ", icon: Users },
  { key: "confirm", label: "ยืนยันการส่ง", icon: Eye },
  { key: "done", label: "เสร็จสิ้น", icon: CheckCircle2 }
];

function SendCampaignTab() {
  const [step, setStep] = useState<SendStep>("compose");
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingT, setLoadingT] = useState(true);
  const [loadingC, setLoadingC] = useState(false);

  const [campaignName, setCampaignName] = useState("");
  const [templateId, setTemplateId] = useState<number | "">("");
  const [senderId, setSenderId] = useState("setevent");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [filterEmail, setFilterEmail] = useState(true);
  const [search, setSearch] = useState("");

  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ campaignId?: number; sent?: number; failed?: number; queued?: boolean; total?: number } | null>(null);
  const [sendErr, setSendErr] = useState("");
  const [page, setPage] = useState(1);

  const selectedSender = SENDERS.find((s) => s.id === senderId) ?? SENDERS[0];

  useEffect(() => {
    setPage(1);
  }, [search, filterEmail]);

  useEffect(() => {
    (async () => {
      setLoadingT(true);
      const res = await fetch("/api/email-templates");
      const data = await res.json();
      setTemplates(data.templates ?? []);
      setLoadingT(false);
    })();
  }, []);

  useEffect(() => {
    if (!result?.queued || !result?.campaignId || step !== "done") return;

    const timer = setInterval(async () => {
      try {
        const res = await fetch(`/api/email-campaigns?id=${result.campaignId}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status !== "SENDING") {
          setResult({
            campaignId: result.campaignId,
            sent: data.sent,
            failed: data.failed,
            queued: false,
            total: result.total,
          });
          clearInterval(timer);
        }
      } catch (err) {
        console.error("[Poll Campaign Status Error]", err);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [result, step]);

  async function loadContacts() {
    setLoadingC(true);
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data.contacts ?? []);
    setLoadingC(false);
  }

  function goToContacts() {
    if (!campaignName.trim() || !templateId) return;
    if (contacts.length === 0) loadContacts();
    setStep("contacts");
  }

  const selectedTemplate = templates.find((t) => t.id === templateId) ?? null;

  const filteredContacts = contacts.filter((c) => {
    if (filterEmail && !c.email) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.companyName.toLowerCase().includes(q) || (c.contactName ?? "").toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  const CONTACTS_PER_PAGE = 20;
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE));
  const paginatedContacts = filteredContacts.slice((page - 1) * CONTACTS_PER_PAGE, page * CONTACTS_PER_PAGE);
  const pgItems = paginationItems(page, totalPages);

  function toggleContact(id: string | number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    const allIds = filteredContacts.map((c) => c.id);
    const allSelected = allIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds((prev) => { const next = new Set(prev); allIds.forEach((id) => next.delete(id)); return next; });
    } else {
      setSelectedIds((prev) => { const next = new Set(prev); allIds.forEach((id) => next.add(id)); return next; });
    }
  }

  async function send() {
    const recipients = contacts
      .filter((c) => selectedIds.has(c.id) && c.email)
      .map((c) => ({ email: c.email!, name: c.contactName ?? undefined, company: c.companyName }));

    if (!recipients.length) { setSendErr("ไม่มีรายชื่อที่มีอีเมลปลายทางสำหรับการจัดส่งแคมเปญ"); return; }

    setSending(true);
    setSendErr("");
    try {
      const res = await fetch("/api/email-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, name: campaignName, recipients, attachments, fromAddress: selectedSender.formatted }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setResult({ campaignId: data.campaignId, sent: data.sent, failed: data.failed, queued: data.queued, total: data.total });
      setStep("done");
    } catch (e: unknown) {
      setSendErr(e instanceof Error ? e.message : "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep("compose");
    setCampaignName("");
    setTemplateId("");
    setSenderId("setevent");
    setAttachments([]);
    setSelectedIds(new Set());
    setSearch("");
    setResult(null);
    setSendErr("");
    setContacts([]);
  }

  const recipientsWithEmail = contacts.filter((c) => selectedIds.has(c.id) && c.email);
  const recipientsNoEmail = contacts.filter((c) => selectedIds.has(c.id) && !c.email);

  const currentStepIdx = wizardSteps.findIndex((s) => s.key === step);

  return (
    <Box>
      {/* Premium Stepper Wizard */}
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 4.5,
        pb: 3,
        borderBottom: "1px dashed var(--line)"
      }}>
        {wizardSteps.map((s, idx) => {
          const StepIcon = s.icon;
          const isActive = s.key === step;
          const isCompleted = currentStepIdx > idx;
          const isUpcoming = currentStepIdx < idx;

          return (
            <Box key={s.key} sx={{ display: "flex", alignItems: "center", flex: idx < wizardSteps.length - 1 ? 1 : "none" }}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", position: "relative" }}>
                <Box sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  transition: "all 0.25s ease-in-out",
                  bgcolor: isActive
                    ? "var(--brand)"
                    : isCompleted
                      ? "var(--success)"
                      : "rgba(0,0,0,0.04)",
                  color: isActive || isCompleted ? "#fff" : "var(--muted)",
                  boxShadow: isActive
                    ? "0 0 10px rgba(14, 165, 233, 0.4)"
                    : isCompleted
                      ? "0 0 10px rgba(16, 185, 129, 0.35)"
                      : "none"
                }}>
                  <StepIcon size={14} />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography sx={{
                    fontSize: "0.78rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--foreground)" : "var(--muted)",
                    lineHeight: 1
                  }}>
                    {s.label}
                  </Typography>
                </Box>
              </Stack>
              {idx < wizardSteps.length - 1 && (
                <Box sx={{
                  flex: 1,
                  height: 2,
                  mx: { xs: 1.5, sm: 3 },
                  bgcolor: isCompleted ? "var(--success)" : "rgba(148, 163, 184, 0.15)",
                  transition: "all 0.25s ease"
                }} />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Content Renderers */}
      {step === "compose" && (
        <Box sx={{ maxWidth: 660 }}>
          <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem", mb: 2 }}>
            ระบุรายละเอียดแคมเปญและแม่แบบจดหมาย
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="ชื่อแคมเปญ (Campaign Name)" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} fullWidth size="small"
              placeholder="เช่น ส่งเชิญงาน BITEC Q3 - ผู้จัดงานกลุ่มไอที"
              sx={fieldSx()}
            />

            <Paper sx={{ bgcolor: "rgba(14,165,233,0.04)", border: "1px dashed rgba(14,165,233,0.25)", borderRadius: "10px", p: 2 }}>
              <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700, mb: 0.5, letterSpacing: "0.02em" }}>ส่งในนามบริษัท (SENDER IDENTITY)</Typography>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 600 }}>{selectedSender.label} ({selectedSender.email})</Typography>
            </Paper>

            <FormControl fullWidth size="small" sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(148,163,184,0.15)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(14,165,233,0.3)" },
              "& .MuiInputLabel-root": { color: "var(--muted)", fontSize: "0.78rem" },
              "& .MuiInputLabel-root.Mui-focused": { color: "var(--brand)" },
              "& .MuiSelect-select": { color: "var(--foreground)", fontSize: "0.82rem" },
            }}>
              <InputLabel>เลือกโครงร่างอีเมล (Email Template)</InputLabel>
              <Select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value as number)}
                label="เลือกโครงร่างอีเมล (Email Template)"
                sx={{ bgcolor: "rgba(0,0,0,0.015)", borderRadius: "10px", "& .MuiSvgIcon-root": { color: "var(--muted)" } }}
                MenuProps={{ slotProps: { paper: { sx: { bgcolor: "#ffffff", border: "1px solid var(--line)", borderRadius: "8px" } } } }}
              >
                {loadingT ? (
                  <MenuItem disabled><CircularProgress size={14} /></MenuItem>
                ) : templates.length === 0 ? (
                  <MenuItem disabled sx={{ color: "var(--muted)" }}>ไม่มีโครงร่างจดหมาย กรุณาสร้างที่แถบ Templates ก่อน</MenuItem>
                ) : templates.map((t) => (
                  <MenuItem key={t.id} value={t.id} sx={{ color: "var(--foreground)", fontSize: "0.82rem" }}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedTemplate && (
              <Paper sx={{ bgcolor: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: "10px", p: 2 }}>
                <Typography sx={{ color: "var(--muted)", fontSize: "0.68rem", fontWeight: 700, mb: 0.5, letterSpacing: "0.02em" }}>หัวข้อจดหมายที่จัดส่ง (SUBJECT)</Typography>
                <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.85rem", fontWeight: 600 }}>{selectedTemplate.subject}</Typography>
              </Paper>
            )}

            <AttachmentZone attachments={attachments} onChange={setAttachments} />

            <Button
              size="medium" variant="contained" endIcon={<ChevronRight size={14} />}
              disabled={!campaignName.trim() || !templateId} onClick={goToContacts}
              sx={{
                alignSelf: "flex-start", bgcolor: "var(--brand)", textTransform: "none", fontWeight: 700,
                borderRadius: "8px", px: 3, py: 1, mt: 1.5, "&:hover": { bgcolor: "#0284c7" }, "&.Mui-disabled": { opacity: 0.4 }
              }}
            >
              ขั้นตอนถัดไป: เลือกรายชื่อ Contacts
            </Button>
          </Stack>
        </Box>
      )}

      {step === "contacts" && (
        <Box>
          <Stack direction="row" sx={{ alignItems: "center", mb: 2.5 }} spacing={1}>
            <IconButton size="small" onClick={() => setStep("compose")} sx={{ color: "var(--muted)", bgcolor: "rgba(0,0,0,0.03)" }}><ChevronLeft size={16} /></IconButton>
            <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>
              เลือกรายชื่อผู้ติดต่อที่ต้องการส่งแคมเปญ
            </Typography>
          </Stack>

          <Paper sx={{ p: 2, bgcolor: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", mb: 2.5, boxShadow: "var(--shadow-card)" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
              <Stack direction="row" spacing={2} sx={{ flex: 1, minWidth: 280, alignItems: "center" }}>
                <TextField
                  size="small" placeholder="ค้นหาตามบริษัท, ชื่อผู้ติดต่อ หรืออีเมล..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ flex: 1, ...fieldSx() }}
                />
                <FormControlLabel
                  control={<Checkbox checked={filterEmail} onChange={(e) => setFilterEmail(e.target.checked)} size="small" sx={{ color: "var(--muted)", "&.Mui-checked": { color: "var(--brand)" } }} />}
                  label={<Typography sx={{ color: "var(--foreground)", fontSize: "0.8rem", fontWeight: 500 }}>แสดงเฉพาะที่มีอีเมล</Typography>}
                />
              </Stack>

              <Button size="small" variant="outlined" onClick={toggleAll}
                sx={{ color: "var(--brand)", borderColor: "rgba(14,165,233,0.3)", borderRadius: "8px", textTransform: "none", fontSize: "0.78rem", px: 2, py: 0.75, whiteSpace: "nowrap" }}>
                {filteredContacts.every((c) => selectedIds.has(c.id)) ? "ยกเลิกการเลือกทั้งหมด" : "เลือกทั้งหมดตามผลลัพธ์"}
              </Button>
            </Box>
          </Paper>

          <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", mb: 1.5, fontWeight: 500 }}>
            เลือกไว้ทั้งหมด <strong style={{ color: "var(--brand-dark)" }}>{selectedIds.size}</strong> รายการ · พร้อมส่ง (มีอีเมล) <strong style={{ color: "var(--success)" }}>{recipientsWithEmail.length}</strong> รายการ
          </Typography>

          {loadingC ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
          ) : (
            <Stack spacing={2.5}>
              <TableContainer component={Paper} sx={{ bgcolor: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "rgba(0,0,0,0.02)" }}>
                      <TableCell padding="checkbox" sx={{ width: 50, py: 1.5 }}>
                        <Checkbox
                          size="small"
                          checked={filteredContacts.length > 0 && filteredContacts.every((c) => selectedIds.has(c.id))}
                          indeterminate={filteredContacts.some((c) => selectedIds.has(c.id)) && !filteredContacts.every((c) => selectedIds.has(c.id))}
                          onChange={toggleAll}
                          sx={{ color: "rgba(0,0,0,0.15)", "&.Mui-checked": { color: "var(--brand)" } }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--foreground)", py: 1.5 }}>ชื่อบริษัท / องค์กร</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--foreground)", py: 1.5 }}>ชื่อผู้ติดต่อ</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--foreground)", py: 1.5 }}>อีเมล</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--foreground)", py: 1.5 }}>จัดส่งล่าสุดเมื่อ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedContacts.map((c) => {
                      const checked = selectedIds.has(c.id);
                      return (
                        <TableRow
                          key={c.id}
                          hover
                          onClick={() => toggleContact(c.id)}
                          sx={{
                            cursor: "pointer",
                            bgcolor: checked ? "rgba(14,165,233,0.02) !important" : "inherit",
                            transition: "background-color 0.15s ease"
                          }}
                        >
                          <TableCell padding="checkbox" sx={{ py: 1.25 }}>
                            <Checkbox
                              checked={checked}
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                              onChange={() => toggleContact(c.id)}
                              sx={{ color: "rgba(0,0,0,0.15)", "&.Mui-checked": { color: "var(--brand)" } }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)", py: 1.25 }}>
                            {c.companyName}
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.8rem", color: "var(--muted)", py: 1.25 }}>
                            {c.contactName || "—"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.8rem", py: 1.25 }}>
                            {c.email ? (
                              <Typography sx={{ fontSize: "0.8rem", color: "var(--brand-dark)", fontWeight: 550 }}>
                                {c.email}
                              </Typography>
                            ) : (
                              <Chip
                                label="ไม่มีข้อมูลอีเมล"
                                size="small"
                                sx={{ height: 18, fontSize: "0.62rem", bgcolor: "var(--danger-bg)", color: "var(--danger)", borderRadius: "4px", fontWeight: 600 }}
                              />
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: "0.8rem", color: "var(--muted)", py: 1.25 }}>
                            {c.lastSentAt ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <Clock size={12} style={{ color: "var(--brand)" }} /> {fmtDate(c.lastSentAt)}
                              </span>
                            ) : (
                              <span style={{ opacity: 0.5 }}>ยังไม่เคยส่ง</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredContacts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 6, color: "var(--muted)" }}>
                          ไม่พบข้อมูลผู้ติดต่อตามคำค้นหา
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination controls inside Step 2 */}
              {totalPages > 1 && (
                <Stack direction="row" className="tableFooter" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, flexWrap: "wrap", gap: 2 }}>
                  <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 550 }}>
                    แสดง {(page - 1) * CONTACTS_PER_PAGE + 1} - {Math.min(page * CONTACTS_PER_PAGE, filteredContacts.length)} จากทั้งหมด {filteredContacts.length} รายการ
                  </Typography>

                  <Stack direction="row" className="paginationControls" spacing={0.5} sx={{ alignItems: "center" }}>
                    <IconButton size="small" className="paginationIcon" disabled={page === 1} onClick={() => setPage(1)}>
                      <ChevronsLeft size={14} />
                    </IconButton>
                    <IconButton size="small" className="paginationIcon" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                      <ChevronLeft size={14} />
                    </IconButton>

                    <Stack direction="row" className="paginationPages" spacing={0.5} sx={{ alignItems: "center" }}>
                      {pgItems.map((item, idx) => (
                        item === "…" ? (
                          <Box key={`ellipsis-${idx}`} component="span" className="paginationEllipsis">...</Box>
                        ) : (
                          <Button
                            key={item}
                            size="small"
                            className={item === page ? "paginationPage paginationPageActive" : "paginationPage"}
                            onClick={() => setPage(item as number)}
                            sx={{ minWidth: 30, height: 30, p: 0 }}
                          >
                            {item}
                          </Button>
                        )
                      ))}
                    </Stack>

                    <IconButton size="small" className="paginationIcon" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                      <ChevronRight size={14} />
                    </IconButton>
                    <IconButton size="small" className="paginationIcon" disabled={page === totalPages} onClick={() => setPage(totalPages)}>
                      <ChevronsRight size={14} />
                    </IconButton>
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}

          <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid var(--line)" }}>
            <Button
              size="medium" variant="contained" endIcon={<ChevronRight size={14} />}
              disabled={recipientsWithEmail.length === 0} onClick={() => setStep("confirm")}
              sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 700, borderRadius: "8px", px: 3.5, py: 1, "&:hover": { bgcolor: "#0284c7" }, "&.Mui-disabled": { opacity: 0.4 } }}>
              ขั้นตอนถัดไป: ตรวจสอบข้อมูลก่อนส่ง ({recipientsWithEmail.length} รายชื่อ)
            </Button>
          </Box>
        </Box>
      )}

      {step === "confirm" && (
        <Box sx={{ maxWidth: 620 }}>
          <Stack direction="row" sx={{ alignItems: "center", mb: 2.5 }} spacing={1}>
            <IconButton size="small" onClick={() => setStep("contacts")} sx={{ color: "var(--muted)", bgcolor: "rgba(0,0,0,0.03)" }}><ChevronLeft size={16} /></IconButton>
            <Typography sx={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem" }}>
              ตรวจสอบรายละเอียดและยืนยันจัดส่งอีเมล
            </Typography>
          </Stack>

          <Stack spacing={2.5}>
            <Paper sx={{ bgcolor: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
              <Box sx={{ p: 2, bgcolor: "rgba(0,0,0,0.01)", borderBottom: "1px solid var(--line)" }}>
                <Typography sx={{ color: "var(--foreground)", fontWeight: 750, fontSize: "0.85rem" }}>สรุปรายละเอียดแคมเปญ (Campaign Receipt)</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ชื่อแคมเปญ:</Typography>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 700 }}>{campaignName}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ส่งในนามบริษัท:</Typography>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 700 }}>
                      {selectedSender.label} ({selectedSender.email})
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>โครงร่างจดหมาย:</Typography>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem" }}>{selectedTemplate?.name}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>หัวข้ออีเมล:</Typography>
                    <Typography sx={{ color: "var(--brand-dark)", fontSize: "0.82rem", fontWeight: 600 }}>{selectedTemplate?.subject}</Typography>
                  </Stack>

                  <Divider sx={{ my: 0.5, borderColor: "var(--line)" }} />

                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>จำนวนผู้รับที่พร้อมส่ง:</Typography>
                    <Typography sx={{ color: "var(--success)", fontSize: "0.85rem", fontWeight: 800 }}>{recipientsWithEmail.length} รายชื่อ</Typography>
                  </Stack>
                  {recipientsNoEmail.length > 0 && (
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ข้ามไป (ไม่มีอีเมล):</Typography>
                      <Typography sx={{ color: "var(--danger)", fontSize: "0.82rem" }}>{recipientsNoEmail.length} รายชื่อ</Typography>
                    </Stack>
                  )}
                  {attachments.length > 0 && (
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                      <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>ไฟล์แนบเพิ่มเติม:</Typography>
                      <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 650 }}>{attachments.length} ไฟล์</Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Paper>

            {recipientsNoEmail.length > 0 && (
              <Stack direction="row" spacing={1.5} sx={{ bgcolor: "var(--warning-bg)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "10px", p: 2, alignItems: "flex-start" }}>
                <AlertCircle size={16} style={{ color: "var(--warning)", flexShrink: 0, marginTop: 2 }} />
                <Typography sx={{ color: "var(--foreground)", fontSize: "0.76rem" }}>
                  มีข้อมูลผู้ติดต่อ <strong>{recipientsNoEmail.length} รายชื่อ</strong> ถูกละเว้นการจัดส่งเนื่องจากไม่มีข้อมูลอีเมลปลายทางที่ถูกต้อง
                </Typography>
              </Stack>
            )}

            {sendErr && (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", bgcolor: "var(--danger-bg)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", p: 1.5 }}>
                <AlertCircle size={14} style={{ color: "var(--danger)", flexShrink: 0 }} />
                <Typography sx={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 500 }}>{sendErr}</Typography>
              </Stack>
            )}

            <Button
              size="large" variant="contained" startIcon={sending ? <CircularProgress size={14} sx={{ color: "#fff" }} /> : <Send size={14} />}
              disabled={sending} onClick={send}
              sx={{ bgcolor: "var(--success)", textTransform: "none", fontWeight: 700, borderRadius: "8px", py: 1.25, "&:hover": { bgcolor: "#059669" }, "&.Mui-disabled": { opacity: 0.5 } }}>
              {sending ? "กำลังประมวลผลการจัดส่ง..." : `ยืนยันและส่งอีเมลออก (${recipientsWithEmail.length} ฉบับ)`}
            </Button>
          </Stack>
        </Box>
      )}

      {step === "done" && (
        <Box sx={{ maxWidth: 500, textAlign: "center", py: 5, mx: "auto" }}>
          {/* Animated SVG Success Mark Container */}
          <Box sx={{ display: "inline-flex", p: 2, borderRadius: "50%", bgcolor: "rgba(16,185,129,0.08)", color: "var(--success)", mb: 2 }}>
            <CheckCircle2 size={46} />
          </Box>
          <Typography sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "1.15rem", mb: 1 }}>
            ส่งอีเมลแคมเปญเสร็จสมบูรณ์!
          </Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem", mb: 3 }}>
            ระบบได้เริ่มดำเนินการจัดส่งอีเมลและบันทึกประวัติลงฐานข้อมูลเรียบร้อยแล้ว
          </Typography>

          {result && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              {result.queued ? (
                <Chip
                  icon={<CircularProgress size={12} sx={{ color: "var(--brand) !important" }} />}
                  label={`ระบบกำลังดำเนินการจัดส่งทั้งหมด ${result.total} ฉบับในเบื้องหลัง...`}
                  sx={{ bgcolor: "rgba(14,165,233,0.08)", color: "var(--brand-dark)", fontWeight: 700, borderRadius: "6px", p: 1, "& .MuiChip-icon": { color: "inherit" } }}
                />
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Chip label={`✓ ส่งสำเร็จ ${result.sent} ฉบับ`} sx={{ bgcolor: "rgba(16,185,129,0.08)", color: "var(--success)", fontWeight: 700, borderRadius: "6px" }} />
                  {result.failed && result.failed > 0 ? (
                    <Chip label={`✗ ล้มเหลว ${result.failed} ฉบับ`} sx={{ bgcolor: "rgba(239,68,68,0.08)", color: "var(--danger)", fontWeight: 700, borderRadius: "6px" }} />
                  ) : null}
                </Box>
              )}
            </Box>
          )}

          <Button size="medium" variant="contained" onClick={reset}
            sx={{ bgcolor: "var(--brand)", textTransform: "none", fontWeight: 700, borderRadius: "8px", px: 4, py: 1, "&:hover": { bgcolor: "#0284c7" } }}>
            สร้างแคมเปญใหม่
          </Button>
        </Box>
      )}
    </Box>
  );
}

// ─── Campaigns History Tab ───────────────────────────────────────────────────

const CAMP_PAGE_SIZE = 10;

function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCampaigns = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/email-campaigns");
      const data = await res.json();
      setCampaigns(data.campaigns ?? []);
    } catch (err) {
      console.error("[fetchCampaigns Error]", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns(true);
  }, [fetchCampaigns]);

  useEffect(() => {
    const hasSending = campaigns.some((c) => c.status === "SENDING");
    if (!hasSending) return;
    const timer = setInterval(() => { fetchCampaigns(false); }, 3000);
    return () => clearInterval(timer);
  }, [campaigns, fetchCampaigns]);

  const totalPages = Math.max(1, Math.ceil(campaigns.length / CAMP_PAGE_SIZE));
  const pageItems = campaigns.slice((page - 1) * CAMP_PAGE_SIZE, page * CAMP_PAGE_SIZE);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress size={28} sx={{ color: "var(--brand)" }} /></Box>
      ) : campaigns.length === 0 ? (
        <Box sx={{
          textAlign: "center", py: 8, bgcolor: "var(--panel)", border: "1px dashed var(--line)", borderRadius: "14px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1
        }}>
          <Mail size={42} style={{ color: "var(--muted)", opacity: 0.3 }} />
          <Typography sx={{ color: "var(--muted)", fontSize: "0.88rem" }}>ยังไม่เคยมีประวัติการจัดส่งแคมเปญอีเมล</Typography>
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ color: "var(--muted)", fontSize: "0.75rem" }}>
              ทั้งหมด <strong style={{ color: "var(--foreground)" }}>{campaigns.length}</strong> รายการ (100 ล่าสุด)
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ bgcolor: "var(--panel)", border: "1px solid var(--line)", borderRadius: "12px", boxShadow: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ "& th": { bgcolor: "rgba(0,0,0,0.02)", color: "var(--muted)", fontWeight: 700, fontSize: "0.72rem", borderBottom: "1px solid var(--line)", py: 1.25 } }}>
                  <TableCell>#</TableCell>
                  <TableCell>ชื่อแคมเปญ</TableCell>
                  <TableCell>เทมเพลต</TableCell>
                  <TableCell align="center">ผู้รับ</TableCell>
                  <TableCell align="center">สถานะ</TableCell>
                  <TableCell>วันที่ส่ง</TableCell>
                  <TableCell>วันที่สร้าง</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageItems.map((c, idx) => {
                  const meta = campaignStatusMeta(c.status);
                  const rowNum = (page - 1) * CAMP_PAGE_SIZE + idx + 1;
                  return (
                    <TableRow key={c.id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.015)" }, "& td": { borderBottom: "1px solid var(--line)", py: 1, fontSize: "0.78rem", color: "var(--foreground)" } }}>
                      <TableCell sx={{ color: "var(--muted) !important", fontSize: "0.7rem !important" }}>{rowNum}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--foreground)" }}>{c.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: c.template ? "var(--foreground)" : "var(--muted) !important", fontStyle: c.template ? "normal" : "italic" }}>
                        {c.template?.name || "เทมเพลตถูกลบแล้ว"}
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={`${c._count.recipients} คน`} size="small" sx={{ fontSize: "0.66rem", height: 18, borderRadius: "4px", bgcolor: "rgba(0,0,0,0.04)", color: "var(--muted)" }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={meta.label} size="small" sx={{ bgcolor: meta.bg, color: meta.color, fontWeight: 700, fontSize: "0.66rem", height: 20, borderRadius: "6px" }} />
                      </TableCell>
                      <TableCell sx={{ color: "var(--muted) !important", fontSize: "0.72rem !important" }}>
                        {c.sentAt ? fmtDate(c.sentAt) : "—"}
                      </TableCell>
                      <TableCell sx={{ color: "var(--muted) !important", fontSize: "0.72rem !important" }}>
                        {fmtDate(c.createdAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 2 }}>
              <IconButton size="small" disabled={page === 1} onClick={() => setPage(1)} sx={{ color: "var(--muted)" }}>
                <ChevronsLeft size={15} />
              </IconButton>
              <IconButton size="small" disabled={page === 1} onClick={() => setPage(p => p - 1)} sx={{ color: "var(--muted)" }}>
                <ChevronLeft size={15} />
              </IconButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | "…")[]>((acc, p, i, arr) => {
                  if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <Typography key={`ellipsis-${i}`} sx={{ color: "var(--muted)", fontSize: "0.78rem", px: 0.5 }}>…</Typography>
                  ) : (
                    <Button
                      key={p}
                      size="small"
                      variant={p === page ? "contained" : "text"}
                      onClick={() => setPage(p as number)}
                      sx={{
                        minWidth: 30, height: 30, p: 0, fontSize: "0.75rem", fontWeight: 600,
                        borderRadius: "8px",
                        ...(p === page
                          ? { bgcolor: "var(--brand)", color: "#fff", "&:hover": { bgcolor: "#0284c7" } }
                          : { color: "var(--muted)", "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } })
                      }}
                    >
                      {p}
                    </Button>
                  )
                )}
              <IconButton size="small" disabled={page === totalPages} onClick={() => setPage(p => p + 1)} sx={{ color: "var(--muted)" }}>
                <ChevronRight size={15} />
              </IconButton>
              <IconButton size="small" disabled={page === totalPages} onClick={() => setPage(totalPages)} sx={{ color: "var(--muted)" }}>
                <ChevronsRight size={15} />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function EmailPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box className="dashboardPage">
      {/* Premium Header */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ alignItems: { xs: "flex-start", sm: "center" }, mb: 4 }}>
        <Box sx={{ width: 46, height: 46, borderRadius: "12px", bgcolor: "rgba(14,165,233,0.1)", border: "1.5px solid rgba(14,165,233,0.2)", display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "var(--shadow-glow)" }}>
          <Mail size={22} style={{ color: "var(--brand)" }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            Email Campaigns Manager
          </Typography>
          <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem", mt: 0.25 }}>
            ออกแบบแม่แบบจดหมายและจัดส่งอีเมลประชาสัมพันธ์กลุ่มเป้าหมายผู้ติดต่อพร้อมกันอย่างมีประสิทธิภาพ
          </Typography>
        </Box>
      </Stack>

      {/* Styled Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3.5,
          borderBottom: "1px solid var(--line)",
          "& .MuiTabs-indicator": { bgcolor: "var(--brand)", height: 3, borderRadius: "3px 3px 0 0" },
          "& .MuiTab-root": { color: "var(--muted)", textTransform: "none", fontWeight: 700, fontSize: "0.85rem", minWidth: 0, px: 3, py: 1.5, transition: "all 0.15s ease" },
          "& .Mui-selected": { color: "var(--brand) !important" },
        }}
      >
        <Tab label="แม่แบบจดหมาย (Templates)" icon={<FileText size={14} />} iconPosition="start" />
        <Tab label="ส่งแคมเปญ (Send Campaign)" icon={<Send size={14} />} iconPosition="start" />
        <Tab label="ประวัติส่ง (History Logs)" icon={<Clock size={14} />} iconPosition="start" />
      </Tabs>

      <Box sx={{ bgcolor: "transparent" }}>
        {tab === 0 && <TemplatesTab />}
        {tab === 1 && <SendCampaignTab />}
        {tab === 2 && <CampaignsTab />}
      </Box>
    </Box>
  );
}

function resizeAndCompressImage(file: File, maxDim: number = 1200, maxSize: number = 1 * 1024 * 1024): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }
    if (file.type.includes("svg")) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width <= maxDim && height <= maxDim && file.size <= maxSize) {
          resolve(file);
          return;
        }

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const outputMime = file.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = 0.85;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const ext = outputMime === "image/png" ? ".png" : ".jpg";
              let baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              const newName = baseName + ext;

              const resizedFile = new File([blob], newName, {
                type: outputMime,
                lastModified: Date.now(),
              });

              if (resizedFile.size > maxSize && outputMime === "image/png") {
                const jpegCanvas = document.createElement("canvas");
                jpegCanvas.width = width;
                jpegCanvas.height = height;
                const jpegCtx = jpegCanvas.getContext("2d");
                if (jpegCtx) {
                  jpegCtx.fillStyle = "#ffffff";
                  jpegCtx.fillRect(0, 0, width, height);
                  jpegCtx.drawImage(img, 0, 0, width, height);
                  jpegCanvas.toBlob(
                    (jpegBlob) => {
                      if (jpegBlob) {
                        const finalFile = new File([jpegBlob], baseName + ".jpg", {
                          type: "image/jpeg",
                          lastModified: Date.now(),
                        });
                        resolve(finalFile);
                      } else {
                        resolve(resizedFile);
                      }
                    },
                    "image/jpeg",
                    0.75
                  );
                } else {
                  resolve(resizedFile);
                }
              } else {
                resolve(resizedFile);
              }
            } else {
              resolve(file);
            }
          },
          outputMime,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
