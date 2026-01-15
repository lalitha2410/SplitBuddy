import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGroupStore from "../store/useGroupStore";
import { motion } from "framer-motion";

export default function CreateGroup() {
  const navigate = useNavigate();
  const addGroup = useGroupStore((s) => s.addGroup);

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([""]);

  const addMember = () => setMembers([...members, ""]);
  const updateMember = (i, v) => {
    const updated = [...members];
    updated[i] = v;
    setMembers(updated);
  };

  const submit = () => {
    if (!groupName.trim()) return alert("Enter group name");
    if (members.some((m) => !m.trim())) return alert("Fill all names");

    const id = crypto.randomUUID();
    addGroup({ id, name: groupName, members });
    navigate(`/group/${id}`);
  };

  return (
    <div className="hero-center pt-28 bg-[#EEF8F1]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          bg-white/70 backdrop-blur-lg 
          border border-[#0F3D2E]/15 shadow-lg rounded-2xl
          max-w-lg w-full p-8 space-y-6
        "
      >
        <h2 className="text-2xl font-bold text-center text-[#0F3D2E]">
          Create Group
        </h2>

        <input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 rounded-xl border border-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/30 outline-none"
        />

        <div className="space-y-2">
          {members.map((m, i) => (
            <input
              key={i}
              placeholder={`Member ${i + 1}`}
              value={m}
              onChange={(e) => updateMember(i, e.target.value)}
              className="w-full p-2 rounded-xl border border-[#0F3D2E]/20 focus:ring-2 focus:ring-[#0F3D2E]/30 outline-none"
            />
          ))}
          <button className="text-sm text-[#0F3D2E]" onClick={addMember}>
            + Add Member
          </button>
        </div>

        <button
          onClick={submit}
          className="w-full py-2 bg-[#0F3D2E] text-white rounded-xl hover:bg-[#0D3328] transition font-medium"
        >
          Create
        </button>
      </motion.div>
    </div>
  );
}
