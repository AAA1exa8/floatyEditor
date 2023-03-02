import { writable, type Writable } from 'svelte/store';
import type { Editor } from '@tiptap/core';

let editor: Editor | undefined;

export const focusedEditor: Writable<Editor | undefined> = writable(editor);
export const bigWidth = writable(true);
