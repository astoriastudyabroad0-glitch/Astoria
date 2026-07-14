import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Highlight } from '@tiptap/extension-highlight';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Placeholder } from '@tiptap/extension-placeholder';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextAlign } from '@tiptap/extension-text-align';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { 
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
    Type, AlignLeft, AlignCenter, AlignRight, AlignJustify, 
    List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
    Eraser, ChevronDown, Plus, Minus, Highlighter, Baseline,
    Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
    Outdent, Indent, Type as CaseIcon
} from 'lucide-react';

const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  }
});

const editorExtensions = [
    StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
    }),
    Underline,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-[#0563c1] underline cursor-pointer',
        },
    }),
    Image.configure({
        HTMLAttributes: {
            class: 'max-w-full h-auto mx-auto my-4',
        },
    }),
    FontSize,
    Color,
    FontFamily,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    CharacterCount,
    Placeholder.configure({
        placeholder: 'Write your story here...',
    }),
];

const WordEditor = ({ content, onChange }) => {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);

    const editor = useEditor({
        extensions: editorExtensions,
        content: content || '<p></p>',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-[40px_48px] bg-white mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.2)] w-full max-w-[816px] font-[Calibri,sans-serif] text-[12pt] leading-[1.5] text-black',
            },
        },
    });

    if (!editor) return null;

    // Word-style font size mapping helper
    const setFontSize = (size) => {
        editor.chain().focus().setFontSize(size + 'pt').run();
    };

    const addLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        }
        setIsLinkDialogOpen(false);
        setLinkUrl('');
    };

    const addImage = (url) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
        setIsImageDialogOpen(false);
        setImageUrl('');
    };

    const colors = [
        '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff',
        '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
        '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
        '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd',
        '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0',
        '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79',
    ];

    const fontFamilies = [
        { label: 'Calibri', value: 'Calibri, sans-serif' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Courier New', value: 'Courier New, monospace' },
        { label: 'Inter', value: 'Inter, sans-serif' },
        { label: 'Palatino', value: 'Palatino Linotype, serif' },
    ];

    const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

    const ToolbarButton = ({ onClick, isActive, disabled, children, title }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`h-[26px] min-w-[26px] px-1 flex items-center justify-center rounded-[3px] border border-transparent transition-all hover:bg-[#e8e8e8] hover:border-[#c8c8c8] active:bg-[#d0d0d0] active:border-[#b8b8b8] ${isActive ? 'bg-[#dce6f0] border-[#9bb8d3]' : ''}`}
        >
            {children}
        </button>
    );

    const Divider = () => <div className="w-[1px] h-[20px] bg-[#c8c8c8] mx-1" />;

    return (
        <div className="flex flex-col border border-[#d1d1d1] rounded-sm overflow-hidden bg-white shadow-sm">
            {/* TOOLBAR */}
            <div className="flex flex-col bg-[#f3f3f3] border-b border-[#d1d1d1] p-1 gap-[2px] font-[Calibri,sans-serif]">
                {/* ROW 1: Font controls */}
                <div className="flex items-center flex-wrap gap-[2px]">
                    <select 
                        className="h-[26px] w-[140px] border border-[#c8c8c8] rounded-[3px] bg-white text-[12px] px-1 outline-none"
                        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        value={editor.getAttributes('textStyle').fontFamily || 'Calibri, sans-serif'}
                    >
                        {fontFamilies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>

                    <select 
                        className="h-[26px] w-[60px] border border-[#c8c8c8] rounded-[3px] bg-white text-[12px] px-1 outline-none"
                        onChange={(e) => setFontSize(e.target.value)}
                        value={editor.getAttributes('textStyle').fontSize?.replace('pt', '') || '12'}
                    >
                        {fontSizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold (Ctrl+B)">
                        <Bold size={14} strokeWidth={3} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic (Ctrl+I)">
                        <Italic size={14} strokeWidth={3} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline (Ctrl+U)">
                        <UnderlineIcon size={14} strokeWidth={3} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough (Ctrl+Shift+X)">
                        <Strikethrough size={14} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive('subscript')} title="Subscript">
                        <SubscriptIcon size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive('superscript')} title="Superscript">
                        <SuperscriptIcon size={14} />
                    </ToolbarButton>

                    <Divider />

                    <div className="relative">
                        <ToolbarButton onClick={() => setShowColorPicker(!showColorPicker)} title="Text Color">
                            <div className="flex flex-col items-center">
                                <Baseline size={14} />
                                <div className="w-full h-[3px] mt-[1px]" style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }} />
                            </div>
                        </ToolbarButton>
                        {showColorPicker && (
                            <div className="absolute top-full left-0 mt-1 z-[70] bg-white border border-[#d1d1d1] shadow-xl p-2 grid grid-cols-10 gap-1 w-[200px]">
                                {colors.map(c => (
                                    <button 
                                        key={c} 
                                        type="button"
                                        className="w-4 h-4 rounded-sm border border-gray-200" 
                                        style={{ backgroundColor: c }}
                                        onClick={() => {
                                            editor.chain().focus().setColor(c).run();
                                            setShowColorPicker(false);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <ToolbarButton onClick={() => setShowHighlightPicker(!showHighlightPicker)} title="Highlight Color">
                            <div className="flex flex-col items-center">
                                <Highlighter size={14} />
                                <div className="w-full h-[3px] mt-[1px]" style={{ backgroundColor: editor.getAttributes('highlight').color || '#ffff00' }} />
                            </div>
                        </ToolbarButton>
                        {showHighlightPicker && (
                            <div className="absolute top-full left-0 mt-1 z-[70] bg-white border border-[#d1d1d1] shadow-xl p-2 grid grid-cols-10 gap-1 w-[200px]">
                                {colors.map(c => (
                                    <button 
                                        key={c} 
                                        type="button"
                                        className="w-4 h-4 rounded-sm border border-gray-200" 
                                        style={{ backgroundColor: c }}
                                        onClick={() => {
                                            editor.chain().focus().setHighlight({ color: c }).run();
                                            setShowHighlightPicker(false);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting (Tx)">
                        <Eraser size={14} />
                    </ToolbarButton>
                </div>

                {/* ROW 2: Paragraph controls */}
                <div className="flex items-center flex-wrap gap-[2px] mt-[2px]">
                    <select 
                        className="h-[26px] w-[120px] border border-[#c8c8c8] rounded-[3px] bg-white text-[12px] px-1 outline-none"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'p') editor.chain().focus().setParagraph().run();
                            else editor.chain().focus().toggleHeading({ level: parseInt(val) }).run();
                        }}
                        value={editor.isActive('heading', { level: 1 }) ? '1' : editor.isActive('heading', { level: 2 }) ? '2' : editor.isActive('heading', { level: 3 }) ? '3' : editor.isActive('heading', { level: 4 }) ? '4' : 'p'}
                    >
                        <option value="p">Normal Text</option>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                    </select>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left (Ctrl+L)">
                        <AlignLeft size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center (Ctrl+E)">
                        <AlignCenter size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right (Ctrl+R)">
                        <AlignRight size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify (Ctrl+J)">
                        <AlignJustify size={14} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List (Ctrl+Shift+8)">
                        <List size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List (Ctrl+Shift+7)">
                        <ListOrdered size={14} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().sinkListItem('listItem').run()} title="Increase Indent">
                        <Indent size={14} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().liftListItem('listItem').run()} title="Decrease Indent">
                        <Outdent size={14} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => {
                        const previousUrl = editor.getAttributes('link').href;
                        setLinkUrl(previousUrl || '');
                        setIsLinkDialogOpen(true);
                    }} isActive={editor.isActive('link')} title="Insert Link (Ctrl+K)">
                        <LinkIcon size={14} />
                    </ToolbarButton>

                    <ToolbarButton onClick={() => setIsImageDialogOpen(true)} title="Insert Image">
                        <ImageIcon size={14} />
                    </ToolbarButton>
                </div>
            </div>

            {/* EDITOR AREA */}
            <div className="bg-[#f0f0f0] p-8 min-h-[600px] flex justify-center overflow-y-auto">
                <div className="w-full max-w-[816px]">
                   <EditorContent editor={editor} />
                </div>
            </div>

            {/* STATUS BAR */}
            <div className="bg-[#f3f3f3] border-t border-[#d1d1d1] px-2 py-[2px] flex justify-between items-center text-[11px] text-[#666] font-[sans-serif]">
                <div className="flex gap-4">
                    <span>Words: {editor.storage.characterCount.words()}</span>
                    <span>Characters: {editor.storage.characterCount.characters().toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="uppercase tracking-tighter">Editor Ready</span>
                </div>
            </div>

            {/* DIALOGS */}
            {isLinkDialogOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 w-[320px]">
                        <h3 className="text-sm font-black uppercase mb-4 text-gray-700">Insert Link</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">URL</label>
                                <input 
                                    type="text" 
                                    className="w-full border-b-2 border-gray-100 py-1 outline-none focus:border-blue-500 text-sm"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://..."
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setIsLinkDialogOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-lg">Cancel</button>
                                <button type="button" onClick={addLink} className="px-6 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">Insert</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isImageDialogOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 w-[320px]">
                        <h3 className="text-sm font-black uppercase mb-4 text-gray-700">Insert Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL</label>
                                <input 
                                    type="text" 
                                    className="w-full border-b-2 border-gray-100 py-1 outline-none focus:border-blue-500 text-sm"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300"><span className="bg-white px-2 tracking-widest">Or Upload</span></div>
                            </div>
                            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl py-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all group">
                                <Plus size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Select File</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (re) => addImage(re.target.result);
                                        reader.readAsDataURL(file);
                                    }
                                }} />
                            </label>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setIsImageDialogOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-lg">Cancel</button>
                                <button type="button" onClick={() => addImage(imageUrl)} className="px-6 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">Insert URL</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordEditor;
