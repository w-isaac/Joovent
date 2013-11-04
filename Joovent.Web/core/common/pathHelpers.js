module.exports.ResolvePath = function (path) {
    return path.replace("{ROOT_DIR}",process.env.ROOT_PATH);
}