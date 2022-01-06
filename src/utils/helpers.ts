import { Loop, LoopKey } from 'types';

export function getLoopByKey(loopKey: LoopKey, loops: Loop[]) {
  return loops.find((loop) => loop.properties.key === loopKey);
}
