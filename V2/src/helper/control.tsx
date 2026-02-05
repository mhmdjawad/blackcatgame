import React from 'react';
import { createRoot } from 'react-dom/client';
import type Game from "../game/game";
import G from '../util/G';
import U8Matrix from '../util/U8Matrix';
type State = {
    file: File | null;
    previewUrl: string | null;
    hexArray: string[] | null;
    processing: boolean;
    message?: string;
};


class SupportApp extends React.Component<{}, State> {
    fileInputRef = React.createRef<HTMLInputElement>();
    textInputElement = React.createRef<HTMLInputElement>();
    constructor(props: {}) {
        super(props);
        this.state = { file: null, previewUrl: null, hexArray: null, processing: false };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.action1 = this.action1.bind(this);
        this.action2 = this.action2.bind(this);
        this.action3 = this.action3.bind(this);
    }

    handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        const previewUrl = URL.createObjectURL(file);
        this.setState({ file, previewUrl, hexArray: null, message: undefined });
    }

    // Action1: convert selected image file to a hex array (one byte per hex entry)
    async action1() {
        const { file } = this.state;
        if (!file) {
            this.setState({ message: 'No file selected' });
            return;
        }
        this.setState({ processing: true, message: 'Reading file...' });
        var img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode();
        var imagecanvas = G.imgToCanvas(img);
        var chars = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-';
        var newCanvas = G.makeCanvas(8,chars.length*8);
        for(let i = 0 ; i < chars.length;i++){
            var croped = G.crop(imagecanvas,i*8,0,8,8);
            newCanvas.ctx.drawImage(croped,0,i*8);
        }
        var matNew = G.getColorMatrix(newCanvas,(r:any)=>{
            if(r == '#ffffff') return 0;
            if(r == '#000000') return 1;
            return 0;
        })
        document.body.append(newCanvas);
        console.log(matNew);

        var encoded = U8Matrix.encode(matNew);
        console.log(encoded);

        var decoded = U8Matrix.decode(encoded,8,chars.length*8);
        console.log(decoded);

        var decodedcanv = G.colorsMatrixToSprite(decoded,1,(r:any) => {
            if(r == 1) return '#000';
            return null;
        })

        document.body.append(decodedcanv);

        /*try {
            const arrayBuffer = await file.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            const hexArray: string[] = [];
            for (let i = 0; i < bytes.length; i++) {
                hexArray.push(bytes[i].toString(16).padStart(2, '0'));
            }
            this.setState({ hexArray, processing: false, message: `Converted ${bytes.length} bytes to hex` });
            // Also log to console for debugging
            console.log('SupportApp: hexArray length', hexArray.length);
        } catch (err) {
            console.error('SupportApp action1 error', err);
            this.setState({ processing: false, message: `Error reading file: ${err}` });
        }*/
    }

    // Action2 / Action3: placeholders — implement as needed
    action2() {
        console.log('SupportApp: action2 called');
        this.setState({ message: 'Action2 called (not implemented)' });
    }

    action3() {
        console.log('SupportApp: action3 called');
        this.setState({ message: 'Action3 called (not implemented)' });
    }

    render() {
        const { previewUrl, hexArray, processing, message } = this.state;
        return (
            <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
                <h2>Support App</h2>
                <div>
                    <input
                        ref= {this.textInputElement}
                        type="text"
                    />
                </div>
                <div>
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={this.handleFileChange}
                    />
                </div>

                <div style={{ marginTop: 12 }}>
                    <button onClick={this.action1} disabled={processing}>
                        Action1: Convert to hex
                    </button>
                    <button onClick={this.action2} style={{ marginLeft: 8 }}>
                        Action2
                    </button>
                    <button onClick={this.action3} style={{ marginLeft: 8 }}>
                        Action3
                    </button>
                </div>

                {message && <div style={{ marginTop: 12 }}>{message}</div>}

                {/* {previewUrl && (
                    <div style={{ marginTop: 12 }}>
                        <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
                    </div>
                )} */}

                {hexArray && (
                    <div style={{ marginTop: 12 }}>
                        <h4>Hex array ({hexArray.length} bytes)</h4>
                        <textarea
                            readOnly
                            value={hexArray.join(' ')}
                            style={{ width: '100%', height: 200, fontFamily: 'monospace' }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

// Mount helper: programmatically mount the SupportApp into body.
function mountSupportApp(containerId = 'support-root') {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
    }
    createRoot(container).render(React.createElement(SupportApp));
}
export default class Control{
    game : Game;
    constructor(game : Game){
        this.game = game;
        mountSupportApp("support-1")
    }
}