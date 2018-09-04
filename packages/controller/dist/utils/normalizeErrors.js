export var normalizeErrors = function (errors) {
    var errorMap = {};
    errors.forEach(function (error) {
        errorMap[error.path] = error.message;
    });
    return errorMap;
};
//# sourceMappingURL=normalizeErrors.js.map