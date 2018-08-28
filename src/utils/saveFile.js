const saveFile = (value, type, name) => {
    let blob;
    if (typeof window.Blob == "function") {
        blob = new Blob([value], {type: type});
    } else {
        let BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        let bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
    }
    let URL = window.URL || window.webkitURL;
    let bloburl = URL.createObjectURL(blob);
    let anchor = document.createElement("a");
    if ('download' in anchor) {
        anchor.style.visibility = "hidden";
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
    } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
    } else {
        window.location.href = bloburl;
    }
};

export default saveFile;