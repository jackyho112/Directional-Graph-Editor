import FileSaver from 'file-saver'
import { getCurrentSnapshot, freezeSnapshots } from './snapshotOperations'

export function saveCurrentSnapshot() {
  const blob = new Blob(
    [JSON.stringify(getCurrentSnapshot(), null, 4)],
    { type: "text/plain;charset=utf-8" }
  )

  FileSaver.saveAs(blob, 'diagram.json')
}

function getFileChangeEventHandler(fileInput, callback) {
  return () => {
    const filereader = new FileReader()

    const file = fileInput.files[0]

    filereader.onload = () => {
      callback(JSON.parse(filereader.result))
    }

    filereader.readAsText(file);
  }
}

let fileChangeEventHandler
export function loadSnapshotFromFile(callback, fileInputId) {
  const fileInput = document.getElementById(fileInputId)
  if (fileChangeEventHandler) fileInput.removeEventListener('change', fileChangeEventHandler)
  fileChangeEventHandler = getFileChangeEventHandler(fileInput, callback)

  fileInput.addEventListener('change', fileChangeEventHandler)
  fileInput.click()
}
