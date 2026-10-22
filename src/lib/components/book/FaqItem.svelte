<script>
  /** @type {{ question: string, answer: string }} */
  let { question, answer } = $props();
</script>

<details class="group border-b border-hairline py-5">
  <summary class="flex cursor-pointer list-none items-baseline justify-between gap-6 font-semibold">
    {question}
    <span class="text-gold transition-transform group-open:rotate-45">+</span>
  </summary>
  <p class="mt-3 max-w-2xl text-sm text-body leading-relaxed">{answer}</p>
</details>
