const fileSizeCalc = size => {
    const bytes = parseInt(size);
    const format = ["bytes", "KB", "MB", "GB", "TB", "PB"];

    const result = Math.floor(Math.log(bytes) / Math.log(1024));

    return result === "-Infinity" ? 0 + format[0] : (bytes / Math.pow(1024, Math.floor(result))).toFixed(2) + " " + format[result];
}

export default fileSizeCalc