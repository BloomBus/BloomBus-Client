function getLoop(loopKey, loops) {
  return loops.find(loop => loop.properties.key === loopKey);
}

export { getLoop };
