<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let { data, form } = $props();
  const succeeded = 'success';

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function signIn() {
    return async ({ result, update }) => {
      if (result.type === succeeded) return goto('/admin', { invalidateAll: true });
      await update();
    };
  }

  const inputClass = 'w-full border border-gold bg-ink-3 px-4 py-3 text-sm focus:outline-none focus:border-signal';
</script>

<svelte:head>
  <title>Sign in | Jewel PFP admin</title>
</svelte:head>

<section class="mx-auto max-w-md px-6 py-20">
  <p class="kicker text-gold mb-4">Website admin</p>
  <h1 class="text-3xl font-extrabold tracking-tight">Sign in</h1>
  {#if !data.isConfigured}
    <p class="mt-6 text-sm text-signal">Sign-in is not set up yet: ADMIN_USERNAME and ADMIN_PASSWORD need adding in Vercel.</p>
  {/if}
  <form method="POST" use:enhance={signIn} class="mt-8 space-y-5">
    <label class="block">
      <span class="kicker text-gold block mb-2">Username</span>
      <input class={inputClass} name="username" autocomplete="username" required />
    </label>
    <label class="block">
      <span class="kicker text-gold block mb-2">Password</span>
      <input class={inputClass} name="password" type="password" autocomplete="current-password" required />
    </label>
    {#if form?.problem}
      <p class="text-sm text-signal">{form.problem}</p>
    {/if}
    <button class="bg-ink text-paper px-8 py-3.5 text-sm font-semibold hover:bg-signal transition-colors">Sign in</button>
  </form>
</section>
