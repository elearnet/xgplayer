import Box from '../box';
Box.mvhd = function (data, output) {
    let stream = this.stream;

    stream.writeUint8(data.version);
    stream.writeUint24(data.flag);
    stream.writeUint32(data.create);
    stream.writeUint32(data.modify);
    stream.writeUint32(data.timeScale);
    stream.writeUint32(data.duration);

    let rate = data.rate.split('.');
    let volume = data.volume.split('.');
    stream.writeUint16(rate[0]);
    stream.writeUint16(rate[1]);
    stream.writeUint8(volume[0]);
    stream.writeUint8(volume[1]);
    stream.fill(10);
    data.matrix.forEach(item=>{
        let matrix;
        matrix = item.split('.');
        stream.writeUint16(matrix[0]);
        stream.writeUint16(matrix[1]);
    });
    stream.fill(24);
    stream.writeUint32(data.nextTrackID);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    if (stream.position !== data.size - 8) {
        throw `${data.type} box incomplete`;
    } else {
        this.outputSize = stream.position;
    }
    delete this.data;
};
