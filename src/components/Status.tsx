export enum ItemStatus {
  Avaliable,
  InUse,
  OverDue,
}

function itemStatusToColor(status: ItemStatus): string {
  switch (status) {
    case ItemStatus.Avaliable:
      return "bg-[#ECFDF5]";
    case ItemStatus.InUse:
      return "bg-[#FDFBEC]";
    case ItemStatus.OverDue:
      return "bg-[#FEF2F2]";
  }
}

function itemStatusToText(status: ItemStatus): string {
  switch (status) {
    case ItemStatus.Avaliable:
      return "Laos";
    case ItemStatus.InUse:
      return "Väljas";
    case ItemStatus.OverDue:
      return "Üle aja";
  }
}

export function itemStatusFromText(text: string): ItemStatus {
    switch(text) {
        case "avaliable": return ItemStatus.Avaliable
        case "inUse": return ItemStatus.InUse
        case "overDue": return ItemStatus.OverDue
    }

    return ItemStatus.Avaliable
}

export interface StatusProps {
  status: ItemStatus;
}

export default function Status({ status }: StatusProps) {
  return (
      <span className={`flex-auto ${itemStatusToColor(status)} font-semibold text-sm p-1.5 rounded-lg`}>
        {itemStatusToText(status)}
      </span>
  );
}
