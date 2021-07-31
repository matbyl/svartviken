const makeStorageUrl = (root, filename) => {
  if (filename.match('^http(s|)://')) {
    return filename
  } else {
    const rootUrl = new URL(root)
    if (!rootUrl.pathname.endsWith('/')) {
      rootUrl.pathname += '/'
    }
    rootUrl.pathname += filename
    return rootUrl.toString()
  }
}

module.exports = makeStorageUrl
