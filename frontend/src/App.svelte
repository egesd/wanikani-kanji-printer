<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';

  let apiKey: string = '';
  let kanji: string[] = [];
  let error: string = '';
  let loading: boolean = false;

  async function fetchKanji() {
    try {
      loading = true;
      error = '';
      const response = await axios.get(`/api/kanji?apiKey=${apiKey}`);
      kanji = response.data;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to fetch kanji';
      kanji = [];
    } finally {
      loading = false;
    }
  }
</script>

<main class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-2xl mx-auto space-y-8">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-center text-blue-600">
      WaniKani Kanji Viewer
    </h1>

    <!-- API Key Input -->
    <div class="space-y-4">
      <input
        type="text"
        bind:value={apiKey}
        placeholder="Enter your WaniKani API key"
        class="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        on:click={fetchKanji}
        disabled={!apiKey || loading}
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Fetch Kanji'}
      </button>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    {/if}

    <!-- Kanji List -->
    {#if kanji.length > 0}
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Learned Kanji ({kanji.length})</h2>
        <div class="grid grid-cols-8 gap-4">
          {#each kanji as char}
            <div class="text-2xl text-center p-2 border rounded hover:bg-gray-50">
              {char}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>