import React, { useState, useMemo } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { Button } from './FormElements';

const SAMPLE_CLUBS = [
  { name: 'Advise Wise Mortgage Club', reference: 'MC201491', postCode: 'LS15 8ZB', active: 'Yes' },
  { name: 'Advise Wise Plus Mortgage Club', reference: 'MC201493', postCode: 'LS15 8ZB', active: 'Yes' },
  { name: 'Advise Wise Tier 3', reference: 'ER201592', postCode: 'LS15 8ZB', active: 'Yes' },
  { name: 'Air Mortgage Club', reference: 'ER200411', postCode: 'GL1 1UD', active: 'Yes' },
  { name: 'Air Platinum Club', reference: 'ER200971', postCode: 'GL1 1UD', active: 'Yes' },
  { name: 'Air Tier 3', reference: 'ER201511', postCode: 'GL1 1UD', active: 'Yes' },
  { name: 'Air Tier 4', reference: 'MC201611', postCode: 'GL1 1UD', active: 'Yes' },
  { name: 'Bower Special Deal 2013', reference: 'MC200750', postCode: 'CM5 0GA', active: 'Yes' },
  { name: 'Brilliant Solutions', reference: 'MC201571', postCode: 'PE2 6PZ', active: 'Yes' },
  { name: 'Connect Mortgage Club', reference: 'MC200320', postCode: 'EC2A 4HD', active: 'Yes' },
  { name: 'Direct Life Mortgage Club', reference: 'MC200890', postCode: 'SW1A 1AA', active: 'Yes' },
  { name: 'Elite Financial Club', reference: 'ER201750', postCode: 'M1 4BT', active: 'Yes' },
  { name: 'Falcon Tier 2', reference: 'MC201820', postCode: 'B1 1BB', active: 'Yes' },
  { name: 'Guardian Mortgage Network', reference: 'ER200155', postCode: 'LS1 4AP', active: 'Yes' },
  { name: 'Horizon Platinum Club', reference: 'MC201930', postCode: 'CF10 1EP', active: 'Yes' },
];

interface ClubModalProps {
  onClose: () => void;
}

export default function ClubModal({ onClose }: ClubModalProps) {
  const [clubName, setClubName] = useState('');
  const [clubReference, setClubReference] = useState('');
  const [postCode, setPostCode] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = useMemo(() => {
    return SAMPLE_CLUBS.filter(club => {
      const matchName = !clubName || club.name.toLowerCase().includes(clubName.toLowerCase());
      const matchRef = !clubReference || club.reference.toLowerCase().includes(clubReference.toLowerCase());
      const matchPost = !postCode || club.postCode.toLowerCase().includes(postCode.toLowerCase());
      return matchName && matchRef && matchPost;
    });
  }, [clubName, clubReference, postCode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose} role="dialog" aria-label="Add / Search Clubs">
      <div className="bg-[#f0f0f0] border border-[#BBBBBB] rounded-lg shadow-2xl w-[640px]" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="bg-[#00263e] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
          <span className="text-sm font-semibold font-sans">Add / Search Clubs</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-end gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans">Club Name</label>
              <input
                type="text"
                value={clubName}
                onChange={e => setClubName(e.target.value)}
                autoFocus
                className="w-[200px] border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 hover:border-[#178830] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans">Club Reference</label>
              <input
                type="text"
                value={clubReference}
                onChange={e => setClubReference(e.target.value)}
                className="w-[150px] border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 hover:border-[#178830] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans">Post Code</label>
              <input
                type="text"
                value={postCode}
                onChange={e => setPostCode(e.target.value)}
                className="w-[120px] border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 hover:border-[#178830] transition-colors"
              />
            </div>
          </div>

          <div className="border border-[#BBBBBB] rounded-lg overflow-hidden mb-4">
            <div className="max-h-[260px] overflow-y-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#002f5c] sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-white font-sans border-b-[3px] border-[#04589b]">Club Name</th>
                    <th className="px-3 py-2 font-semibold text-white font-sans border-b-[3px] border-[#04589b]">Club Reference</th>
                    <th className="px-3 py-2 font-semibold text-white font-sans border-b-[3px] border-[#04589b]">Post Code</th>
                    <th className="px-3 py-2 font-semibold text-white font-sans border-b-[3px] border-[#04589b]">Active</th>
                  </tr>
                </thead>
                <tbody className="font-[Mulish]">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-6 text-[#979797]">No clubs found.</td></tr>
                  ) : (
                    filtered.map((club, i) => (
                      <tr
                        key={club.reference}
                        onClick={() => setSelectedIndex(i)}
                        onDoubleClick={onClose}
                        className={`cursor-pointer transition-colors border-b border-[#BBBBBB]/20 ${
                          i === selectedIndex
                            ? 'bg-[#05579B] text-white'
                            : i % 2 === 1
                              ? 'bg-[#e7ebec]/20 hover:bg-[#05579B] hover:text-white'
                              : 'bg-white hover:bg-[#05579B] hover:text-white'
                        }`}
                      >
                        <td className="px-3 py-1.5">{club.name}</td>
                        <td className="px-3 py-1.5">{club.reference}</td>
                        <td className="px-3 py-1.5">{club.postCode}</td>
                        <td className="px-3 py-1.5">{club.active}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button>
              <Plus className="w-4 h-4" /> New
            </Button>
            <Button variant="secondary">
              <Pencil className="w-4 h-4" /> Edit
            </Button>
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" /> Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
