let snapshots = []
let currentSnapshotIndex = -1
let freezeSnapshots = false

export function takeSnapshot(nodes, edges, network) {
  if (freezeSnapshots) return
  if (!nodes || !edges || !network) return

  const snapshot = { nodes, edges, network }
  const newSnapshots = [
    ...snapshots.splice(0, currentSnapshotIndex + 1),
    snapshot,
    ...snapshots
  ]

  snapshots = newSnapshots
  currentSnapshotIndex += 1

  return snapshot
}

export function getCurrentSnapshot() {
  return snapshots[currentSnapshotIndex]
}

export function stepToLastSnapshot() {
  if (currentSnapshotIndex === 0) return getCurrentSnapshot()

  currentSnapshotIndex -= 1

  return snapshots[currentSnapshotIndex]
}

export function stepToNextSnapshot() {
  if (currentSnapshotIndex === snapshots.length - 1) return getCurrentSnapshot()

  currentSnapshotIndex += 1

  return snapshots[currentSnapshotIndex]
}

export function freezeSnapshots(toFreeze) {
  freezeSnapshots = toFreeze
}
