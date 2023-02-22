import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { presetUno } from 'unocss';
import { extractorSvelte } from '@unocss/core';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		UnoCSS({
      presets: [presetUno()],
      extractors: [extractorSvelte],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    }),
	  sveltekit(),]
});
