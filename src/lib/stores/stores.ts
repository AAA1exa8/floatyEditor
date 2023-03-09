import { writable, type Writable } from 'svelte/store';
import type { Editor } from '@tiptap/core';

let editor: Editor | null = null;

export const focusedEditor: Writable<Editor | null> = writable(editor);
export const bigWidth = writable(true);
