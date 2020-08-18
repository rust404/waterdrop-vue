let maxCategoryId = parseInt(window.localStorage.getItem('max_category_id') || '0') || 0
function generateCategoryId() {
    return ++maxCategoryId
}
function saveMaxCategoryId() {
    window.localStorage.setItem('max_category_id', '' + maxCategoryId)
}

export {
    generateCategoryId,
    saveMaxCategoryId
}