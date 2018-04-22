export interface Label {
  id: number;
  name: string;
  hasChildren: boolean;
  parentId: number;
}

export interface LabeledItem {
  labels:Label[];
}

export interface LabeledItemService {
  addLabel:(item:LabeledItem, label:Label)=>Promise<void>;
  removeLabel:(item:LabeledItem, label:Label)=>Promise<void>;
}

export interface LabelTreeNode extends Label {
  children: LabelTreeNode[];
}
