interface CharacteristicEventTarget extends EventTarget {
  value: DataView;
}

export interface CharacteristicEvent extends Event {
  target: CharacteristicEventTarget;
}
