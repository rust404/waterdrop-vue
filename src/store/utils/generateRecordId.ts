let maxRecordId = parseInt(window.localStorage.getItem('max_record_id') || '0') || 0
function generateRecordId() {
    return ++maxRecordId
}
function saveMaxRecordId() {
    window.localStorage.setItem('max_record_id', '' + maxRecordId)
}

export {
    generateRecordId,
    saveMaxRecordId
}