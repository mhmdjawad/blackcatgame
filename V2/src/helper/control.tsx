import React from 'react';
import { createRoot } from 'react-dom/client';
import type Game from "../game/game";
import G from '../util/G';
import EmojiSpriteSheet from '../util/EmojiSpriteSheet';
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
    textAreaElement = React.createRef<HTMLTextAreaElement>();
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
        document.body.append('origin: ');
        document.body.append(imagecanvas);
        var matNew = G.getColorMatrix(imagecanvas,(r:any)=>{
            return r;
        })
        var decodedcanv = G.colorsMatrixToSprite(matNew,2,(r:any) => {
            return r;
        })
        document.body.append('decoded: ');
        document.body.append(decodedcanv);
    }
    // Action2 / Action3: placeholders — implement as needed
    action2() {
        var text = this.textAreaElement.current?.value || '';
        if(text == ''){
            text = '';
            text += '🛡️🗡️🧌<br/>';
            text += '🛡️🗡️🧌<br/>';
            text += '🛡️🗡️🧌<br/>';
        }

        var data = text;
        var lines = data.split('<br/>');
        var spriteMatrix = [];
        for(let i = 0; i < lines.length; i++){
            var line = lines[i];
            var sprites = Array.from(line).map(c=>c);
            var row = [];
            for(let j = 0; j < sprites.length; j++){
                var c = sprites[j];
                if(c != ' ' && c != ''  && c != '\n' && c != '\r' && c != '️'){
                    row.push(c);
                }
            }
            spriteMatrix.push(row);
        }
        console.log('matrix:', spriteMatrix);
        var spriteSize = 32;
        var bigCanvas = G.makeCanvas(spriteMatrix[0].length*spriteSize,spriteMatrix.length*spriteSize);
        for(let i = 0; i < spriteMatrix.length; i++){
            for(let j = 0; j < spriteMatrix[i].length; j++){
                var c = spriteMatrix[i][j];
                var sprite = G.getEmojiSprite(c,spriteSize,1.1);
                bigCanvas.ctx.drawImage(sprite,j*spriteSize,i*spriteSize);
            }
        }
        document.body.append('bigCanvas:');
        document.body.append(bigCanvas);

        return;
        var sprite = G.getEmojiSprite(text,16,1.2);
        var palette = new Set();
        var matNew = G.getColorMatrix(sprite,(r:any)=>{
            palette.add(r);
            if(r) return '#000';
            return r;
        })
        var decodedcanv = G.colorsMatrixToSprite(matNew,4,(r:any) => {
            return r;
        })
        console.log('Palette:', Array.from(palette));
        document.body.append(`Palette length ${palette.size}`);
        document.body.append('newImg');
        document.body.append(sprite);
        document.body.append(decodedcanv);
        this.setState({ message: '' });
    }

    action3() {
        console.log('SupportApp: action3 called');
        this.setState({ message: 'Action3 called (not implemented)' });
    }

    render() {
        // const { previewUrl, hexArray, processing, message } = this.state;
        return (
            <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
                <h2>Support App</h2>
                {/* <div>
                    <textarea
                        ref= {this.textAreaElement}
                        defaultValue=''
                    >
                    </textarea>
                </div> */}

                <div>
                    <button onClick={() => {
                        var canvas = EmojiSpriteSheet.GenerateSpriteSheet(64);
                        document.body.append('Emoji Sprite Sheet:');
                        document.body.append(canvas);
                    }}>
                        Generate Emoji Sprite Sheet
                    </button>
                </div>

                {/* <div>
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={this.handleFileChange}
                    />
                </div> */}
                {/* <div style={{ marginTop: 12 }}>
                    <button onClick={this.action1} disabled={processing}>
                        Action1: Convert to hex
                    </button>
                    <button onClick={this.action2} style={{ marginLeft: 8 }}>
                        Action2 : Render Sprite Sheet
                    </button>
                    <button onClick={this.action3} style={{ marginLeft: 8 }}>
                        Action3
                    </button>
                </div> */}

                {/* {message && <div style={{ marginTop: 12 }}>{message}</div>} */}

                {/* {previewUrl && (
                    <div style={{ marginTop: 12 }}>
                        <img src={previewUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
                    </div>
                )} */}

                {/* {hexArray && (
                    <div style={{ marginTop: 12 }}>
                        <h4>Hex array ({hexArray.length} bytes)</h4>
                        <textarea
                            readOnly
                            value={hexArray.join(' ')}
                            style={{ width: '100%', height: 200, fontFamily: 'monospace' }}
                        />
                    </div>
                )} */}
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