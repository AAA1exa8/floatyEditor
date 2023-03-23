<script lang="ts">
	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>

<div class="h-16" />
<header class="fixed bg-#85CCC8 z-1 w-screen font-bold top-0">
	<div>
		<!-- TODO https://www.youtube.com/watch?v=S-VeYcOCFZw -->
		<!-- TODO do those cool submenus (make up some random options or whatever) -->
		<nav class="text-stroke-gray-800">
			<span class="text-3xl"> floatyEditor </span>
			<ul class="sm:flex hidden">
				<li>Floaties</li>
				<li>Notes</li>
				<li>Blog</li>
				<li>Share</li>
				<li>About</li>
			</ul>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- * this is not handled by js but it will only show up when is screen below 640 js -->
			<div class="relative sm:hidden block">
				<div
					class="visible text-3xl my-1.5 select-none"
					style="font-family: material_icons;"
					on:click|stopPropagation={toggleMenu}
					on:touchstart|stopPropagation
				>
					&#xF479;
				</div>
				<div
					class="materialise absolute right-0 bg-#85CCC0 p-3 rounded-1 pointer-events-none opacity-0"
					style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);"
					class:active={showMenu}
					on:click|stopPropagation
					on:touchstart|preventDefault|stopPropagation
				>
					<ul class="flex flex-col">
						<li>Floaties</li>
						<li>Notes</li>
						<li>Blog</li>
						<li>Share</li>
						<li>About</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</header>

<svelte:window
	on:click={() => {
		if (showMenu) toggleMenu();
	}}
	on:touchstart={() => {
		if (showMenu) toggleMenu();
	}}
/>

<style lang="postcss">
	* {
		font-family: sans-serif;
	}
	header {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}
	nav {
		@apply flex justify-between items-center py-2 px-4;
	}
	ul {
		@apply list-none m-0 p-0;
	}
	li {
		@apply mx-2 my-3 text-base;
	}
	.materialise {
		transform: translateY(-10px);
		transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
	}
	.active {
		transform: translateY(0);
		opacity: 100%;
		pointer-events: auto;
	}
</style>
