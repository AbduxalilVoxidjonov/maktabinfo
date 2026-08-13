import { ToggleRow } from './ToggleRow';

export interface PaidToggleProps {
  paid: boolean;
  onToggle: () => void;
}

/** Forma.dc.html: pullik/bepul almashtirgich — sarlavha va izoh dinamik */
export function PaidToggle({ paid, onToggle }: PaidToggleProps) {
  return (
    <ToggleRow
      checked={paid}
      onToggle={onToggle}
      title={paid ? "Pullik ta'lim" : "Bepul ta'lim"}
      hint={paid ? "Oylik to'lov miqdorini kiriting" : "Davlat maktabi, to'lov olinmaydi"}
    />
  );
}

export default PaidToggle;
