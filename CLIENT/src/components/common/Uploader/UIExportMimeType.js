const UIExportMimeType = props => {
    const index = props.name.lastIndexOf(".");
    const target = props.name.substring(index + 1);
    let src = "";
    
    try {

        switch (target.toLowerCase()) {
            case "psd":
                src = "/static/common/thumbnail/file/extension/psd.svg"
                break;
            case "ai":
                src = "/static/common/thumbnail/file/extension/ai.svg"
                break;

            case "excel":
                src = "/static/common/thumbnail/file/extension/excel.svg"
                break;

            case "gif":
                src = "/static/common/thumbnail/file/extension/gif.svg"
                break;

            case "jpg":
                src = "/static/common/thumbnail/file/extension/jpg.svg"
                break;

            case "mp3":
                src = "/static/common/thumbnail/file/extension/mp3.svg"
                break;

            case "mp4":
                src = "/static/common/thumbnail/file/extension/mp4.svg"
                break;

            case "others":
                src = "/static/common/thumbnail/file/extension/others.svg"
                break;

            case "pdf":
                src = "/static/common/thumbnail/file/extension/pdf.svg"
                break;

            case "plain":
                src = "/static/common/thumbnail/file/extension/plain.svg"
                break;

            case "png":
                src = "/static/common/thumbnail/file/extension/png.svg"
                break;

            case "ppt":
                src = "/static/common/thumbnail/file/extension/ppt.svg"
                break;

            case "word":
                src = "/static/common/thumbnail/file/extension/word.svg"
                break;

            default:
                src = "/static/common/thumbnail/file/extension/others.svg"
                break;
        }
    } catch (error) {
        src = "/static/common/thumbnail/file/extension/others.svg"
    }

    return (
        <img width="72px" src={src} alt={props.name} />
    )
}

export default UIExportMimeType;