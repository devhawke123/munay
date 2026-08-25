import { useState } from "react";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Store, Users, UserPlus, Trash2, X, Pencil } from "lucide-react";
import { StatCard } from "../components/ui/StatCard";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { FormField } from "../components/products/FormField";

const TABS = [
  { id: "store", label: "Store Info", icon: Store },
  { id: "team", label: "Team", icon: Users },
];

function StaticField({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      <p className="text-md text-text-primary">{value}</p>
    </div>
  );
}

type TeamMember = {
  id: string;
  name: string;
  email: string;
  isOwner: boolean;
  role: string;
};

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  { id: "1", name: "Sofia Ruiz", email: "sofia@munay.co", isOwner: true, role: "Owner" },
];

function MemberFormModal({
  member,
  onCancel,
  onSave,
}: {
  member?: TeamMember;
  onCancel: () => void;
  onSave: (member: { name: string; email: string; role: string }) => void;
}) {
  const isEdit = !!member;
  const [name, setName] = useState(member?.name ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [role, setRole] = useState(member?.role ?? "Admin");

  function handleSubmit() {
    if (!name.trim() || !email.trim()) return;
    onSave({ name, email, role });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-[12px] bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <h2 className="text-base font-display font-bold text-text-primary">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>
          <button type="button" onClick={onCancel} className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <FormField
            tone="white"
            label="Full Name"
            placeholder="e.g. Sofia Ruiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormField
            tone="white"
            label="Email"
            type="email"
            placeholder="e.g. sofia@munay.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-[10px] border border-brand-border bg-white px-4 py-2.5 text-sm text-text-primary outline-none focus:border-brand/40"
            >
              <option>Admin</option>
              <option>Editor</option>
            </select>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-brand-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-[10px] border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Cancel
          </button>
          <PrimaryButton
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim() || !email.trim()}
            className="!h-10 !py-0 !pl-5 !pr-5 text-sm"
          >
            {isEdit ? "Save Changes" : "Add Member"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState("store");
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  function removeMember(id: string) {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  }

  function addMember(member: { name: string; email: string; role: string }) {
    setTeamMembers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), isOwner: false, ...member },
    ]);
    setIsAddMemberOpen(false);
  }

  function saveEditedMember(member: { name: string; email: string; role: string }) {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === editingMember?.id ? { ...m, ...member } : m)),
    );
    setEditingMember(null);
  }

  return (
    <AdminLayout>
      <div className="mb-12">
        <h1 className="text-2xl font-display font-bold text-text-primary">
          Settings
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Configure your store, team, and preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-brand-border mb-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-base font-semibold border-b-2 transition-colors ${
                isActive
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "store" && (
        <div className="grid grid-cols-2 gap-10 pr-0">
          {/* Store Identity */}
          <div className="rounded-card border border-brand-border bg-white p-6 shadow-card">
            <p className="text-sm font-display font-bold text-text-primary">
              Store Identity
            </p>
            <p className="text-xs text-text-muted mt-1 mb-5">
              Public-facing information about your brand
            </p>

            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-2 gap-4">
                <StaticField label="Store Name" value="Munay Fashion" />
                <StaticField label="Store URL" value="munay.co" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StaticField label="Support Email" value="hello@munay.co" />
                <StaticField label="Support Phone" value="+51 (1) 234-5678" />
              </div>
            </div>
          </div>

          {/* Business Address */}
          <div className="rounded-card border border-brand-border bg-white p-6 shadow-card">
            <p className="text-sm font-display font-bold text-text-primary">
              Business Address
            </p>
            <p className="text-xs text-text-muted mt-1 mb-5">
              Used for invoices, receipts, and shipping labels
            </p>

            <div className="flex flex-col gap-6">
              <StaticField label="Address Line 1" value="Av. Larco 1301" />
              <div className="grid grid-cols-2 gap-4">
                <StaticField label="Address Line 2" value="—" />
                <StaticField label="City" value="Miraflores" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StaticField label="State / Region" value="Lima" />
                <StaticField label="Zip / Postal Code" value="15074" />
              </div>
              <StaticField label="Country" value="Peru" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-5">
            <StatCard label="Total Users" value={String(teamMembers.length)} icon={Users} />
          </div>

          <div className="rounded-card border border-brand-border bg-white p-6 shadow-card">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-display font-bold text-text-primary">Team Members</p>
              <PrimaryButton
                icon={<UserPlus size={15} />}
                className="!h-9 !py-0 !pl-4 !pr-5 text-sm"
                onClick={() => setIsAddMemberOpen(true)}
              >
                Add Member
              </PrimaryButton>
            </div>

            <table className="w-full table-fixed text-left text-sm">
              <thead>
                <tr className="border-b border-brand-border text-xs text-text-muted">
                  <th className="w-[40%] pb-3 font-medium">Member</th>
                  <th className="w-[20%] pb-3 font-medium">Role</th>
                  <th className="w-[20%] pb-3 text-center font-medium">Manage</th>
                  <th className="w-[20%] pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-brand-border last:border-0">
                    <td className="py-3">
                      <span className="text-sm font-medium text-text-primary">{member.name}</span>
                      <p className="text-xs text-text-muted">{member.email}</p>
                    </td>
                    <td className="py-3 text-text-muted">{member.role}</td>
                    <td className="py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => setEditingMember(member)}
                          className="flex h-7 w-7 items-center justify-center rounded-panel text-text-muted hover:bg-brand-soft/60"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => removeMember(member.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-panel text-brand-dark hover:bg-brand-soft/60"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isAddMemberOpen && (
        <MemberFormModal onCancel={() => setIsAddMemberOpen(false)} onSave={addMember} />
      )}

      {editingMember && (
        <MemberFormModal
          member={editingMember}
          onCancel={() => setEditingMember(null)}
          onSave={saveEditedMember}
        />
      )}
    </AdminLayout>
  );
}