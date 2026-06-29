"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pencil, Plus, Trash2, UserRoundPlus, UsersRound } from "lucide-react";

type UserRecord = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type UserForm = {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const emptyForm: UserForm = {
  name: "",
  email: "",
  role: "USER",
  password: "",
  confirmPassword: "",
};

type UserListResponse = {
  users: UserRecord[];
  currentUserId: number;
};

async function fetchUserList(): Promise<UserListResponse> {
  const response = await fetch("/api/users", { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
  return data;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);

  const loadUsers = async () => {
    try {
      const data = await fetchUserList();
      setUsers(data.users);
      setCurrentUserId(data.currentUserId);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    let active = true;

    void fetchUserList()
      .then((data) => {
        if (!active) return;
        setUsers(data.users);
        setCurrentUserId(data.currentUserId);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setDialogOpen(true);
  };

  const openEditDialog = (user: UserRecord) => {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (!saving) setDialogOpen(false);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setSaving(true);
    try {
      const isEditing = Boolean(editingUser);
      const response = await fetch(isEditing ? `/api/users/${editingUser?.id}` : "/api/users", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          password: form.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "บันทึกผู้ใช้ไม่สำเร็จ");

      setDialogOpen(false);
      setSuccess(isEditing ? "แก้ไขผู้ใช้เรียบร้อยแล้ว" : "เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว");
      await loadUsers();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "บันทึกผู้ใช้ไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    setDeleting(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`/api/users/${deleteUser.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "ลบผู้ใช้ไม่สำเร็จ");

      setDeleteUser(null);
      setSuccess("ลบผู้ใช้เรียบร้อยแล้ว");
      await loadUsers();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "ลบผู้ใช้ไม่สำเร็จ");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1180, mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3, alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--foreground)" }}>
            จัดการผู้ใช้
          </Typography>
          <Typography sx={{ mt: 0.5, color: "var(--muted)", fontSize: "0.9rem" }}>
            เพิ่ม แก้ไข กำหนดสิทธิ์ และลบบัญชีผู้ใช้งานระบบ
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={openCreateDialog}
          sx={{
            px: 2.25,
            py: 1.1,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
          }}
        >
          เพิ่มผู้ใช้ใหม่
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-card)",
          overflow: "hidden",
          background: "var(--panel-solid)",
        }}
      >
        <Stack direction="row" sx={{ px: 2.5, py: 2, alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <UsersRound size={20} color="var(--brand)" />
            <Typography sx={{ fontWeight: 700, color: "var(--foreground)" }}>รายชื่อผู้ใช้</Typography>
          </Stack>
          <Chip label={`${users.length} บัญชี`} size="small" sx={{ fontWeight: 700 }} />
        </Stack>

        {loading ? (
          <Stack sx={{ minHeight: 300, alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size={30} />
          </Stack>
        ) : users.length === 0 ? (
          <Stack spacing={1.25} sx={{ minHeight: 300, alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            <UserRoundPlus size={38} />
            <Typography>ยังไม่มีผู้ใช้ในระบบ</Typography>
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ผู้ใช้</TableCell>
                  <TableCell>สิทธิ์</TableCell>
                  <TableCell>วันที่สร้าง</TableCell>
                  <TableCell align="right">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  const isCurrentUser = user.id === currentUserId;
                  const initials = (user.name || user.email).slice(0, 2).toUpperCase();
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          <Avatar sx={{ width: 36, height: 36, fontSize: "0.78rem", fontWeight: 800, bgcolor: "var(--brand-light)", color: "var(--brand-dark)" }}>
                            {initials}
                          </Avatar>
                          <Box>
                            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                              <Typography className="tablePrimary">{user.name || "ไม่ระบุชื่อ"}</Typography>
                              {isCurrentUser && <Chip label="คุณ" size="small" color="primary" sx={{ height: 20, fontSize: "0.65rem" }} />}
                            </Stack>
                            <Typography className="tableSecondary">{user.email}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role === "ADMIN" ? "ผู้ดูแลระบบ" : "ผู้ใช้งาน"}
                          size="small"
                          color={user.role === "ADMIN" ? "primary" : "default"}
                          variant={user.role === "ADMIN" ? "filled" : "outlined"}
                          sx={{ fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(user.createdAt))}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="แก้ไขผู้ใช้">
                          <IconButton size="small" onClick={() => openEditDialog(user)} sx={{ color: "var(--brand)" }}>
                            <Pencil size={17} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={isCurrentUser ? "ไม่สามารถลบบัญชีที่กำลังใช้งาน" : "ลบผู้ใช้"}>
                          <span>
                            <IconButton
                              size="small"
                              disabled={isCurrentUser}
                              onClick={() => setDeleteUser(user)}
                              sx={{ color: "var(--danger)" }}
                            >
                              <Trash2 size={17} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <form onSubmit={handleSave}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingUser ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.25} sx={{ pt: 1 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="ชื่อผู้ใช้"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
                fullWidth
                disabled={saving}
              />
              <TextField
                label="อีเมล"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
                fullWidth
                disabled={saving}
              />
              <FormControl fullWidth disabled={saving || editingUser?.id === currentUserId}>
                <InputLabel id="user-role-label">สิทธิ์การใช้งาน</InputLabel>
                <Select
                  labelId="user-role-label"
                  label="สิทธิ์การใช้งาน"
                  value={form.role}
                  onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                >
                  <MenuItem value="USER">ผู้ใช้งาน</MenuItem>
                  <MenuItem value="ADMIN">ผู้ดูแลระบบ</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={editingUser ? "รหัสผ่านใหม่ (เว้นว่างหากไม่เปลี่ยน)" : "รหัสผ่าน"}
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required={!editingUser}
                fullWidth
                disabled={saving}
                slotProps={{ htmlInput: { minLength: 8 } }}
              />
              <TextField
                label="ยืนยันรหัสผ่าน"
                type="password"
                value={form.confirmPassword}
                onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                required={!editingUser || Boolean(form.password)}
                fullWidth
                disabled={saving}
                slotProps={{ htmlInput: { minLength: 8 } }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeDialog} disabled={saving} sx={{ color: "var(--muted)" }}>ยกเลิก</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
              sx={{ fontWeight: 700 }}
            >
              {saving ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={Boolean(deleteUser)} onClose={() => !deleting && setDeleteUser(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>ยืนยันการลบผู้ใช้</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Typography>
            ต้องการลบบัญชี <strong>{deleteUser?.name || deleteUser?.email}</strong> ใช่หรือไม่? การดำเนินการนี้ย้อนกลับไม่ได้
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteUser(null)} disabled={deleting}>ยกเลิก</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} color="inherit" /> : <Trash2 size={17} />}
          >
            {deleting ? "กำลังลบ..." : "ลบผู้ใช้"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}